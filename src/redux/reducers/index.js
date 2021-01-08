import { combineReducers } from 'redux';
import currencyReducer from './currencyReducer';
import currencyDetailsReducer from './currencyDetailsReducer';

export const rootReducer = combineReducers({
    currency: currencyReducer,
    currencyDetails: currencyDetailsReducer
});

