import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './containers/App/App';
import NoLoginLayOut from './containers/App/NoLoginLayOut';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/NoLogin/Login';
import Register from './containers/NoLogin/Register';
import Forgot from './containers/NoLogin/Forgot';
import NotFound from './containers/NotFound/NotFound';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireNotLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        // oops, logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route component={App}>
      <Route component={NoLoginLayOut} onEnter={requireNotLogin}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="forgot" component={Forgot} />
      </Route>

      // auth route
      <Route path="/" component={Dashboard} onEnter={requireLogin} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
