import axios from "axios";
import FormData from "form-data";
import Cookies from 'js-cookie'
import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILED,
    GET_USER_PROFILE_SERVER_ERR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_LOADING,
    UPDATE_USER_FAILED,
    UPDATE_USER_SERVER_ERR
} from "../constants/profileTypes";
import { CLEAR_ERRORS } from "../constants/serverTypes";

const getUserFailed = message => {
    return {
        type: GET_USER_PROFILE_FAILED,
        payload: {
            message: message
        }
    }
}
const getUserInfo = (data) => {
    return {
        type: GET_USER_PROFILE_SUCCESS,
        payload: {
            id: data.id,
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            role: data.role
        }
    }
}
const updateUserFailed = message => {
    return {
        type: UPDATE_USER_FAILED,
        payload: {
            message: message
        }
    }
}
const updateUserSuccess = message => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: {
            message: message
        }
    }
}
export const getUserProfile = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getUser {
              getUser {
                id
                name
                email
                avatar
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
                dispatch(getUserFailed(res.data.errors[0].message))
            } else {
                dispatch(getUserInfo(res.data.data.getUser))
            }
        })
        .catch(err => {
            dispatch({ type: GET_USER_PROFILE_SERVER_ERR })
        })
}
export const Logout = () => async (dispatch) => {
    Cookies.remove('token')
}
export const updateUser = (data) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    var formData = new FormData();
    const token = Cookies.get('token')
    if (data.picture.length === 0) {
        formData.append('operations', `{ "query": "mutation($file: Upload) {updateUser(avatar: $file, input: {name: \\"${data.name}\\", password: \\"${data.password}\\"}){message}}", "variables": {} }`);
        formData.append('map', '{ "0": [] }');
        formData.append('0', data.picture[0]);
    } else {
        formData.append('operations', `{ "query": "mutation($file: Upload) {updateUser(avatar: $file, input: {name: \\"${data.name}\\", password: \\"${data.password}\\"}){message}}", "variables": {"file": null} }`);
        formData.append('map', '{ "0": ["variables.file"] }');
        formData.append('0', data.picture[0]);
    }
    await axios.post(process.env.NEXT_PUBLIC_API_URL, formData, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch(updateUserFailed(res.data.errors[0].message))
            } else {
                dispatch(updateUserSuccess(res.data.data.updateUser.message))
            }
        })
        .catch(error => {
            dispatch({ type: UPDATE_USER_SERVER_ERR })
        });
}
export const fotgetPassword = (data) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation forgotPassword {
              forgotPassword(
                email: "${data.email}"
                originUrl: "${process.env.NEXT_PUBLIC_BASE_PATH}/me/password/newpassword"
              ){
                message
              }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch(updateUserFailed(res.data.errors[0].message))
            } else {
                dispatch(updateUserSuccess(res.data.data.forgotPassword.message))
            }
        })
        .catch(err => {
            dispatch({ type: UPDATE_USER_SERVER_ERR })
        })
}
export const resetPassword = (data, token) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING });
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation resetPassword{
              resetPassword(
                password: "${data.password}"
                token: "${token}"
              ){
                message
              }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch(updateUserFailed(res.data.errors[0].message))
            } else {
                dispatch(updateUserSuccess(res.data.data.resetPassword.message))
            }
        })
        .catch(err => {
            dispatch({ type: UPDATE_USER_SERVER_ERR })
        })
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}