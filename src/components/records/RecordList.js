import React, {PropTypes} from 'react';
import RecordListRow from './RecordListRow';

const RecordList = ({records, deleteRecord}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Date</th>
          <th>Distance</th>
          <th>Duration</th>
          <th>Average Speed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record =>
          <RecordListRow key={record._id} record={record} onDelete={deleteRecord} />
        )}
      </tbody>
    </table>
  );
};

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  deleteRecord: PropTypes.func
};

export default RecordList;
