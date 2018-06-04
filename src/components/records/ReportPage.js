import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination from 'react-js-pagination';

import * as reportActions from '../../actions/reportActions';

class ReportPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: 1
    };
  }

  componentWillMount() {
    this.props.actions.getReports();
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  renderReports(reports) {
    if (!reports.length) {
      return (
        <tr>
          <td colSpan="3">No Reports</td>
        </tr>
      );
    }
    return reports.map((report, index) => (
      <tr key={`report_${index}`}>
        <td>{report._id.year} - WK {report._id.week} </td>
        <td>{(report.totalDistance / report.count).toFixed(2)}km</td>
        <td>{report.totalDuration ? ((report.totalDistance / report.totalDuration) * 60).toFixed(2) : 0}km/h</td>
      </tr>
    ));
  }

  render() {
    const reports = this.props.reports;
    return (
      <div className="col-md-12 record-list">
        <div>
          <span>Weekly Report</span>
          <Link to={'/records'} className="btn btn-primary" style={{float: 'right', marginLeft: '5px'}}>Record List</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Avg Distance</th>
              <th>Avg Speed</th>
            </tr>
          </thead>
          <tbody>
            {this.renderReports(reports)}
          </tbody>
        </table>
        <div style={{ float: 'right' }}>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={reports.length}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

ReportPage.propTypes = {
  actions: PropTypes.object,
  reports: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    reports: state.reports
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(reportActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
