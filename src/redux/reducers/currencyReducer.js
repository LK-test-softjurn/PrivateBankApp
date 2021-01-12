
// imports internal
import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../../common/consts';

const initialState = {
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth(),
    averageValues: [],
    taskStatus: TASK_STATUS.NONE
}
// averages [{"averagePurchaseRate": 28.10909063165838, "averageSaleRate": 28.53636308149858, "currency": "USD"}, {"averagePurchaseRate": 34.36818244240501, "averageSaleRate": 35.04363597523082, "currency": "EUR"}, {"averagePurchaseRate": 7.2272726405750625, "averageSaleRate": 7.754545471884987, "currency": "PLZ"}]
const currencyReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENCY_ACTION_TYPE.READY_AVERAGE_FOR_GIVEN_MONTH: {
            return {
                ...state,
                averageValues: [...action?.value]
            }
        }
        case CURRENCY_ACTION_TYPE.TASK_STATUS: {
            return {
                ...state,
                taskStatus: action?.value
            }
        }
        case CURRENCY_ACTION_TYPE.CLEAR_DATA: {
            return {
                averageValues: [],
                taskStatus: TASK_STATUS.NONE
            }
        }
        case CURRENCY_ACTION_TYPE.SET_CHOSEN_MONTH: {
            return {
                ...state,
                month: action?.value
            }
        }
        case CURRENCY_ACTION_TYPE.SET_CHOSEN_YEAR: {
            return {
                ...state,
                year: action?.value
            }
        } 
        default: {
            return state
        }
    }
}

export default currencyReducer;