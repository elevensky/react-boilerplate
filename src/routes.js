import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
import App from './containers/App/App';
import NoLoginLayOut from './containers/App/NoLoginLayOut';
import Dashboard from './containers/Dashboard/Dashboard';
import Lives from './containers/Lives/';
import Live from './containers/Live/';
import Control from './containers/Live/Control';
import Statistics from './containers/Live/Statistics';
import Follow from './containers/Live/Follow';
import Limit from './containers/Live/Limit';
import Mode from './containers/Live/Mode';
import Interactive from './containers/Live/Interactive';
import Announcement from './containers/Live/Announcement';
import Templates from './containers/Template/Templates';
import Components from './containers/Template/Components';
import Devices from './containers/Device';
import Center from './containers/User/Center';
import Safe from './containers/User/Safe';
import Login from './containers/NoLogin/Login';
import Register from './containers/NoLogin/Register';
import Forgot from './containers/NoLogin/Forgot';
import NotFound from './containers/NotFound/NotFound';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { selectedTemplate } from 'redux/modules/template';

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
  const requireTemplateId = (nextState, replace, cb) => {
    if (!selectedTemplate(store.getState())) {
      replace('/select_template');
    }
    cb();
  };
  const menu = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./containers/Live/Menu'));
    }, 'menu');
  };

  return (
    <Route component={App}>
      {/* <Route component={NoLoginLayOut} onEnter={requireNotLogin}> */}
      <Route component={NoLoginLayOut} onEnter={requireNotLogin}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="forgot" component={Forgot} />
      </Route>

      {/* <Route path="/" component={Dashboard} onEnter={requireLogin}> */}
      <Route path="/" component={Dashboard} onEnter={requireLogin}>
        <IndexRoute component={Lives}/>
        <Route path="/templates" component={Templates} />
        <Route path="/templates/components" component={Components} />
        <Route path="/select_template" component={Templates} />
        <Route path="/devices" component={Devices} />
        <Route path="/lives">
          <IndexRoute component={Lives} />
          <Route path="new" component={Live} onEnter={requireTemplateId} />
          <Route path=":id">
            <IndexRoute component={Live} />
            <Route path="control" component={Control} />
            <Route path="statistics" component={Statistics} />
            <Route path="interactive" component={Interactive} />
            <Route path="mode" component={Mode} />
            <Route path="follow" component={Follow} />
            <Route path="limit" component={Limit} />
            <Route path="announcement" component={Announcement} />
            <Route path=":type" getComponent={menu} />
          </Route>
        </Route>
        <Route path="/user">
          <IndexRoute component={Center}/>
          <Route path="safe" component={Safe} />
        </Route>
      </Route>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
