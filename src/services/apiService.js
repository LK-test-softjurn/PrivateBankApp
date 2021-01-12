// impoerts external 

// imports internal
import { getCurenciesDataByDatePrivatBankApi } from '../api/privateBankApi';
import { errorLog } from '../common/errorHelper';
import { fetchDatafromUrl } from '../api/privateBankApi';
import { currencyTable } from '../common/config';
import { API_ERROR } from '../common/consts';
import { storeDataDbService } from '../services/dbService';

export async function getCurencyDataByMonthApiService(dates) {
    try {   
        const allDaysDataFetch = [];

        const maxIndex = 2;//dates?.length;
        for (let i = 0; i < maxIndex; i++) {
            allDaysDataFetch.push(fetchDatafromUrl(dates[i]));
        }

        const res = await Promise.all(allDaysDataFetch); 

        if(res?.length > 0) {
            const savingResult  = await storeDataDbService(res);

            if(savingResult === true) {
                return true;
            } 
        }
        return false;
        

    } catch (err) {
        errorLog('apiService / getCurenciesDataByDate', err);
        throw API_ERROR.API_ERROR_UNDEFINED;
    }
}

async function storeDataInToDB(data) {
    await storeDataDbService(data);
}

