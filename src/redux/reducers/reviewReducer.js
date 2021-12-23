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
import {CLEAR_ERRORS} from "../constants/serverTypes";

export const getReviewsReducer = (state = {reviews: [], message: null}, action) => {
    switch (action.type) {
        case GET_REVIEWS_SUCCESS:
            return {
                reviews: action.payload.reviews
            }
        case GET_REVIEWS_FAILED:
            return {
                message: action.payload.message
            }
        case GET_REVIEWS_SEVRER_ERR: {
            return {
                message: "Something went wrong!"
            }
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

export const checkReviewReducer = (state = {isReview: null, message: null}, action) => {
    switch (action.type) {
        case CHECK_REVIEWS_SUCCESS:
            return {
                isReview: action.payload.isReviews
            }
        case CHECK_REVIEWS_FAILED:
            return {
                message: action.type.message
            }
        case CHECK_REVIEWS_SERVER_ERR:
            return {
                message: "Something went worng!"
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
export const addReviewReducer = (state = {loading: false, success: false, message: null}, action) => {
    switch (action.type) {
        case ADD_REVIEWS_LOADING:
            return {
                loading: true
            }
        case ADD_REVIEWS_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                success: true
            }
        case ADD_REVIEWS_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case ADD_REVIEWS_SERVER_ERR:
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
            return state
    }
}

export const updateReviewReducer = (state = {loading: false, success: false, message: null}, action) => {
    switch (action.type) {
        case UPDATE_REVIEW_LOADING:
            return {
                loading: true
            }
        case UPDATE_REVIEW_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                success: true
            }
        case UPDATE_REVIEW_FAILED:
            return {
                loading: false,
                success: false,
                message: action.payload.message
            }
        case UPDATE_REVIEW_SERVER_ERR:
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
            return state
    }
}