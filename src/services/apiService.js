// impoerts external 

// imports internal
import { errorLog } from '../common/errorHelper';
import { fetchDatafromUrl } from '../api/privateBankApi';

export async function getCurencyDataByDayApiService(date) {
    try{ 
        return await fetchDatafromUrl(date);
    } catch {
        errorLog('apiService / getCurencyDataByDayApiService', err);
        throw err;  
    }
}

