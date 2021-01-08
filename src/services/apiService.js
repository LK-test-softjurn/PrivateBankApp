import { getCurenciesDataByDatePrivatBankApi } from '../api/privateBankApi';
import { errorLog } from '../common/errorHelper';

export async function getCurenciesDataByDateApiService (date) {
    try {
        const res = await getCurenciesDataByDatePrivatBankApi(date);
        return res;
    } catch(err) {
        errorLog('apiService / getCurenciesDataByDate', error);
    }
}