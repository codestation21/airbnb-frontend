import {
    ADMIN_GET_ALL_ROOMS_SUCCESS,
    ADMIN_GET_ALL_ROOMS_FAILED,
    ADMIN_GET_ALL_ROOMS_SERVER_ERR,
    ADD_ROOMS_SUCCESS,
    ADD_ROOMS_FAILED,
    ADD_ROOMS_LOADING,
    ADD_ROOMS_SERVER_ERR,
    UPDATE_ROOMS_SUCCESS,
    UPDATE_ROOMS_FAILED,
    UPDATE_ROOMS_LOADING,
    UPDATE_ROOMS_SERVER_ERR,
    DELETE_ROOMS_SUCCESS,
    DELETE_ROOMS_FAILED,
    DELETE_ROOMS_LOADING,
    DELETE_ROOMS_SERVER_ERR,
    GET_ALL_ADMIN_BOOKING_SUCCESS,
    GET_ALL_ADMIN_BOOKING_FAILED,
    GET_ALL_ADMIN_BOOKING_SERVER_ERR,
    GET_ADMIN_BOOK_SUCCESS,
    GET_ADMIN_BOOK_FAILED,
    GET_ADMIN_BOOK_SERVER_ERR,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILED,
    DELETE_BOOKING_LOADING,
    DELETE_BOOKING_SERVER_ERR,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILED,
    GET_ALL_USER_SERVER_ERR,
    USER_ADMIN_UPDATE_SUCCESS,
    USER_ADMIN_UPDATE_FAILED,
    USER_ADMIN_UPDATE_LOADING,
    USER_ADMIN_UPDATE_SERVER_ERR,
    USER_ADMIN_DELETE_SUCESS,
    USER_ADMIN_DELETE_FAILED,
    USER_ADMIN_DELETE_SERVER_ERR,
    GET_ADMIN_REVIEWS_SUCCESS,
    GET_ADMIN_REVIEWS_FAILED,
    GET_ADMIN_REVIEWS_SERVER_ERR,
    DELETE_REVIEWS_SUCCESS,
    DELETE_REVIEWS_FAILED,
    DELETE_REVIEWS_SERVER_ERR
} from "../constants/adminTypes";
import { CLEAR_ERRORS } from "../constants/serverTypes";

export const getAllRoomForAdminReducer = (state = { rooms: [], message: null }, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_ROOMS_SUCCESS:
            return {
                rooms: action.payload.rooms
            }
        case ADMIN_GET_ALL_ROOMS_FAILED:
            return {
                message: action.payload.message
            }
        case ADMIN_GET_ALL_ROOMS_SERVER_ERR:
            return {
                message: "Somehting went wrong!"
            }
        default:
            return state
    }
}

export const addRoomsReducers = (state = { message: null, success: false, loading: false }, action) => {
    switch (action.type) {
        case ADD_ROOMS_LOADING:
            return {
                loading: true
            }
        case ADD_ROOMS_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message
            }
        case ADD_ROOMS_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case ADD_ROOMS_SERVER_ERR:
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
            return state;
    }
}

export const updateRoomReducers = (state = { message: null, success: false, loading: false }, action) => {
    switch (action.type) {
        case UPDATE_ROOMS_LOADING:
            return {
                loading: true
            }
        case UPDATE_ROOMS_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message
            }
        case UPDATE_ROOMS_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case UPDATE_ROOMS_SERVER_ERR:
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
            return state;
    }
}

export const deleteRoomsReducers = (state = { message: null, success: false, loading: false }, action) => {
    switch (action.type) {
        case DELETE_ROOMS_LOADING:
            return {
                loading: true
            }
        case DELETE_ROOMS_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message
            }
        case DELETE_ROOMS_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case DELETE_ROOMS_SERVER_ERR:
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
            return state;
    }
}

export const getAdminBookingReducer = (state = { bookings: [], message: null }, action) => {
    switch (action.type) {
        case GET_ALL_ADMIN_BOOKING_SUCCESS:
            return {
                bookings: action.payload.booking
            }
        case GET_ALL_ADMIN_BOOKING_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ALL_ADMIN_BOOKING_SERVER_ERR:
            return {
                message: "Something went wrong!"
            }
        default:
            return state
    }
}

export const getAdminBookReducers = (state = { booking: null, message: null }, action) => {
    switch (action.type) {
        case GET_ADMIN_BOOK_SUCCESS:
            return {
                booking: action.payload.booking
            }
        case GET_ADMIN_BOOK_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ADMIN_BOOK_SERVER_ERR:
            return {
                message: "Something went wrong!"
            }
        default:
            return state
    }
}

export const deleteBookingReducers = (state = { message: null, success: false, loading: false }, action) => {
    switch (action.type) {
        case DELETE_BOOKING_LOADING:
            return {
                loading: true
            }
        case DELETE_BOOKING_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message
            }
        case DELETE_BOOKING_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case DELETE_BOOKING_SERVER_ERR:
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
            return state;
    }
}

export const getAllUsersReducers = (state = { users: [], message: null }, action) => {
    switch (action.type) {
        case GET_ALL_USER_SUCCESS:
            return {
                users: action.payload.users
            }
        case GET_ALL_USER_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ALL_USER_SERVER_ERR:
            return {
                message: "Somehting went wrong!"
            }
        default:
            return state
    }
}

export const adminUserUpdateReducer = (state = { message: null, success: false, loading: false }, action) => {
    switch (action.type) {
        case USER_ADMIN_UPDATE_LOADING:
            return {
                loading: true
            }
        case USER_ADMIN_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message
            }
        case USER_ADMIN_UPDATE_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case USER_ADMIN_UPDATE_SERVER_ERR:
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
            return state;
    }
}

export const adminUserDeleteReducer = (state = { message: null, success: false }, action) => {
    switch (action.type) {
        case USER_ADMIN_DELETE_FAILED:
            return {
                message: action.payload.message,
                success: false
            }
        case USER_ADMIN_DELETE_SUCESS:
            return {
                message: action.payload.message,
                success: true,
            }
        case USER_ADMIN_DELETE_SERVER_ERR:
            return {
                message: "Something went worng!",
                success: false
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

export const getAdminReviewsReducers = (state = { reviews: [], message: null }, action) => {
    switch (action.type) {
        case GET_ADMIN_REVIEWS_SUCCESS:
            return {
                reviews: action.payload.reviews
            }
        case GET_ADMIN_REVIEWS_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ADMIN_REVIEWS_SERVER_ERR: {
            return {
                message: "Something went wrong!"
            }
        }
        default:
            return state
    }
}

export const deleteReviewsReducer = (state = { deleteMessage: null, success: false }, action) => {
    switch (action.type) {
        case DELETE_REVIEWS_FAILED:
            return {
                deleteMessage: action.payload.message,
                success: false
            }
        case DELETE_REVIEWS_SUCCESS:
            return {
                deleteMessage: action.payload.message,
                success: true,
            }
        case DELETE_REVIEWS_SERVER_ERR:
            return {
                deleteMessage: "Something went worng!",
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deleteMessage: null
            }
        default:
            return state
    }
}