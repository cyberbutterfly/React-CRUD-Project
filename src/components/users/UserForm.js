import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import DatePicker from 'react-datepicker';
import {Link, browserHistory} from 'react-router';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './style.css';


class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSave}>
          <TextInput
            name="fullName"
            className="form-control"
            label="Full Name"
            value={this.props.user.fullName}
            onChange={this.props.onChange}/>

          <TextInput
            name="email"
            label="E-mail"
            type="text"
            value={this.props.user.email}
            onChange={this.props.onChange}/>

          <TextInput
            name="password"
            label="Password"
            type="password"
            onChange={this.props.onChange}/>

          <div className="form-group">
            <label>Role</label>
            <select className="form-control" onChange={this.props.onChange} value={this.props.user.role} name="role">
              <option value="admin">admin</option>
              <option value="manager">manager</option>
              <option value="user">user</option>
            </select>
          </div>

          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
          />
          &nbsp;&nbsp;&nbsp;
          <Link to="/users">Cancel</Link>
        </form>
      </div>
  );
  }
}

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default UserForm;
