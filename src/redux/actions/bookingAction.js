import axios from "axios";
import Cookies from 'js-cookie'
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
import { CLEAR_ERRORS } from "../constants/serverTypes";

export const checkBookedAvailbility = (data) => async (dispatch) => {
    const token = Cookies.get('token');
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query checkRoomAvailability {
              checkRoomAvailability(
                input: {
                  roomId: "${data.roomId}"
                  checkInDate: "${data.checkInDate}"
                  checkOutDate: "${data.checkOutDate}"
                }
              ) {
                isAvailable
              }
            }`
    }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: CHECK_BOOKING_AVAILABLE_SUCCESS,
                    payload: {
                        message: res.data.data.checkRoomAvailability.isAvailable
                    }
                })
            }
        })
        .catch(err => err);
}
export const getBookedDates = (id) => async (dispatch) => {
    const token = Cookies.get('token');
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getAllBookedDate {
              getAllBookedDate(
                  roomId: "${id}"
              )
            }`
    }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.data.errors) {
                dispatch({
                    type: GET_BOOKED_DATES_SUCCESS,
                    payload: {
                        dates: res.data.data.getAllBookedDate
                    }
                })
            }
        })
        .catch(err => err)
}

export const getAllBookings = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getAllBooking {
              getAllBooking{
                id
                room {
                  name
                  price
                }
                user {
                  name
                  email
                }
                checkInDate
                checkOutDate
                amountPaid
                daysOfStay
                paidAt
              }
            }`
    }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_ALL_BOOKING_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ALL_BOOKING_SUCCESS,
                    payload: {
                        bookings: res.data.data.getAllBooking
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ALL_BOOKING_SERVER_ERR })
        })
}

export const getBooking = (token, Id) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getBooking {
              getBooking(id: "${Id}") {
                id
                room {
                  id
                  name
                  price
                  images {
                    url
                  }
                }
                user {
                  id
                  name
                  email
                }
                checkInDate
                checkOutDate
                amountPaid
                daysOfStay
                paidAt
              }
            }
`
    }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: GET_BOOKING_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_BOOKING_SUCCESS,
                    payload: {
                        booking: res.data.data.getBooking
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_BOOKING_SERVER_ERR })
        })
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}