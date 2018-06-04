import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import RecordPage from './RecordPage';
import moment from 'moment';

const RecordListRow = ({record, onDelete}) => {
  const editRoute = `/records/${record._id}`;
  return (
    <tr>
      <td>{record.user.fullName}</td>
      <td>{moment(record.date).format('MM/DD/YYYY')}</td>
      <td>{record.distance}</td>
      <td>{record.duration}</td>
      <td>{record.distance ? ((record.distance / record.duration) * 60).toFixed(2) : record.duration}km/h</td>
      <td>
        <Link to={editRoute} className="btn btn-success btn-sm">Edit</Link>
        &nbsp;&nbsp;
        <button className="btn btn-danger btn-sm" onClick={() => {onDelete(record);}}>Delete</button>
      </td>
    </tr>
  );
};

RecordListRow.propTypes = {
  record: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default RecordListRow;
