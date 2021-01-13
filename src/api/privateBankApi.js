// imports external

// imports internal
import { API_ERROR } from '../common/consts';
import { url } from '../common/config';
import { errorLog } from '../common/errorHelper';

export async function fetchDatafromUrl (date) {
    try {
        const res = await fetch(`${url}${date}`);
        if(res!== undefined && res?.status === 200){
            const parsed = await res.json();
            if(parsed !== undefined && parsed !== null) {
                return parsed;
            }
        }
        throw API_ERROR.API_ERROR_UNDEFINED;
        
    } catch(err) {
        errorLog('privateBankApi / fetchDatafromURL', err);
        throw API_ERROR.API_ERROR_UNDEFINED;
    }
}
