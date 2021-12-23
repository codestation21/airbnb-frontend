import {
    SIGNUP_SUCCESS,
    SIGNUP_LOADING,
    SIGNUP_FAILED,
    SIGNUP_SERVER_ERR,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_SERVER_ERR
} from "../constants/userTpes";
import { CLEAR_ERRORS } from "../constants/serverTypes";

export const authReducers = (state = { loading: false, success: false, message: null, token: null }, action) => {
    switch (action.type) {
        case SIGNUP_LOADING:
            return {
                loading: true
            }
        case SIGNUP_SUCCESS:
            return {
                success: true,
                loading: false,
                token: action.payload.token,
                message: action.payload.message
            }
        case SIGNUP_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case SIGNUP_SERVER_ERR:
            return {
                loading: false,
                success: false,
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

export const getUserReducer = (state = { user: null, message: null }, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {
                user: action.payload
            }
        case GET_USER_FAILED:
            return {
                message: action.payload.message
            }
        case GET_USER_SERVER_ERR:
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