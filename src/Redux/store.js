import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import UserReducer from './reducer';
import AppReducer from './appSlice'

const rootReducer = combineReducers({
  UserReducer,
  AppReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));


// import {configureStore,createImmutableStateInvariantMiddleware,
// } from '@reduxjs/toolkit';
// import AppReducer from './appSlice'

// const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
//   ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
// })
// export const store = configureStore({
//   reducer: {
//    app:AppReducer
//   },
//   middleware: [immutableInvariantMiddleware],
// });
