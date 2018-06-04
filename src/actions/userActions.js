import * as types from './actionTypes';
import userApi from '../api/UsersApi';

export function loadUsers() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return userApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadUsersSuccess(users) {
  return {type: types.LOAD_USERS_SUCCESS, users};
}

export function createUser(user) {
  return function(dispatch) {
    return userApi.createUser(user).then(user => {
      dispatch(createUserSuccess(user));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createUserSuccess(user) {
  return {type: types.CREATE_USER_SUCCESS, user};
}

export function updateUser(user) {
  return function (dispatch) {
    return userApi.updateUser(user).then(responseUser => {
      dispatch(updateUserSuccess(responseUser));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateUserSuccess(user) {
  return {type: types.UPDATE_USER_SUCCESS, user};
}

export function deleteUser(user) {
  return function(dispatch) {
    return userApi.deleteUser(user).then(() => {
      dispatch(deleteRecordSuccess(user));
      return;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteRecordSuccess(user) {
  return {type: types.DELETE_USER_SUCCESS, user};
}
