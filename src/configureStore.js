// import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
// import { default as createHistory } from 'history/lib/createBrowserHistory';
// import routes from './routes';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import  logger  from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
// import reducer from './reducer.jsx'

// const createStoreWithMiddleware = compose(
//   applyMiddleware(
//     promiseMiddleware,
//     // thunkMiddleware,
//     // apiMiddleware,
//     loggerMiddleware
//   )
//   //, devTools()
// )(createStore);

const middleware = applyMiddleware(logger)

export default function configureStore(initialState) {
  const store = createStore(reducers, middleware);

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('./reducer.jsx', () => {
//       const nextRootReducer = require('./reducer.jsx');
//       store.replaceReducer(nextRootReducer);
//     });
//   }

  return store;
}

const userReducer = (state={}, action) => {
    switch(action.type) {
        case "CHANGE_USERNAME": {
            state.username = action.payload
            break;
        }
    }

    return state;
}

const initialState = {
    fetching: false,
    fetched: false,
    users:[],
    error: null
}

const passwordReducer = (state={}, action) => {
    switch(action.type) {
        case "FETCH_USERS_PENDING": {                 //"FETCH_USERS_START" promise names ==> "FETCH_USERS_PENDING"
            return { ...state, fetching : true}
            break;
        }
        case "FETCH_USERS_REJECTED": {              //"FETCH_USERS_ERROR" promise names ==> "FETCH_USERS_REJECTED"
            return { ...state, fetching : false, error : action.payload}
            break;
        }
        case "FETCH_USERS_FULFILLED" : {        //"RECEIVE_USERS" promise names => "FETCH_USERS_FULFILLED"
            return { 
            ...state,
            fetching : false,
            fetched : true,
            users: action.payload}
            break;
        }
    }
    return state;
}

const errorsReducer = (state=[], action) => {
    return state;
}

const isValidReducer = (state={}, action) => {
    return state;
}


const reducers = combineReducers({
    username: userReducer,
    password: passwordReducer,
    errors: errorsReducer,
    isValid : isValidReducer,
})


store.dispatch({
    type : "FETCH_USERS_START",
    payload : axios.get("http://rest.learncode.academy/api/wstern/users")
})

// store.dispatch( dispatch => {
//     dispatch({type : "FETCH_USERS_START"})
//     axios.get("http://rest.learncode.academy/api/wstern/users").then( response => {
//         dispatch({ type: "RECEIVE_USERS", payload: response.data})
//     })
//     .catch( err =>{
//         dispatch({ type: "FETCH_USERS_ERROR", payload: err})
//     })

// })