import { CURRENCY_DETAILS_ACTION_TYPE, TASK_STATUS } from '../../common/consts';

const initialState = {
    daylyValues: [],
    taskStatus: TASK_STATUS.NONE
}

const currencyDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENCY_DETAILS_ACTION_TYPE.GET_DATA_FOR_GIVEN_MONTH_BY_CURRENCY: {
            return {
                ...state,
                daylyValues: [...action?.value?.daylyValues]
            }
        }
        case CURRENCY_DETAILS_ACTION_TYPE.TASK_STATUS: {
            return {
                ...state,
                taskStatus: action?.value
            }
        }
        default: {
            return state
        }
    }
}

export default currencyDetailsReducer;