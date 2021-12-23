import axios from "axios";
import FormData from "form-data";
import Cookies from 'js-cookie';
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

export const checkAdmin = (token) => async (dispatch) => {
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL, {
            query: `
            query getUser {
              getUser {
                role
              }
            }`
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        if (data.data.getUser.role === "admin") {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

export const getAllRoomsForAdmin = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getAllRooms {
              getAllRooms {
                id
                name
                price
                category
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
                    type: ADMIN_GET_ALL_ROOMS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ADMIN_GET_ALL_ROOMS_SUCCESS,
                    payload: {
                        rooms: res.data.data.getAllRooms
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: ADMIN_GET_ALL_ROOMS_SERVER_ERR })
        })
}


export const addRooms = (data) => async (dispatch) => {
    dispatch({ type: ADD_ROOMS_LOADING });
    const token = Cookies.get('token')
    var formData = new FormData();
    formData.append('operations', `{ "query": "mutation($file: [Upload]!) {addRooms(images: $file, input: {name: \\"${data.name}\\", price: \\"${data.price}\\", description: \\"${data.description}\\", address: \\"${data.address}\\", guestCapacity: \\"${data.guest}\\", numOfBeds: \\"${data.beds}\\", numOfBaths: \\"${data.baths}\\", internet: ${data.internet}, breakFast: ${data.breakfast}, airConditioned: ${data.airCondition}, petsAllowed: ${data.petAllowed}, roomCleaning: ${data.roomCleaning}, category: \\"${data.category}\\"}){message}}", "variables": { "file": [${new Array(data.picture.length).fill('null')}] } }`);
    if (data.picture.length > 0) {
        const map = {};
        Array.from(data.picture).forEach((file, i) => {
            map[i] = [`variables.file.${i}`]
        });
        formData.append('map', JSON.stringify(map));
        Array.from(data.picture).forEach((file, i) => {
            formData.append(`${i}`, file);
        });
    }
    await axios.post(process.env.NEXT_PUBLIC_API_URL, formData, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: ADD_ROOMS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ADD_ROOMS_SUCCESS,
                    payload: {
                        message: res.data.data.addRooms.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: ADD_ROOMS_SERVER_ERR })
        });

}

export const updateRooms = (data, Ids) => async (dispatch) => {
    dispatch({ type: UPDATE_ROOMS_LOADING });
    const token = Cookies.get('token')
    var formData = new FormData();
    if (data.picture.length > 0) {
        formData.append('operations', `{ "query": "mutation($file: [Upload]) {updateRooms(id: \\"${Ids}\\", images: $file, input: {name: \\"${data.name}\\", price: \\"${data.price}\\", description: \\"${data.description}\\", address: \\"${data.address}\\", guestCapacity: \\"${data.guest}\\", numOfBeds: \\"${data.beds}\\", numOfBaths: \\"${data.baths}\\", internet: ${data.internet}, breakFast: ${data.breakfast}, airConditioned: ${data.airCondition}, petsAllowed: ${data.petAllowed}, roomCleaning: ${data.roomCleaning}, category: \\"${data.category}\\"}){message}}", "variables": { "file": [${new Array(data.picture.length).fill('null')}] } }`);
        const map = {};
        Array.from(data.picture).forEach((file, i) => {
            map[i] = [`variables.file.${i}`]
        });
        formData.append('map', JSON.stringify(map));
        Array.from(data.picture).forEach((file, i) => {
            formData.append(`${i}`, file);
        });
    } else if (data.picture.length === 0) {
        formData.append('operations', `{ "query": "mutation($file: [Upload]) {updateRooms(id: \\"${Ids}\\", images: $file, input: {name: \\"${data.name}\\", price: \\"${data.price}\\", description: \\"${data.description}\\", address: \\"${data.address}\\", guestCapacity: \\"${data.guest}\\", numOfBeds: \\"${data.beds}\\", numOfBaths: \\"${data.baths}\\", internet: ${data.internet}, breakFast: ${data.breakfast}, airConditioned: ${data.airCondition}, petsAllowed: ${data.petAllowed}, roomCleaning: ${data.roomCleaning}, category: \\"${data.category}\\"}){message}}", "variables": {} }`);
        formData.append('map', '{ "0": [] }');
        formData.append('0', null);
    }
    await axios.post(process.env.NEXT_PUBLIC_API_URL, formData, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch({
                    type: UPDATE_ROOMS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_ROOMS_SUCCESS,
                    payload: {
                        message: res.data.data.updateRooms.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: UPDATE_ROOMS_SERVER_ERR })
        });

}

export const deleteRooms = (Ids) => async (dispatch) => {
    dispatch({ type: DELETE_ROOMS_LOADING });
    const token = Cookies.get('token')
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
        mutation deleteRooms {
            deleteRooms(id: "${Ids}"){
              message
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
                    type: DELETE_ROOMS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_ROOMS_SUCCESS,
                    payload: {
                        message: res.data.data.deleteRooms.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: DELETE_ROOMS_SERVER_ERR })
        })
}

export const getAllAdminBookings = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
        query getAdminBooking {
            getAdminBooking{
              id
              checkInDate
              checkOutDate
              amountPaid
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
                    type: GET_ALL_ADMIN_BOOKING_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ALL_ADMIN_BOOKING_SUCCESS,
                    payload: {
                        booking: res.data.data.getAdminBooking
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ALL_ADMIN_BOOKING_SERVER_ERR })
        })
}

export const getAdminBook = (token, Ids) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
        query getAdminBook {
            getAdminBook(id: "${Ids}") {
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
                name
                email
              }
              paymentInfo {
                id
                status
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
                    type: GET_ADMIN_BOOK_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ADMIN_BOOK_SUCCESS,
                    payload: {
                        booking: res.data.data.getAdminBook
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ADMIN_BOOK_SERVER_ERR })
        })
}

export const deleteBooking = (Ids) => async (dispatch) => {
    dispatch({ type: DELETE_BOOKING_LOADING });
    const token = Cookies.get('token')
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
        mutation deleteBooking {
            deleteBooking(id: "${Ids}") {
              message
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
                    type: DELETE_BOOKING_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_BOOKING_SUCCESS,
                    payload: {
                        message: res.data.data.deleteBooking.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: DELETE_BOOKING_SERVER_ERR })
        })
}

export const getAllUsers = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getAllUser {
                getAllUser{
                id
                name
                email
                role
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
                    type: GET_ALL_USER_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ALL_USER_SUCCESS,
                    payload: {
                        users: res.data.data.getAllUser
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ALL_USER_SERVER_ERR })
        })
}

export const userAdminUpdate = (data, Ids) => async (dispatch) => {
    dispatch({ type: USER_ADMIN_UPDATE_LOADING });
    const token = Cookies.get('token');
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation updateUserAdmin {
                updateUserAdmin(
                id: "${Ids}"
                input: {
                    name: "${data.name}"
                    email: "${data.email}"
                    role: "${data.role}"
                }
                ){
                message
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
                    type: USER_ADMIN_UPDATE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: USER_ADMIN_UPDATE_SUCCESS,
                    payload: {
                        message: res.data.data.updateUserAdmin.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: USER_ADMIN_UPDATE_SERVER_ERR })
        })
}

export const userAdminDelete = (Ids) => async (dispatch) => {
    const token = Cookies.get('token');
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation deleteUserAdmin {
                deleteUserAdmin(id: "${Ids}"){
                message
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
                    type: USER_ADMIN_DELETE_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: USER_ADMIN_DELETE_SUCESS,
                    payload: {
                        message: res.data.data.deleteUserAdmin.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: USER_ADMIN_DELETE_SERVER_ERR })
        })
}

export const getAdminReviews = (Ids) => async (dispatch) => {
    const token = Cookies.get('token');
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getReviews {
              getReviews(
                room: "${Ids}"
              ){
                id
                user{
                  name
                }
                rating
                comment
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
                    type: GET_ADMIN_REVIEWS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ADMIN_REVIEWS_SUCCESS,
                    payload: {
                        reviews: res.data.data.getReviews
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ADMIN_REVIEWS_SERVER_ERR })
        })
}

export const deleteReviews = (Ids) => async (dispatch) => {
    const token = Cookies.get('token');
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation deleteReviews {
                deleteReviews(id: "${Ids}"){
                message
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
                    type: DELETE_REVIEWS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: DELETE_REVIEWS_SUCCESS,
                    payload: {
                        message: res.data.data.getReviews
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: DELETE_REVIEWS_SERVER_ERR })
        })
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}