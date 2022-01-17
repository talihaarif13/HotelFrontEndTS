interface User {
    id : number
    name : string
    email : string
    password : string
    address : string
    phone : string
    createdAt : string
    updatedAt : string
    token : string
}

interface UserState {
    user? : User,
    error? : string | '',
    authenticated : boolean
}
const initialState : UserState = {
    user : {
        id : 0,
        name : '',
        email : '',
        password : '',
        address : '',
        phone : '',
        createdAt : '',
        updatedAt : '',
        token : ''
    },
    error: "",
    authenticated: false
}

type Action = {
    type: string; 
    error?: string; 
    users?: User; 
}

export default function reducer(state= initialState, action: Action): UserState {
    switch (action.type){
        case "SET_USER":
            const user = action.users;
            return { ...state, user , error: '', authenticated: true };
        case "ERROR":
            console.log("error", action);
            return { ...state, error: action.error, authenticated: false };
        default:
            return state;
    }
}