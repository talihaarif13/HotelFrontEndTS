// interface sethotelInterface {
//     type: String,
//     id?: any; 
//     hotels: {
//       id : number
//       starting_date : dateFns
//       ending_date : dateFns
//       customer_id : number
//       createdAt : string
//       updatedAt : string
//       room_id : number
//     }[]
//   }
  
// interface hotelInterface{
//     hotels : []
// }
// const initialState: hotelInterface = { hotels: [] }

interface IState {
    Hotel: {
        id : number
        name : string
        address : string
        picture : string
        createdAt : string
        updatedAt : string
    }[];
}
// interface Hotel {
//     id : number
//     name : string
//     address : string
//     picture : string
//     createdAt : string
//     updatedAt : string
// }

interface HotelState {
    hotels : IState["Hotel"],
}
const initialState : HotelState = {
    hotels : [],
}

type Action = {
    type: string; 
    id: number;
    hotels?: any; 
}



export default function adminHotelReducer(state = initialState  , action : Action): HotelState {
    switch (action.type){
        case "ADD_HOTEL":
            const {hotels} = action;
            console.log("hotel", hotels);
            return {...state, hotels: [...state.hotels, hotels]};
        case 'FETCH_HOTELS':
            return {...state.hotels, hotels: action.hotels};
        case "DELETE_HOTEL":
            console.log("DELETE_HOTEL", action);
            return {
                ...state, hotels: state.hotels?.filter(hotel => hotel.id !== action.id)
            };
        default:
            return state;
    }
  }
  