import {
    CHECK_BOOKING_AVAILABLE_SUCCESS,
    GET_BOOKED_DATES_SUCCESS,
    GET_ALL_BOOKING_SUCCESS,
    GET_ALL_BOOKING_FAILED,
    GET_ALL_BOOKING_SERVER_ERR,
    GET_BOOKING_SUCCESS,
    GET_BOOKING_FAILED,
    GET_BOOKING_SERVER_ERR
} from "../constants/bookingTypes";
import {CLEAR_ERRORS} from "../constants/serverTypes";

export const checkBookAvailReducer = (state = {isAvailable: null}, action) => {
    switch (action.type) {
        case CHECK_BOOKING_AVAILABLE_SUCCESS:
            return {
                isAvailable: action.payload.message
            }
        default:
            return state
    }
}

export const getBookedDateReducer = (state = {dates: []}, action) => {
    switch (action.type) {
        case GET_BOOKED_DATES_SUCCESS:
            return {
                dates: action.payload.dates
            }
        default:
            return state
    }
}

export const getAllBookingsReducer = (state = {bookings: [], message: null}, action) => {
    switch (action.type) {
        case GET_ALL_BOOKING_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ALL_BOOKING_SUCCESS:
            return {
                bookings: action.payload.bookings
            }
        case GET_ALL_BOOKING_SERVER_ERR:
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

export const getBookingReducer = (state = {booking: null, message: null}, action) => {
    switch (action.type) {
        case GET_BOOKING_FAILED:
            return {
                message: action.payload.message
            }
        case GET_BOOKING_SUCCESS:
            return {
                booking: action.payload.booking
            }
        case GET_BOOKING_SERVER_ERR:
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