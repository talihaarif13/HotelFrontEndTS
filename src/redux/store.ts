import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import reducer from "./reducers";
import reservationReducer from "./reservationReducer";
import adminHotelReducer from './adminHotelReducer';
import adminRoomReducer from './adminRoomReducer';
import mySaga from './saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  combineReducers({
    users: reducer,
    reservations: reservationReducer,
    hotels: adminHotelReducer,
    rooms: adminRoomReducer
  }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

// then run the saga
sagaMiddleware.run(mySaga)

// render the application


export default store;
//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof store.getState>;