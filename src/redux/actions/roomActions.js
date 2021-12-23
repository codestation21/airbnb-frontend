import axios from "axios";
import Cookies from 'js-cookie';
import {
    ALL_ROOM_SUCCESS,
    ALL_ROOM_FAILED,
    ALL_ROOM_SERVER_ERROR,
    ROOMS_BY_DHAKA_SUCCESS,
    ROOMS_BY_DHAKA_FAILED,
    ROOMS_BY_DHAKA_SERVER_ERROR,
    ROOMS_BY_SYLHET_SUCCESS,
    ROOMS_BY_SYLHET_FAILED,
    ROOMS_BY_SYLHET_SERVER_ERROR,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAILED,
    GET_ROOM_SERVER_ERR
} from "redux/constants/roomTypes";
import { CLEAR_ERRORS } from "redux/constants/serverTypes";

//Get all rooms
export const getRooms = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getRooms {
              getRooms(input: { limit: 15 }) {
                rooms {
                  id
                  name
                  price
                  guestCapacity
                  numOfBeds
                  numOfBaths
                  internet
                  airConditioned
                  ratings
                  numOfReviews
                  images {
                    url
                    id
                  }
                }
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
                    type: ALL_ROOM_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ALL_ROOM_SUCCESS,
                    payload: {
                        rooms: res.data.data.getRooms.rooms
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: ALL_ROOM_SERVER_ERROR })
        })
}
//GetRoomsByLocation
export const getRoomsByDhaka = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getRooms {
              getRooms(input: { limit: 5, filters: { location: "dhaka" } }) {
                rooms {
                  id
                  name
                  price
                  images {
                    url
                  }
                }
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
                    type: ROOMS_BY_DHAKA_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ROOMS_BY_DHAKA_SUCCESS,
                    payload: {
                        rooms: res.data.data.getRooms.rooms
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: ROOMS_BY_DHAKA_SERVER_ERROR })
        })
}
export const getRoomsBySylhet = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getRooms {
              getRooms(input: { limit: 5, filters: { location: "barishal" } }) {
                rooms {
                  id
                  name
                  price
                  images {
                    url
                  }
                }
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
                    type: ROOMS_BY_SYLHET_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ROOMS_BY_SYLHET_SUCCESS,
                    payload: {
                        rooms: res.data.data.getRooms.rooms
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: ROOMS_BY_SYLHET_SERVER_ERROR })
        })
}

export const getRoom = (token, roomId) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getRoom {
              getRoom(id: "${roomId}") {
                id
                name
                price
                description
                address
                lat
                lng
                guestCapacity
                numOfBeds
                numOfBaths
                internet
                breakFast
                airConditioned
                petsAllowed
                roomCleaning
                ratings
                numOfReviews
                category
                images {
                  url
                }
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
                    type: GET_ROOM_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ROOM_SUCCESS,
                    payload: {
                        room: res.data.data.getRoom
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ROOM_SERVER_ERR })
        })
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

