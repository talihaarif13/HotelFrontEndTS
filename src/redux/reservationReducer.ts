interface setreservationInterface {
  type: String,
  cancel?: any; 
  reservations: {
    id : number
    starting_date : dateFns
    ending_date : dateFns
    customer_id : number
    createdAt : string
    updatedAt : string
    room_id : number
  }[]
}

interface reservationInterface{
  reservations: setreservationInterface['reservations']
}

const initialState: reservationInterface = { reservations: [] }

export default function reservationReducer(state = initialState, action: setreservationInterface) {
  switch (action.type){
      case "SET_RESERVATION":
          const {reservations} = action;
          return {...state, reservations: reservations};
      case "DELETE_RESERVATION":
        console.log("DELETE_RESERVATION", action);
        return {
          ...state, reservations:state.reservations.filter((item: { room_id: any; }) => item.room_id !== action.cancel)
        }
      default:
          return state;
  }
}
