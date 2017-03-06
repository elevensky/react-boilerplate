import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import live from './live';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  live,
});
