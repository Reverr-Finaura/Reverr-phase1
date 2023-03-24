import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import UserReducer from './reducer';
import AppReducer from './appSlice'

const rootReducer = combineReducers({
  UserReducer,
  AppReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
