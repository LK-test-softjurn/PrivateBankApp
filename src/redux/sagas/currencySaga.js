
// imports external
import { call, takeLatest, put } from 'redux-saga/effects';

// imports internal
import { getCurenciesAveragesByMonthDataService } from '../../services/dataService';
import { errorLog } from '../../common/errorHelper';
import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../../common/consts';


function* getCurrencyAverageForGivenMonth(action) {
    try {
        yield put({
            type: CURRENCY_ACTION_TYPE.TASK_STATUS,
            value: TASK_STATUS.PENDING
        })

        const res = yield call(getCurenciesAveragesByMonthDataService, action.value);

        if(res) {
            yield put({
                type: CURRENCY_ACTION_TYPE.READY_AVERAGE_FOR_GIVEN_MONTH,
                value: res
            })
        } else {
            yield put({
                type: CURRENCY_ACTION_TYPE.TASK_STATUS,
                value: TASK_STATUS.ERROR
            })  
        }

        yield put({
            type: CURRENCY_ACTION_TYPE.TASK_STATUS,
            value: TASK_STATUS.NONE
        })
    }
    catch (err) {
        errorLog('currencySaga / getCurrencyAverage', err);
    }
}

export function* watchGetCurrencyAverageForGivenMonth() {
    yield takeLatest(CURRENCY_ACTION_TYPE.GET_AVERAGE_FOR_GIVEN_MONTH, getCurrencyAverageForGivenMonth);
}