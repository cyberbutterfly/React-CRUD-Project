import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserList from './UserList';
import NewUserPage from './NewUserPage';
import Pagination from 'react-js-pagination';

import * as userActions from '../../actions/userActions';

import './style.css';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: 1
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers();
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  deleteUser(user) {
    this.props.actions.deleteUser(user);
  }

  render() {
    const users = this.props.users;
    return (
      <div className="col-md-12 record-list">
        <div>
          <span>Users</span>
          <Link to={'/users/new'} className="btn btn-primary" style={{float: 'right'}}>Add User</Link>
        </div>
        <UserList users={users} deleteUser={this.deleteUser} />
        <div style={{ float: 'right' }}>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={users.length}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
