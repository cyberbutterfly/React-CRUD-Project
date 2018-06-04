import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import {browserHistory} from 'react-router';
import UserForm from './UserForm';

class UserPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        fullName: this.props.user.fullName,
        email: this.props.user.email,
        password: '',
        role: this.props.user.role,
        _id: this.props.user._id
      },
      saving: false
    };
    this.saveUser = this.saveUser.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user._id != nextProps.user._id) {
      this.setState({user: Object.assign({}, nextProps.user)});
    }
    this.setState({saving: false});
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  saveUser(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.updateUser(this.state.user);
  }

  render() {
    return (
      <div>
        <h2>Edit User</h2>
        <UserForm
          user={this.state.user}
          onSave={this.saveUser}
          onChange={this.updateUserState}
          saving={this.state.saving}/>
      </div>
    );
  }
}


UserPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getUserById(users, id) {
  let user = users.find(user => user._id == id);
  return Object.assign({}, user);
}

function mapStateToProps(state, ownProps) {
  let user = {fullName: '', email: '', password: '', role: 'user'};
  const userId = ownProps.params.id;
  if (userId && state.users.length > 0) {
    user = getUserById(state.users, ownProps.params.id);
  }
  return {user: user};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
