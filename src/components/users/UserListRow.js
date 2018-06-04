import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import UserPage from './UserPage';
import moment from 'moment';

const UserListRow = ({user, onDelete}) => {
  const editRoute = `/users/${user._id}`;
  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <Link to={editRoute} className="btn btn-success btn-sm">Edit</Link>
        &nbsp;&nbsp;
        <button className="btn btn-danger btn-sm" onClick={() => {onDelete(user);}}>Delete</button>
      </td>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default UserListRow;
