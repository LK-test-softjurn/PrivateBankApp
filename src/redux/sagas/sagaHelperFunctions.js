// imports external
import { call, put, all } from 'redux-saga/effects';

// imports internal
import { getDataFromApi } from '../../services/dataService';
import { getCurencyDataByDayApiService } from '../../services/apiService';
import { storeDataDbService } from '../../services/dbService';
import { errorLog } from '../../common/errorHelper';
import { TASK_STATUS } from '../../common/consts';

export function* fetchAllMonthDaysData(callback, value, sagaType) {
    try { 
        const dates = getDataFromApi(value);
        const fetchResultArray = yield all(dates.map(x => call(getCurencyDataByDayApiService, x)));
        if(fetchResultArray?.length > 0) {
            yield call(writeDataToDB, fetchResultArray, callback, value, sagaType);
        } else {
            yield setStatus(TASK_STATUS.ERROR, sagaType);
        }

    } catch (err) {
        errorLog('sagaHelpereFunctions / fetchAllMonthDaysData', err);
        throw err;
    }
  }

function* writeDataToDB(data, callbacek, value, sagaType) {
    try {
        const result = yield call(storeDataDbService, data); 
        if(result === true) {
            const res = yield call(callbacek, value);

            if(res?.length > 0) {
                yield put({
                    type: sagaType.DATA_READY,
                    value: res
                })
                yield setStatus(TASK_STATUS.NONE, sagaType);
            } else {
                yield setStatus(TASK_STATUS.ERROR, sagaType);
            }
        }
    } catch (err) {
        errorLog('sagaHelpereFunctions / writeDataToDB', err);
        throw err;
    }
}

export function* setStatus(status, sagaType) {
    yield put({
        type: sagaType.TASK_STATUS,
        value: status
    })
}