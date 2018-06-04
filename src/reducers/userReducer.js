import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function userReducer(state = initialState.users, action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.LOAD_USERS_SUCCESS:
      return Object.assign([], state, action.users);
    case types.CREATE_USER_SUCCESS:
      return [
        ...state.filter(user => user._id !== action.user._id),
        Object.assign({}, action.user)
      ];
    case types.UPDATE_USER_SUCCESS:
      browserHistory.push(`/users`);
      return [
        ...state.filter(user => user._id !== action.user._id),
        Object.assign({}, action.user)
      ];
    case types.DELETE_USER_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfUserToDelete = state.findIndex(user => {return user._id == action.user._id;});
      newState.splice(indexOfUserToDelete, 1);
      browserHistory.push('/users');
      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}
