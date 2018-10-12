import storage from 'redux-persist/lib/storage' ;
import { REHYDRATE } from 'redux-persist';


const initialState = {
    isLoggedIn : null,
        username: '',
        location: navigator.geolocation.getCurrentPosition((pos) => {
                        return pos.coords;
                        }),
        landmarks:{}   
    //currentURL : ''
}


export default function reducer( state=initialState, action) {

    switch(action.type) {
        case REHYDRATE : {
            if(!state.isLoggedIn)
            return { ...state, landmarks : {}}
            else return
            break;
        }
        case "LOGGED_IN": {                 
            return { ...state, isLoggedIn : true, username : action.payload}
            break;
        }
        case "SET_LANDMARKS_STATE": {                 
            return { ...state, landmarks : action.payload}
            break;
        }
        case "ERROR": {             
            return { ...state, isLoggedIn : false}
            break;
        }
        case "INITIALISE": {             
            return { ...state, isLoggedIn : false}
            break;
        }
        case "LOGGED_OUT": {    
            Object.keys(state).forEach(key => {
                storage.removeItem(`persist:${key}`);
            });
            state = initialState;         
            return state;
            break;
        }

        case "CHECK_VALID": {             
            console.log("in reducer Check_Valid", ...state, action.payload)
            return { ...state, errors : action.payload}
            break;
        }
        
        case "CLEAR_ERROR": {             
            return { ...state, errors : {}}
            break;
        }

        case "CLEAR_USERNAME_ERROR": {             
            return { 
                ...state, 
                errors : { 
                    ...state.errors,
                    username : action.payload.username, 
                    }
                }
            break;
        }

        case "CLEAR_PASSWORD_ERROR": {             
            return { ...state, errors : { ...state.errors, password : action.payload.password}}
            break;
        }
}

    return state;
}

// case "FETCH_USER_FULFILLED" : {        
//     return { 
//         ...state,
//         fetching : false,
//         fetched : true,
//         username: action.payload}
//         break;
//     }
//     case "SET_USER_NAME" : {
//         return {
//             ...state,
//             username: { ...state.username, username: action.payload},
//         }
//     }