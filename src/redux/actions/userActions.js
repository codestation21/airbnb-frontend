import axios from "axios";
import FormData from "form-data";
import Cookies from 'js-cookie';
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

const authSuccess = (token, message = null) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: {
            token: token,
            message: message
        }
    }
}
const authFailed = message => {
    return {
        type: SIGNUP_FAILED,
        payload: {
            message: message
        }
    }
}
const getUserFailed = message => {
    return {
        type: GET_USER_FAILED,
        payload: {
            message: message
        }
    }
}
const getUserInfo = (data) => {
    return {
        type: GET_USER_SUCCESS,
        payload: {
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            role: data.role
        }
    }
}
export const signUp = (data) => async (dispatch) => {
    dispatch({ type: SIGNUP_LOADING });
    var formData = new FormData();
    formData.append('operations', `{ "query": "mutation($file: Upload!) {signUp(avatar: $file, input: {name: \\"${data.name}\\", email: \\"${data.email}\\", password: \\"${data.password}\\"}){message, token}}", "variables": { "file": null } }`);
    formData.append('map', '{ "0": ["variables.file"] }');
    formData.append('0', data.picture[0]);

    await axios.post(process.env.NEXT_PUBLIC_API_URL, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.data.errors) {
                dispatch(authFailed(res.data.errors[0].message))
            } else {
                Cookies.set('token', `${res.data.data.signUp.token}`, { expires: 30, path: '/' })
                dispatch(authSuccess(res.data.data.signUp.token, res.data.data.signUp.message))
            }
        })
        .catch(error => {
            dispatch({ type: SIGNUP_SERVER_ERR })
        });
}

export const login = (data) => async (dispatch) => {
    dispatch({ type: SIGNUP_LOADING })
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation Login {
              Login(input: { email: "${data.email}", password: "${data.password}" }) {
                message
                token
              }
            }`
    })
        .then(res => {
            if (res.data.errors) {
                dispatch(authFailed(res.data.errors[0].message))
            } else {
                Cookies.set('token', `${res.data.data.Login.token}`, { expires: 30, path: '/' })
                dispatch(authSuccess(res.data.data.Login.token, res.data.data.Login.message))
            }
        })
        .catch(err => {
            dispatch({ type: SIGNUP_SERVER_ERR })
        })
}
export const getUser = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getUser {
              getUser {
                id
                name
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
            dispatch({ type: GET_USER_SERVER_ERR })
        })
}
export const authCheck = (token) => dispatch => {
    if (!token) {
        return false
    } else {
        dispatch(authSuccess(token));
        return true;
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}