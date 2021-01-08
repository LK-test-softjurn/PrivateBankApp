// imports external
import { call, takeLatest, put } from 'redux-saga/effects';

// imports internal
import { getCurencyDataByMonthService } from '../../services/dataService';
import { errorLog } from '../../common/errorHelper';
import { CURRENCY_DETAILS_ACTION_TYPE, TASK_STATUS } from '../../common/consts';


function* getCurrencyDataForGivenMonth(action) {
    try {
        yield put({
            type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
            value: TASK_STATUS.PENDING
        })

        const res = yield call(getCurencyDataByMonthService, action.value);

        if(res) {
            yield put({
                type: CURRENCY_DETAILS_ACTION_TYPE.READY_DATA_FOR_GIVEN_MONTH,
                value: res
            })
        } else {
            yield put({
                type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
                value: TASK_STATUS.ERROR
            })  
        }

        yield put({
            type: CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS,
            value: TASK_STATUS.NONE
        })
    }
    catch (err) {
        errorLog('currencySaga / getCurrencyAverage', err);
    }
}

export function* watchGetCurrencyDataForGivenMonth() {
    yield takeLatest(CURRENCY_DETAILS_ACTION_TYPE.GET_DATA_FOR_GIVEN_MONTH_BY_CURRENCY, getCurrencyDataForGivenMonth);
}