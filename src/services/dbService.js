// imports external

// imports internal
import { errorLog } from '../common/errorHelper';
import { API_ERROR } from '../common/consts';
import { currencyTable } from '../common/config';
import { storeDataRealmDb, 
    getCurrencyMonthDataRealmDb, 
    getCurrenciesAveragesMonthDataRealmDb } from '../db/realmDb';

export async function storeDataDbService(data) {
    try{
        allStorageArray = [];
        const maxIndex = data.length;
        
        for(let i = 0; i < maxIndex; i++) {
            if(data[i] !== API_ERROR.API_ERROR_UNDEFINED) {
                const dateArray = data[i]?.date?.split('.'); // european format  of date: dd.mm.yyyy
                allStorageArray.push(storeDataRealmDb(dateArray[0], dateArray[1], dateArray[2],  data[i]?.exchangeRate?.filter(filterCurrency)));
            }
        }

        const res = await Promise.all(allStorageArray); 

        return true;

    } catch (err) {
        errorLog('dbService / storeDataDbService', err);
        return false;
    }
}

export async function getCurrencyMonthDataDbService(month, year) {
    return await getCurrencyMonthDataRealmDb(month, year);
}

export async function getCurrenciesAveragesMonthDataDbService(currencies, month) {
    await getCurrenciesAveragesMonthDataRealmDb();
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