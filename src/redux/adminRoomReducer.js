
export default function adminRoomReducer(state = [], action) {
    switch (action.type){
        case "ADD_ROOM":
            const {room} = action;
            console.log("room", room);
            return [...state, room];
        case 'FETCH_ROOMS':
            state = action.rooms;
            console.log([...state]);
            return [...state];
        case "UPDATE_ROOM":
            console.log("UPDATE_ROOM", action);
            return [
                ...state.map(room => room.id === action.new_room.room_id ? {...room, price: action.new_room.price} : room)
            ];
        default:
            return state;
    }
  }
  