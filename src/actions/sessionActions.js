import * as types from './actionTypes';
import sessionApi from '../api/SessionApi';

export function loginSuccess() {
  return { type: types.LOGIN_SUCCESS };
}

export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi.login(credentials)
      .then(response => {
        if (!response.message) {
          localStorage.setItem('user', JSON.stringify(response));
          dispatch(loginSuccess());
        }
        else {
          throw Error(response.message);
        }
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function signupSuccess() {
  return { type: types.SIGNUP_SUCCESS };
}

export function signupUser(signupInfo) {
  return function(dispatch) {
    return sessionApi.signup(signupInfo)
      .then(response => {
        dispatch(signupSuccess());
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function logoutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('reports');
  return { type: types.LOGOUT_SUCCESS };
}

export function setSession() {
  return {type: types.SET_SESSION};
}
