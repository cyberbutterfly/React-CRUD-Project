import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recordActions from '../../actions/recordActions';
import RecordForm from './RecordForm';
import {browserHistory} from 'react-router';
// import toastr from 'toastr';

class RecordPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      record: Object.assign({}, this.props.record),
      saving: false
    };
    this.saveRecord = this.saveRecord.bind(this);
    this.updateRecordState = this.updateRecordState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.record._id != nextProps.record._id) {
      this.setState({record: Object.assign({}, nextProps.record)});
    }
    this.setState({saving: false});
  }

  updateRecordState(event) {
    const field = event.target.name;
    const record = this.state.record;
    record[field] = event.target.value;
    return this.setState({record: record});
  }

  saveRecord(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.updateRecord(this.state.record);
  }

  render() {
    return (
      <div>
        <h2>Edit Record</h2>
        <RecordForm
          record={this.state.record}
          onSave={this.saveRecord}
          onChange={this.updateRecordState}
          saving={this.state.saving}/>
      </div>
    );
  }
}


RecordPage.propTypes = {
  record: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getRecordById(records, id) {
  let record = records.find(record => record._id == id);
  return Object.assign({}, record);
}

function mapStateToProps(state, ownProps) {
  let record = {date: '', distance: '', duration: ''};
  const recordId = ownProps.params.id;
  if (recordId && state.records.length) {
    record = getRecordById(state.records, ownProps.params.id);
  }
  return {record: record};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recordActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordPage);
