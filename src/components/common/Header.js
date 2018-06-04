import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.actions.logoutUser();
  }

  render() {
    const logged_in = this.props.logged_in;
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <IndexLink className="navbar-brand" to="/" activeClassName="active">Home</IndexLink>
          </div>
          <ul className="nav navbar-nav">
            {(logged_in.role === 'admin' || logged_in.role === 'user') &&
              <li><Link to="/records" activeClassName="active">Records</Link></li>
            }
            {(logged_in.role === 'admin' || logged_in.role === 'manager') &&
                <li><Link to="/users" activeClassName="active">Users</Link></li>
            }
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login" onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Log out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  logged_in: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return { logged_in: state.session };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
