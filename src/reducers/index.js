import {combineReducers} from 'redux';
import records from './recordReducer';
import session from './sessionReducer';
import users from './userReducer';
import reports from './reportReducer';

const rootReducer = combineReducers({
  // short hand property names
  records,
  session,
  users,
  reports
});

export default rootReducer;
