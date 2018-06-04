import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import DatePicker from 'react-datepicker';
import {Link, browserHistory} from 'react-router';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './style.css';


class RecordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSave}>
          <TextInput
            name="date"
            className="form-control"
            label="Date"
            selected={moment(this.props.record.date)}
            onChange={this.props.onChange}/>

          <TextInput
            name="distance"
            label="Distance(km)"
            type="number"
            value={this.props.record.distance || 0}
            onChange={this.props.onChange}/>

          <TextInput
            name="duration"
            label="Duration(mins)"
            type="number"
            value={this.props.record.duration || 0}
            onChange={this.props.onChange}/>

          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
          />
          &nbsp;&nbsp;&nbsp;
          <Link to="/records">Cancel</Link>
        </form>
      </div>
  );
  }
}

RecordForm.propTypes = {
  record: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default RecordForm;
