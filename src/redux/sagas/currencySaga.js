
// imports external
import { call, takeLatest, put } from 'redux-saga/effects';

// imports internal
import { getCurenciesAveragesByMonthDataService } from '../../services/dataService';
import { errorLog } from '../../common/errorHelper';
import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../../common/consts';
import { fetchAllMonthDaysData, setStatus } from '../sagas/sagaHelperFunctions';

function* getCurrencyAverageForGivenMonth(action) {
    try {
        yield setStatus(TASK_STATUS.PENDING, CURRENCY_ACTION_TYPE);

        yield put({
            type: CURRENCY_ACTION_TYPE.CLEAR_DATA,
        })

        yield getAverages(action.value);

    }
    catch (err) {
        errorLog('currencySaga / getCurrencyAverage', err);
        yield setStatus(TASK_STATUS.ERROR, CURRENCY_ACTION_TYPE);
    }
}

function* getAverages(value) {
    try {
        const res = yield call(getCurenciesAveragesByMonthDataService, value);

        if(res?.length > 0) {

            yield put({
                type: CURRENCY_ACTION_TYPE.DATA_READY,
                value: res
            })
            yield setStatus(TASK_STATUS.NONE, CURRENCY_ACTION_TYPE);
        } else {
            yield call(fetchAllMonthDaysData, getCurenciesAveragesByMonthDataService, value, CURRENCY_ACTION_TYPE);
        }
    } catch (err){
        errorLog('currencySaga / getAverages', err);
        throw err;
    }
}

export function* watchGetCurrencyAverageForGivenMonth() {
    yield takeLatest(CURRENCY_ACTION_TYPE.GET_AVERAGE_FOR_GIVEN_MONTH, getCurrencyAverageForGivenMonth);
}