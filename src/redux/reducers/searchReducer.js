import {
    INITIAL_SEARCH_SUCCESS,
    GET_ROOMS_BY_FIlTER_SUCCESS,
    GET_ROOMS_BY_FILTER_FAILED,
    GET_ROOMS_BY_FILTER_SERVER_ERR
} from "redux/constants/searchTypes";
import {CLEAR_ERRORS} from 'redux/constants/serverTypes';

export const initSearchReducer = (state = {rooms: []}, action) => {
    switch (action.type) {
        case INITIAL_SEARCH_SUCCESS:
            return {
                rooms: action.payload.rooms
            }
        default:
            return state
    }
}

export const getRoomsByFilterReducers = (state = {rooms: [], pageInfo: null, message: null}, action) => {
    switch (action.type) {
        case GET_ROOMS_BY_FILTER_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ROOMS_BY_FIlTER_SUCCESS:
            return {
                rooms: action.payload.rooms,
                pageInfo: action.payload.pageInfo
            }
        case GET_ROOMS_BY_FILTER_SERVER_ERR:
            return {
                message: "Something went wrong!"
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}