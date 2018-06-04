import * as types from './actionTypes';
import recordApi from '../api/RecordsApi';

export function loadRecordsSuccess(records) {
  return {type: types.LOAD_RECORDS_SUCCESS, records};
}

export function updateRecordSuccess(record) {
  return {type: types.UPDATE_RECORD_SUCCESS, record};
}

export function createRecordSuccess(record) {
  return {type: types.CREATE_RECORD_SUCCESS, record};
}

export function deleteRecordSuccess(record) {
  return {type: types.DELETE_RECORD_SUCCESS, record};
}

export function loadRecords() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return recordApi.getAllRecords().then(records => {
      dispatch(loadRecordsSuccess(records));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateRecord(record) {
  return function (dispatch) {
    return recordApi.updateRecord(record).then(responseRecord => {
      dispatch(updateRecordSuccess(responseRecord));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createRecord(record) {
  return function (dispatch) {
    return recordApi.createRecord(record).then(responseRecord => {
      dispatch(createRecordSuccess(responseRecord));
      return responseRecord;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteRecord(record) {
  return function(dispatch) {
    return recordApi.deleteRecord(record).then(() => {
      dispatch(deleteRecordSuccess(record));
      return;
    }).catch(error => {
      throw(error);
    });
  };
}
