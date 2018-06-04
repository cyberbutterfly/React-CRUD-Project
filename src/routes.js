import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import RecordsPage from './components/records/RecordsPage';
import RecordPage from './components/records/RecordPage';
import NewRecordPage from './components/records/NewRecordPage';
import ReportPage from './components/records/ReportPage';
import UsersPage from './components/users/UsersPage';
import NewUserPage from './components/users/NewUserPage';
import UserPage from './components/users/UserPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

export default (

  <Route path="/" component={App}>
    <IndexRoute component={HomePage} onEnter={requireAuth} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/signup" component={SignupPage} />

      <Route exact path="/records" component={RecordsPage} onEnter={requireAuth} />


      <Route exact path="/records/new" component={NewRecordPage} onEnter={requireAuth} />


      <Route exact path="/records/:id" component={RecordPage} onEnter={requireAuth} />


      <Route exact path="/record/report" component={ReportPage} onEnter={requireAuth} />


      <Route exact path="/users" component={UsersPage} onEnter={requireAuth} />


      <Route exact path="/users/new" component={NewUserPage} onEnter={requireAuth} />


      <Route exact path="/users/:id" component={UserPage} onEnter={requireAuth} />
    
  </Route>
);

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('user')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
