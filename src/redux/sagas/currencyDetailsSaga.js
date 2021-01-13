// imports external
import { call, takeLatest, put } from 'redux-saga/effects';

// imports internal
import { getCurencyDataByMonthDataService } from '../../services/dataService';
import { errorLog } from '../../common/errorHelper';
import { CURRENCY_DETAILS_ACTION_TYPE, TASK_STATUS } from '../../common/consts';
import { fetchAllMonthDaysData, setStatus } from '../sagas/sagaHelperFunctions';

function* getCurrencyDataForGivenMonth(action) {
    try {
        yield setStatus(TASK_STATUS.PENDING, CURRENCY_DETAILS_ACTION_TYPE);

        yield put({
            type: CURRENCY_DETAILS_ACTION_TYPE.CLEAR_DATA,
        })

        yield getCurrencyData(action.value);

    }
    catch (err) {
        errorLog('currencyDetailSaga / getCurrencyAverage', err);
        yield setStatus(TASK_STATUS.ERROR, CURRENCY_DETAILS_ACTION_TYPE);
    }
}

function* getCurrencyData(value) {
    try {
        const res = yield call(getCurencyDataByMonthDataService, value);

        if(res?.length > 0) {

            yield put({
                type: CURRENCY_DETAILS_ACTION_TYPE.DATA_READY,
                value: res
            })
            yield setStatus(TASK_STATUS.NONE, CURRENCY_DETAILS_ACTION_TYPE);
        } else {
            yield call(fetchAllMonthDaysData, getCurencyDataByMonthDataService, value, CURRENCY_DETAILS_ACTION_TYPE);
        }
    } catch (err){
        errorLog('currencyDetailSaga / getCurrencyData', err);
        throw err;
    }
}
//     try {

//         yield put({
//             type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
//             value: TASK_STATUS.PENDING 
//         })
//         yield put({
//             type: CURRENCY_DETAILS_ACTION_TYPE.CLEAR_DATA,
//         })
// console.log('SAGA - START', new Date(Date.now()));
//         const res = yield call(getCurencyDataByMonthDataService, action.value);
// console.log('SAGA - STOP', new Date(Date.now()));
//         if(res) {
//             yield put({
//                 type: CURRENCY_DETAILS_ACTION_TYPE.READY_DATA_FOR_GIVEN_MONTH,
//                 value: res
//             })

//         } else {
//             yield put({
//                 type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
//                 value: TASK_STATUS.ERROR
//             })  
//         }

//         yield put({
//             type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
//             value: TASK_STATUS.NONE
//         })
//     }
//     catch (err) {
//         errorLog('currencyDetailSaga / getCurrencyDataForGivenMonth', err);
//         yield put({
//             type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
//             value: TASK_STATUS.ERROR
//         })  
//     }
// }

export function* watchGetCurrencyDataForGivenMonth() {
    yield takeLatest(CURRENCY_DETAILS_ACTION_TYPE.GET_DATA_FOR_GIVEN_MONTH_BY_CURRENCY, getCurrencyDataForGivenMonth);
}