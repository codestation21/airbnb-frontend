import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_LOADING,
    GET_USER_PROFILE_SERVER_ERR,
    GET_USER_PROFILE_FAILED,
    UPDATE_USER_LOADING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_SERVER_ERR
} from "../constants/profileTypes";
import {CLEAR_ERRORS} from "../constants/serverTypes";

export const profileReducer = (state = {user: null, message: null, loading: false, success: null}, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_LOADING:
            return {
                loading: true
            }
        case GET_USER_PROFILE_SUCCESS:
            return {
                success: true,
                loading: false,
                user: action.payload
            }
        case GET_USER_PROFILE_FAILED:
            return {
                success: false,
                loading: false,
                message: action.payload.message
            }
        case GET_USER_PROFILE_SERVER_ERR:
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

export const userUpdateReducer = (state = {message: null, loading: false, success: false}, action) => {
    switch (action.type) {
        case UPDATE_USER_LOADING:
            return {
                loading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message
            }
        case UPDATE_USER_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case UPDATE_USER_SERVER_ERR:
            return {
                loading: false,
                success: false,
                message: "Something went wrong"
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