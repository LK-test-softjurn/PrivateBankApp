// imports external

// imports internal
import { API_ERROR } from '../common/consts';
import { url } from '../common/config';
import { errorLog } from '../common/errorHelper';
import { store } from '../redux/store';

export async function fetchDatafromUrl (date) {
    // console.log('STORE', store.getState());
    try {
        const res = await fetch(`${url}${date}`);
        if(res!== undefined && res?.status === 200){
            const parsed = await res.json();
            if(parsed !== undefined && parsed !== null) {
                return parsed;
            } else {
                return API_ERROR.API_ERROR_UNDEFINED;    
            }
        } else {
            return API_ERROR.API_ERROR_UNDEFINED;
        }
    } catch(err) {
        errorLog('apiService / fetchDatafromURL', error);
    }
}
