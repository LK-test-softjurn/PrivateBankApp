
// imports internal
import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../../common/consts';

const initialState = {
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth(),
    averageValues: [],
    taskStatus: TASK_STATUS.NONE
}

const currencyReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENCY_ACTION_TYPE.DATA_READY: {
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
                ...state,
                averageValues: [],
            }
        }
        case CURRENCY_ACTION_TYPE.CLEAR_ERROR: {
            return {
                ...state,
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