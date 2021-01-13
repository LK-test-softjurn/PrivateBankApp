import { all, fork } from 'redux-saga/effects';
import { watchGetCurrencyAverageForGivenMonth, } from './currencySaga';
import { watchGetCurrencyDataForGivenMonth, } from './currencyDetailsSaga';

export function* rootSaga() {
    yield all([
        fork(watchGetCurrencyAverageForGivenMonth),
        fork(watchGetCurrencyDataForGivenMonth)
    ]);
};