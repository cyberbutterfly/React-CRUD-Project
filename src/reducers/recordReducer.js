import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function recordReducer(state = initialState.records, action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.LOAD_RECORDS_SUCCESS:
     return Object.assign([], state, action.records);
    case types.CREATE_RECORD_SUCCESS: {
      browserHistory.push(`/records`);
      return [
        ...state.filter(record => record._id !== action.record._id),
        Object.assign({}, action.record)
      ];
    }
    case types.UPDATE_RECORD_SUCCESS: {
      browserHistory.push(`/records`);
      return [
        ...state.filter(record => record._id !== action.record._id),
        Object.assign({}, action.record)
      ];
    }
    case types.DELETE_RECORD_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfRecordToDelete = state.findIndex(record => {return record._id == action.record._id;});
      newState.splice(indexOfRecordToDelete, 1);
      browserHistory.push('/records');
      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}
