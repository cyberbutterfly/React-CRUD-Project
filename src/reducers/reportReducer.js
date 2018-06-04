import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function recordReducer(state = initialState.reports, action) {
  switch(action.type) {
    case types.GET_REPORTS_SUCCESS:
      return Object.assign([], state, action.reports);
    case types.LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}
