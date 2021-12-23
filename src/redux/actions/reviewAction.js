import axios from "axios";
import Cookies from 'js-cookie'
import {
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILED,
    GET_REVIEWS_SEVRER_ERR,
    CHECK_REVIEWS_SUCCESS,
    CHECK_REVIEWS_FAILED,
    CHECK_REVIEWS_SERVER_ERR,
    ADD_REVIEWS_SUCCESS,
    ADD_REVIEWS_FAILED,
    ADD_REVIEWS_LOADING,
    ADD_REVIEWS_SERVER_ERR,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAILED,
    UPDATE_REVIEW_LOADING,
    UPDATE_REVIEW_SERVER_ERR
} from "../constants/reviewsTypes";
import { CLEAR_ERRORS } from "../constants/serverTypes";

export const getReviews = (token, room) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getReviews {
              getReviews(
                room: "${room}"
              ){
                id
                user{
                  id
                  name
                  avatar
                }
                rating
                comment
                updatedAt
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
                    type: GET_REVIEWS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_REVIEWS_SUCCESS,
                    payload: {
                        reviews: res.data.data.getReviews
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_REVIEWS_SEVRER_ERR })
        })
}

export const checkReview = (token, room) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query checkReviewAvailbilty {
              checkReviewAvailbilty(
                room: "${room}"
              ){
                isCanAdd
                isCanUpdate
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
                    type: CHECK_REVIEWS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: CHECK_REVIEWS_SUCCESS,
                    payload: {
                        isReviews: res.data.data.checkReviewAvailbilty
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: CHECK_REVIEWS_SERVER_ERR })
        })
}

export const addReviews = (room, comment, rating) => async (dispatch) => {
    dispatch({ type: ADD_REVIEWS_LOADING })
    const token = Cookies.get('token')
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
              mutation addReviews {
                  addReviews(
                    input: {
                      room: "${room}"
                      rating: ${rating}
                      comment: "${comment}"
                    }
                  ) {
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
                    type: ADD_REVIEWS_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: ADD_REVIEWS_SUCCESS,
                    payload: {
                        message: res.data.data.addReviews.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: ADD_REVIEWS_SERVER_ERR })
        })
}

export const updateReviews = (room, comment, rating) => async (dispatch) => {
    dispatch({ type: UPDATE_REVIEW_LOADING })
    const token = Cookies.get('token')
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
              mutation updateReviews {
                  updateReviews(
                    input: {
                      room: "${room}"
                      rating: ${rating}
                      comment: "${comment}"
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
                    type: UPDATE_REVIEW_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                    payload: {
                        message: res.data.data.updateReviews.message
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: UPDATE_REVIEW_SERVER_ERR })
        })
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}