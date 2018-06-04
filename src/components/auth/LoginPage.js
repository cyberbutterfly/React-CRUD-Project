import React, { PropTypes, Component } from 'react';
import TextInput from '../common/TextInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as sessionActions from '../../actions/sessionActions';
import './style.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.credentials);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4 col-md-offset-4" style={{ paddingTop: '100px' }}>
          <h2 className="text-center logini-title">Sign in to Your Account</h2>
          <div className="account-wall">
            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt=""/>
            <form className="form-signin">
              <TextInput
                name="email"
                label="E-mail"
                value={this.state.credentials.email}
                onChange={this.onChange}
              />
              <TextInput
                name="password"
                label="Password"
                value={this.state.credentials.password}
                onChange={this.onChange}
                type="password"
                required
              />
              <input
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={this.onSave}
                value="Login"
              />
            </form>
          </div>
          <Link to="/signup" className="text-center new-account">Create an Account</Link>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
