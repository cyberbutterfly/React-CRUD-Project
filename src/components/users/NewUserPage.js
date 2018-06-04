import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';
import moment from 'moment';

class NewUserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullName: '',
        email: '',
        password: '',
        role: 'user'
      },
      saving: false
    };
    this.saveUser = this.saveUser.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  saveUser(event) {
    event.preventDefault();
    this.props.actions.createUser(this.state.user)
      .then((user) => {
        browserHistory.push('/users');
      });
  }

  render() {
    return (
      <div>
        <h2>New User</h2>
        <UserForm
          user={this.state.user}
          onSave={this.saveUser}
          onChange={this.updateUserState}
        />
      </div>
    );
  }
}

NewUserPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewUserPage);
