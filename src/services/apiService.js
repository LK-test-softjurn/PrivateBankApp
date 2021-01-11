// impoerts external 

// imports internal
import { getCurenciesDataByDatePrivatBankApi } from '../api/privateBankApi';
import { errorLog } from '../common/errorHelper';
import { fetchDatafromUrl } from '../api/privateBankApi';
import { currencyTable } from '../common/config';
import { API_ERROR } from '../common/consts';

export async function getCurencyDataByMonthApiService(dates) {
    try {   
        const allDaysDataFetch = [];

        let max = dates?.length;
        for (let i = 0; i < max; i++) {
            allDaysDataFetch.push(fetchDatafromUrl(dates[i]));
        }

        const res = await Promise.all(allDaysDataFetch);
        
        const allDaysDataArray = [];
        if(res !== undefined && res?.length > 0) {
            const maxIndex = res.length;
            for(let i = 0; i < maxIndex; i++) {
                if(res[i] !== API_ERROR.API_ERROR_UNDEFINED) {
                    allDaysDataArray.push(...res[i]?.exchangeRate?.filter(filterCurrency));
                    console.log('TABLE', allDaysDataArray);
                }
            }
        }

        return res;
    } catch (err) {
        errorLog('apiService / getCurenciesDataByDate', err);
    }
}

function filterCurrency(item) {
    let isfound = false;
    currencyTable.forEach(element => {
       if(element == item.currency) {
           isfound =  true;
       }
   });
   return isfound;
}
