import { combineReducers } from "redux";
import { allRoomsReducer, roomsByDhaReducers, roomsBySylhetReducers, getRoomReducers } from "./roomReducers";
import { authReducers, getUserReducer } from "./userReducer";
import { profileReducer, userUpdateReducer } from "./profileReducer";
import { initSearchReducer, getRoomsByFilterReducers } from './searchReducer';
import {
    checkBookAvailReducer,
    getBookedDateReducer,
    getAllBookingsReducer,
    getBookingReducer
} from "./bookingReducer";
import { getReviewsReducer, checkReviewReducer, addReviewReducer, updateReviewReducer } from "./reviewReducer";
import { getHistoryReducer } from "./historyReducer";
import { getAllRoomForAdminReducer, addRoomsReducers, updateRoomReducers, deleteRoomsReducers, getAdminBookingReducer, getAdminBookReducers, deleteBookingReducers, getAllUsersReducers, adminUserUpdateReducer, adminUserDeleteReducer, getAdminReviewsReducers, deleteReviewsReducer } from "./adminReducer";

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomByDhaka: roomsByDhaReducers,
    roomBySylhet: roomsBySylhetReducers,
    getRoom: getRoomReducers,
    auth: authReducers,
    getUser: getUserReducer,
    profile: profileReducer,
    updatePorfile: userUpdateReducer,
    initSearch: initSearchReducer,
    roomsByFilter: getRoomsByFilterReducers,
    checkAvailable: checkBookAvailReducer,
    bookedDates: getBookedDateReducer,
    getBookings: getAllBookingsReducer,
    getBooking: getBookingReducer,
    getReviews: getReviewsReducer,
    checkReview: checkReviewReducer,
    addReducer: addReviewReducer,
    updateReview: updateReviewReducer,
    getHistory: getHistoryReducer,
    getAdminRooms: getAllRoomForAdminReducer,
    addRooms: addRoomsReducers,
    updateRooms: updateRoomReducers,
    deleteRooms: deleteRoomsReducers,
    getAdminBooking: getAdminBookingReducer,
    getAdminBook: getAdminBookReducers,
    deleteBooking: deleteBookingReducers,
    getAllUser: getAllUsersReducers,
    userAdminUpdate: adminUserUpdateReducer,
    userDelete: adminUserDeleteReducer,
    getAdminReviews: getAdminReviewsReducers,
    deleteReviews: deleteReviewsReducer
});

export default reducer;