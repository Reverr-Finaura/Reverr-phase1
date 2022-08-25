import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import UserReducer from './reducer';
import MentorReducer from './MentorReducer';

const rootReducer = combineReducers({
  UserReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
