import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../../common/consts';

const initialState = {
    averageValues: [], // {currency: name, average: val}
    taskStatus: TASK_STATUS.NONE
}

const currencyReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENCY_ACTION_TYPE.READY_AVERAGE_FOR_GIVEN_MONTH: {
            return {
                ...state,
                averageValues: [...action?.value?.averageValues]
            }
        }
        case CURRENCY_ACTION_TYPE.TASK_STATUS: {
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

export default currencyReducer;