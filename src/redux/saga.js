import { useSelector } from 'react-redux';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axiosService from '../services/axiosServices';

function* fetchUser(action) {
  
   try {
        console.log("action", action);
        const user = yield call(axiosService.post, "user/login", "", action.payload );
        console.log("user api resp", user);
        yield put({type: "SET_USER", users: user.data});
   } catch (e) { 
      if(e.response.status === 400) {
        yield put({type: "ERROR", error: e.response.data.error}) 
      };
   }
}
function* bookReservation(action) {
  try {
      console.log("action", action);
      const reservation = yield call(axiosService.post, "reservation/", action.payload.token , action.payload );
      console.log("user api resp", reservation);
      yield put({type: "SET_RESERVATION", reservations: reservation.data});
      console.log("action", action);
      //again fetch room
      const response_rooms = yield call(axiosService.get, "room/", action.payload.token , {
        params: {
          hotel_id: action.payload.hotel_id
        }
      });
      yield put({type: "FETCH_ROOMS",  rooms: response_rooms.data});
  } catch (e) { 
     console.log("eroor", e.response.data);
  }
}
function* cancelReservation(action) {
  try {
       console.log("action", action);
       const cancel_reservation = yield call(axiosService.post, "reservation/deleteSpecific", action.payload.token , action.payload );
       console.log("cancel reservation api resp", cancel_reservation);
       yield put({type: "DELETE_RESERVATION",  cancel: action.payload.room_id});
  } catch (e) { 
     console.log("eroor", e.response.data);
  }
}
function* adminAddHotel(action) {
  try {
       console.log("action", action);
       yield put({type: "ADD_HOTEL",  hotel: action.payload.hotel});
  } catch (e) { 
     console.log("eroor", e);
  }
}
function* SetHotels(action) {
  try {
      
      console.log("action", action);
      yield put({type: "FETCH_HOTELS",  hotels: action.payload.hotels});
  } catch (e) { 
     console.log("eroor", e);
  }
}

function* adminDeleteHotel(action) {
  try {
      console.log("action", action);
      const delete_hotel = yield call(axiosService.post, "hotel/delete", action.payload.token , action.payload );
      console.log("delete hotel", delete_hotel);
      yield put({type: "DELETE_HOTEL",  id: action.payload.id});
  } catch (e) { 
     console.log("eroor", e);
  }
}
function* adminFetchRooms(action) {
  try {
      console.log("action", action);
      yield put({type: "FETCH_ROOMS",  rooms: action.payload.rooms});
  } catch (e) { 
     console.log("eroor", e);
  }
}
function* adminUpdateRoom(action) {
  try {
      console.log("action", action);
      const updated_room = yield call(axiosService.post, "room/update", action.payload.token , action.payload );
      console.log("updated room", updated_room);
      yield put({type: "UPDATE_ROOM",  new_room: action.payload});
  } catch (e) { 
     console.log("eroor", e);
  }
}
function* adminAddRoom(action) {
  try {
      console.log("action", action);
      const new_room = yield call(axiosService.post, "room/", action.payload.token , action.payload );
      console.log("new room", new_room);
      yield put({type: "ADD_ROOM",  room: new_room.data});
  } catch (e) { 
     console.log("eroor", e);
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("userLogin", fetchUser);
  yield takeEvery("bookReservation", bookReservation);
  yield takeEvery("cancelReservation", cancelReservation);
  yield takeEvery("fetchHotels", SetHotels);
  yield takeEvery("createHotel", adminAddHotel);
  yield takeEvery("deleteHotels", adminDeleteHotel);
  yield takeEvery("fetchRooms", adminFetchRooms);
  yield takeEvery("updateRoom", adminUpdateRoom);
  yield takeEvery("addRoom", adminAddRoom);
}

/*
//   Alternatively you may use takeLatest.

//   Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;