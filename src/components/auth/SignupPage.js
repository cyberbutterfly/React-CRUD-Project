import React, { PropTypes, Component } from 'react';
import TextInput from '../common/TextInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as sessionActions from '../../actions/sessionActions';
import './style.css';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signupInfo: {
        fullName: '',
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const signupInfo = this.state.signupInfo;
    signupInfo[field] = event.target.value;
    return this.setState({ signupInfo: signupInfo });
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.signupUser(this.state.signupInfo);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4 col-md-offset-4" style={{ paddingTop: '100px' }}>
          <h2 className="text-center logini-title">Create Your Account</h2>
          <div className="account-wall">
            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt=""/>
            <form className="form-signin">
              <TextInput
                name="fullName"
                label="Full Name"
                value={this.state.signupInfo.fullName}
                onChange={this.onChange}
              />
              <TextInput
                name="email"
                label="E-mail"
                value={this.state.signupInfo.email}
                onChange={this.onChange}
              />
              <TextInput
                name="password"
                label="Password"
                value={this.state.signupInfo.password}
                onChange={this.onChange}
                type="password"
              />
              <input
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={this.onSave}
                value="Signup"
              />
            </form>
          </div>
          <Link to="/login" className="text-center new-account">Go back to login</Link>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  actions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignupPage);
