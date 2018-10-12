import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' ;
import promise from 'redux-promise';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer.jsx';

//const middleware = applyMiddleware(promise,thunk, logger)


//export default createStore(reducer, undefined, autoRehydrate)
// export default createStore(reducer,middleware)

// const enhancers =  autoRehydrate;

const persistConfig = {
    key: 'root', // key is required
    storage, // storage is now required
}

const middlewares = [thunk, promise, logger];

const persistedReducer = persistReducer(persistConfig, reducer);


let store = createStore(persistedReducer,  compose(applyMiddleware(...middlewares)));

let persistor = persistStore(store);

export { store, persistor };
