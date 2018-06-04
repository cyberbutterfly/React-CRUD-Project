import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h2>Hi {this.props.session.fullName.split(" ")[0]}.</h2>
        <h3>Welcome To Jogging Tracking</h3>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    session: state.session
  };
}

HomePage.propTypes = {
  session: PropTypes.object
};

export default connect(mapStateToProps)(HomePage);
