// imports external

// imports internal
import { errorLog } from '../common/errorHelper';
import { API_ERROR, DB_ERROR, monthDays } from '../common/consts';
import { currencyTable } from '../common/config';
import { storeDataRealmDb, 
    getCurrencyMonthDataRealmDb, 
    getCurrenciesAveragesMonthDataRealmDb } from '../db/realmDb';

export async function storeDataDbService(data) {
    try{
        const allStorageArray = [];
        const maxIndex = data.length;
        
        for(let i = 0; i < maxIndex; i++) {
            if(data[i] !== API_ERROR.API_ERROR_UNDEFINED) {
                const dateArray = data[i]?.date?.split('.'); 
                allStorageArray.push(storeDataRealmDb(dateArray[0], dateArray[1], dateArray[2],  data[i]?.exchangeRate?.filter(filterCurrency)));
            }
        }

        const res = await Promise.all(allStorageArray); 
        return true;

    } catch (err) {
        errorLog('dbService / storeDataDbService', err);
        throw DB_ERROR.WRITE;
    }
}

export function getCurrencyMonthDataDbService(currency, month, year, sortByField, asc) {
   return getCurrencyMonthDataRealmDb(currency, month, year, sortByField, asc);
}

export function getCurrenciesAveragesMonthDataDbService(month, year) {
    return getCurrenciesAveragesMonthDataRealmDb(month, year);
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