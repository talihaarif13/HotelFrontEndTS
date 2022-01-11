export default function reducer(state = {}, action) {
    switch (action.type){
        case "SET_USER":
            const {users} = action;
            return { ...state, user: users, error: '', authenticated: true };
        case "ERROR":
            console.log("error", action);
            return { ...state, error: action.error, authenticated: false };
        default:
            return state;
    }
}