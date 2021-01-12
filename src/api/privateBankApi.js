// imports external

// imports internal
import { API_ERROR } from '../common/consts';
import { url } from '../common/config';
import { errorLog } from '../common/errorHelper';

export async function fetchDatafromUrl (date) {
    try {
        console.log('FETCH DATE:', date);

        const res = await fetch(`${url}${date}`);

        console.log('FETCH DATE: - finished', res);

        if(res!== undefined && res?.status === 200){
            const parsed = await res.json();
            console.log('FETCH DATE: - json', parsed);
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
