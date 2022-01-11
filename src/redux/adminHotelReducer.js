
export default function adminHotelReducer(state = [], action) {
    switch (action.type){
        case "ADD_HOTEL":
            const {hotel} = action;
            console.log("hotel", hotel);
            return [...state, hotel];
        case 'FETCH_HOTELS':
            state = action.hotels;
            console.log([...state]);
            return [...state];
        case "DELETE_HOTEL":
            console.log("DELETE_HOTEL", action);
            return [
                ...state.filter(hotel => hotel.id !== action.id)
            ];
        default:
            return state;
    }
  }
  