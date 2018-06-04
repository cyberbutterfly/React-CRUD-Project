import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS: {
      browserHistory.push('/');
      return JSON.parse(localStorage.getItem('user'));
    }
    case types.SIGNUP_SUCCESS: {
      browserHistory.push('/login');
      return state;
    }
    case types.LOGOUT_SUCCESS: {
      browserHistory.push('/login');
      return {};
    }
    case types.SET_SESSION: {
      if (localStorage.getItem('user') == null) {
        return state;
      }
      const user = JSON.parse(localStorage.getItem('user'));
      return Object.assign({}, user);
    }
    default:
      return state;
  }
}
