import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RecordList from './RecordList';
import NewRecordPage from './NewRecordPage';
import Pagination from 'react-js-pagination';
import moment from 'moment';

import * as recordActions from '../../actions/recordActions';

import './style.css';

class RecordsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: 1,
      filterRange: {
        from: moment().subtract(30, 'days').toDate(),
        to: moment().toDate()
      }
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadRecords();
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  handleFilterChange(event) {
    const field = event.target.name;
    const filterRange = this.state.filterRange;
    filterRange[field] = event.target.value;
    this.setState({filterRange: filterRange});
  }

  handleFilter(e) {
    e.preventDefault();
    this.props.actions.loadRecords();
  }

  deleteRecord(record) {
    this.props.actions.deleteRecord(record);
  }

  render() {
    const records = this.props.records;
    const { filterRange } = this.state;
    const filteredRecords = records.filter((record) =>
      moment(filterRange.from).startOf('day').diff(moment(record.date)) < 0 &&
      moment(filterRange.to).endOf('day').diff(moment(record.date)) >= 0
    );

    return (
      <div className="col-md-12 record-list">
        <div>
          <span>Records</span>
          <Link to={'/record/report'} className="btn btn-primary" style={{float: 'right', marginLeft: '5px'}}>Weekly Report</Link>
          <Link to={'/records/new'} className="btn btn-primary" style={{float: 'right'}}>Add Record</Link>
        </div>
        <div className="date-filter row">
          <div className="main-filter-area">
            <h4>Filter</h4>
            <form onSubmit={this.handleFilter}>
              <div className="col-md-6" style={{ paddingLeft: 0 }}>
                <div className="form-group">
                  <label>From</label>
                <input
                  name="from"
                  type="text"
                  className="form-control"
                  onChange={this.handleFilterChange}
                  required
                  value={moment(this.state.filterRange.from).format('MM/DD/YYYY')}
                />
                </div>
              </div>
              <div className="col-md-6" style={{ paddingRight: 0 }}>
                <div className="form-group">
                  <label>To</label>
                <input
                  name="to"
                  type="text"
                  className="form-control"
                  onChange={this.handleFilterChange}
                  required
                  value={moment(this.state.filterRange.to).format('MM/DD/YYYY')}
                />
                </div>
              </div>
            </form>
          </div>
        </div>
        <RecordList records={filteredRecords} deleteRecord={this.deleteRecord} />
        <div style={{ float: 'right' }}>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={records.length}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

RecordsPage.propTypes = {
  records: PropTypes.array.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    records: state.records
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recordActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage);
