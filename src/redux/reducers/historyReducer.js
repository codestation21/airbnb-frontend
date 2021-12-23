import {
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILED,
    GET_HISTORY_SERVER_ERR
} from "../constants/historyTypes";
import {CLEAR_ERRORS} from '../constants/serverTypes';

export const getHistoryReducer = (state = {history: [], message: null}, action) => {
    switch (action.type) {
        case GET_HISTORY_FAILED:
            return {
                message: action.payload.message
            }
        case GET_HISTORY_SUCCESS:
            return {
                history: action.payload.history
            }
        case GET_HISTORY_SERVER_ERR:
            return {
                message: "Something went wrong!"
            }
        default:
            return state
    }
}