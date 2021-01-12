import { CURRENCY_DETAILS_ACTION_TYPE, TASK_STATUS } from '../../common/consts';

const initialState = {
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth(),
    dailyValues: [],
    taskStatus: TASK_STATUS.NONE
}

const currencyDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENCY_DETAILS_ACTION_TYPE.READY_DATA_FOR_GIVEN_MONTH: {
            return {
                ...state,
                dailyValues: [...action?.value]
            }
        }
        case CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS: {
            return {
                ...state,
                taskStatus: action?.value
            }
        }
        case CURRENCY_DETAILS_ACTION_TYPE.CLEAR_DATA: {
            return {
                dailyValues: [],
                taskStatus: TASK_STATUS.NONE
            }
        }
        case CURRENCY_DETAILS_ACTION_TYPE.CLEAR_ERROR: {
            return {
                ...state,
                taskStatus: TASK_STATUS.NONE
            }
        }
        case CURRENCY_DETAILS_ACTION_TYPE.SET_CHOSEN_MONTH: {
            return {
                ...state,
                month: action?.value
            }
        }
        case CURRENCY_DETAILS_ACTION_TYPE.SET_CHOSEN_YEAR: {
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

export default currencyDetailsReducer;