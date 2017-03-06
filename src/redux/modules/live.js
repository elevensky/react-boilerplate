import { Record, List, Map } from 'immutable';
import moment from 'moment';

const FETCH_LIVE_BY_ID = 'kk/FETCH_LIVE_BY_ID';
const FETCH_LIVES = 'FETCH_LIVES';

const InitialState = Record({
  lives: List(),
  live: Map(),
});
const initialState = new InitialState;

const revive = ({ lives, live }) => initialState.merge({
  lives: List(lives),
  live: Map(live)
});

export default function liveReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);
  switch (action.type) {
    case FETCH_LIVES + '_SUCCESS': {
      const { employees, paging } = action.payload;
      return state.setIn(['staffs'], List(employees))
                  .update('paging', map => Map(map).merge(paging));
    }
    case FETCH_LIVE_BY_ID + '_SUCCESS': {
      const { employees, paging } = action.payload;
      return state.setIn(['staffs'], List(employees))
                  .update('paging', map => Map(map).merge(paging));
    }
    default:
      return state;
  }
}

export function getLives() {
  return {
    type: FETCH_LIVES,
    promise: (client) => client.get('/lives')
  };
}

export function getLive(id) {
  return {
    type: FETCH_LIVE_BY_ID,
    promise: (client) => client.get(`/lives/${id}`)
  };
}

export function getSearchLive(keyword) {
  return {
    type: FETCH_LIVE_BY_ID,
    promise: (client) => client.get(`/lives/${keyword}`)
  };
}
