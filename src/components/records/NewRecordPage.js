import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as courseActions from '../../actions/recordActions';
import RecordForm from './RecordForm';
import moment from 'moment';

class NewRecordPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      record: {
        date: moment(),
        distance: '',
        duration: ''
      },
      saving: false
    };
    this.saveRecord = this.saveRecord.bind(this);
    this.updateRecordState = this.updateRecordState.bind(this);
  }

  updateRecordState(event) {
    const field = event.target.name;
    const record = this.state.record;
    record[field] = event.target.value;
    return this.setState({record: record});
  }

  saveRecord(event) {
    event.preventDefault();
    this.props.actions.createRecord(this.state.record)
      .then((record) => {
        browserHistory.push('/records');
      });
  }

  render() {
    return (
      <div>
        <h2>New Record</h2>
        <RecordForm
          record={this.state.record}
          onSave={this.saveRecord}
          onChange={this.updateRecordState}
        />
      </div>
    );
  }
}

NewRecordPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewRecordPage);
