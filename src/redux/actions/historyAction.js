import axios from "axios";
import {
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILED,
    GET_HISTORY_SERVER_ERR
} from "../constants/historyTypes";

export const addHistory = (token, room) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            mutation addHistory {
              addHistory(room: "${room}") {
                message
              }
            }`
    }, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res)
        .catch(err => err)
}

export const getHistory = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getHistory {
              getHistory {
                id
                room {
                  id
                  name
                  guestCapacity
                  numOfBeds
                  breakFast
                  internet
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
                    type: GET_HISTORY_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_HISTORY_SUCCESS,
                    payload: {
                        history: res.data.data.getHistory
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_HISTORY_SERVER_ERR })
        })
}