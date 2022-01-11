export default function reservationReducer(state = [], action) {
  switch (action.type){
      case "SET_RESERVATION":
          const {reservations} = action;
          return [...state, reservations];
        case "DELETE_RESERVATION":
          console.log("DELETE_RESERVATION", action);
          return [
            ...state, state.reservations?.filter((item, index) => item.room_id !== action.cancel)
          ]
      default:
          return state;
  }
}
