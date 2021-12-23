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
import {CLEAR_ERRORS} from "redux/constants/serverTypes";

export const allRoomsReducer = (state = {rooms: [], message: null}, action) => {
    switch (action.type) {
        case ALL_ROOM_SUCCESS:
            return {
                rooms: action.payload.rooms
            }
        case ALL_ROOM_FAILED:
            return {
                message: action.payload.message
            }
        case ALL_ROOM_SERVER_ERROR:
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

export const roomsByDhaReducers = (state = {rooms: [], message: null}, action) => {
    switch (action.type) {
        case ROOMS_BY_DHAKA_SUCCESS:
            return {
                rooms: action.payload.rooms
            }
        case ROOMS_BY_DHAKA_FAILED:
            return {
                message: action.payload.message
            }
        case ROOMS_BY_DHAKA_SERVER_ERROR:
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
export const roomsBySylhetReducers = (state = {rooms: [], message: null}, action) => {
    switch (action.type) {
        case ROOMS_BY_SYLHET_SUCCESS:
            return {
                rooms: action.payload.rooms
            }
        case ROOMS_BY_SYLHET_FAILED:
            return {
                message: action.payload.message
            }
        case ROOMS_BY_SYLHET_SERVER_ERROR:
            return {
                message: "Something went Wrong!"
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                message: null
            }
        }
        default:
            return state
    }
}

export const getRoomReducers = (state = {room: null, message: null}, action) => {
    switch (action.type) {
        case GET_ROOM_FAILED:
            return {
                message: action.payload.message
            }
        case GET_ROOM_SUCCESS: {
            return {
                room: action.payload.room
            }
        }
        case GET_ROOM_SERVER_ERR:
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