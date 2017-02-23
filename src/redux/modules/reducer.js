import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import department from './department/index';
import employee from './employee/index';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  department,
  employee,
});
