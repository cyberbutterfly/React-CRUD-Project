import * as types from './actionTypes';
import recordApi from '../api/ReportsApi';

export function getReports() {
  return function(dispatch) {
    return recordApi.getReports().then((reports) => {
      dispatch(getReportsSuccess(reports));
      return;
    }).catch(error => {
      throw(error);
    });
  };
}

export function getReportsSuccess(reports) {
  return {type: types.GET_REPORTS_SUCCESS, reports};
}
