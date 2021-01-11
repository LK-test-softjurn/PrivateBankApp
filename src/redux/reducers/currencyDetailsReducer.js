import { CURRENCY_DETAILS_ACTION_TYPE, TASK_STATUS } from '../../common/consts';

const initialState = {
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
        default: {
            return state
        }
    }
}

export default currencyDetailsReducer;