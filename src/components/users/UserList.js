import React, {PropTypes} from 'react';
import UserListRow from './UserListRow';

const UserList = ({users, deleteUser}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <UserListRow key={user._id} user={user} onDelete={deleteUser} />
        )}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  deleteUser: PropTypes.func
};

export default UserList;
