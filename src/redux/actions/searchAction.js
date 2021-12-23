import axios from "axios";
import {
    INITIAL_SEARCH_SUCCESS,
    GET_ROOMS_BY_FIlTER_SUCCESS,
    GET_ROOMS_BY_FILTER_FAILED,
    GET_ROOMS_BY_FILTER_SERVER_ERR
} from "redux/constants/searchTypes";
import { CLEAR_ERRORS } from 'redux/constants/serverTypes';


export const getInitSearchRooms = (token) => async (dispatch) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getRooms {
              getRooms(input: {}) {
                rooms {
                  name
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
            dispatch({
                type: INITIAL_SEARCH_SUCCESS,
                payload: {
                    rooms: res.data.data.getRooms.rooms
                }
            })
        })
        .catch(err => err)
}

export const getRoomsByFilter = (token, query) => async (dispatch) => {
    const name = query.name ? query.name.replace(/-/g, ' ') : "";
    const order = query.sort ? query.sort : "";
    const category = query.category ? query.category : "";
    const location = query.location ? query.location.replace(/-/g, ' ') : "";
    const guests = query.guests ? query.guests : "";
    let price = "[]"
    if (query.price) {
        if (query.price !== "-") {
            price = `["${query.price.split("-")[0]}", "${query.price.split("-")[1]}"]`
        }
    }
    const page = query.page ? query.page : "";

    await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        query: `
            query getRooms {
              getRooms(
                input: {
                  order: "${order}"
                  limit: 10
                  page: "${page}"
                  filters: {
                    name: "${name}"
                    price: ${price}
                    category: "${category}"
                    location: "${location}"
                    guestCapacity: "${guests}"
                  }
                }
              ) {
                rooms {
                  id
                  name
                  price
                  lat
                  lng
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
                pageInfo {
                  resultPerPage
                  count
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
                    type: GET_ROOMS_BY_FILTER_FAILED,
                    payload: {
                        message: res.data.errors[0].message
                    }
                })
            } else {
                dispatch({
                    type: GET_ROOMS_BY_FIlTER_SUCCESS,
                    payload: {
                        rooms: res.data.data.getRooms.rooms,
                        pageInfo: res.data.data.getRooms.pageInfo
                    }
                })
            }
        })
        .catch(err => {
            dispatch({ type: GET_ROOMS_BY_FILTER_SERVER_ERR })
        })
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}