import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './containers/App/App';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import NotFound from './containers/NotFound/NotFound';
import Department from './containers/Department/';
import DepartmentTreeShow from './containers/Department/DepartmentTreeShow';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="departments">
        <IndexRoute component={Department}/>
      </Route>
      <Route path="departmentTreeShow" component={DepartmentTreeShow}/>
      <Route path="about" component={About}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
