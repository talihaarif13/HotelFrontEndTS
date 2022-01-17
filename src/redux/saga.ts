import { useSelector } from 'react-redux';
import { call, put, StrictEffect, takeEvery, takeLatest } from 'redux-saga/effects'
import axiosService from '../services/axiosServices';

const fetchUserApi = async (data:any) => {
  try {
    const user = await axiosService.post(
      "user/login",
      "",
      data.payload
    );
    return user;
  } catch (error:any) {
    console.log(error.response.data.error);
    throw new Error(error.response.data.error);
  }
};

function* fetchUser(action: any ):any {  
   try {
        const user = yield call(fetchUserApi,action);
        console.log("user api resp", user);
        yield put({type: "SET_USER", users: user.data});
        
   } catch (error:any) { 
     console.log('err', error);
      yield put({type: "ERROR",  error}) 
      // if(e.response.status === 400) {
      //   yield put({type: "ERROR", error: e.response.data.error}) 
      // };
   }
}

const bookReservationAPi = async (data:any) => {
  try {
    const user = await axiosService.post(
      "reservation/",
      data.payload.token,
      data.payload
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

function* bookReservation(action:any):any {
  try {
      console.log("action", action);
      const reservation = yield call(bookReservationAPi, action );
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
  } catch (e:any) { 
     console.log("eroor", e.response.data);
  }
}


const cancelReservationApi = async (data:any) => {
  try {
    const user = await axiosService.post(
      "reservation/deleteSpecific",
      data.payload.token,
      data.payload
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

function* cancelReservation(action: any ):any {
  try {
       console.log("action", action);
       const cancel_reservation = yield call(cancelReservationApi , action);
       console.log("cancel reservation api resp", cancel_reservation);
       yield put({type: "DELETE_RESERVATION",  cancel: action.payload.room_id});
  } catch (e:any) { 
     console.log("eroor", e.response.data);
  }
}


function* adminAddHotel(action: any) {
  try {
       console.log("action", action);
       yield put({type: "ADD_HOTEL",  hotel: action.payload.hotel});
  } catch (e) { 
     console.log("eroor", e);
  }
}

function* SetHotels(action: any) {
  try {
      
      console.log("action", action);
      yield put({type: "FETCH_HOTELS",  hotels: action.payload.hotels});
  } catch (e) { 
     console.log("eroor", e);
  }
}

const adminDeleteHotelApi = async (data:any) => {
  try {
    const user = await axiosService.post(
      "hotel/delete",
      data.payload.token,
      data.payload
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

function* adminDeleteHotel(action: any ):any {
  try {
      console.log("action", action);
      const delete_hotel = yield call(adminDeleteHotelApi, action );
      console.log("delete hotel", delete_hotel);
      yield put({type: "DELETE_HOTEL",  id: action.payload.id});
  } catch (e) { 
     console.log("eroor", e);
  }
}

function* adminFetchRooms(action: any ) {
  try {
      console.log("action", action);
      yield put({type: "FETCH_ROOMS",  rooms: action.payload.rooms});
  } catch (e) { 
     console.log("eroor", e);
  }
}

const adminUpdateRoomApi = async (data:any) => {
  try {
    const user = await axiosService.post(
      "room/update",
      data.payload.token,
      data.payload
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

function* adminUpdateRoom(action: any ): any {
  try {
      console.log("action", action);
      const updated_room = yield call(adminUpdateRoomApi, action );
      console.log("updated room", updated_room);
      yield put({type: "UPDATE_ROOM",  new_room: action.payload});
  } catch (e) { 
     console.log("eroor", e);
  }
}

const adminAddRoomApi = async (data:any) => {
  try {
    const user = await axiosService.post(
      "room/",
      data.payload.token,
      data.payload
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

function* adminAddRoom(action: any): any {
  try {
      console.log("action", action);
      const new_room = yield call(adminAddRoomApi , action );
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

