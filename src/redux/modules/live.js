import { Record, List, Map } from 'immutable';
import moment from 'moment';

const FETCH_LIVE_BY_ID = 'FETCH_LIVE_BY_ID';
const FETCH_LIVES = 'FETCH_LIVES';
const FETCH_HISTORY_LIVES = 'FETCH_HISTORY_LIVES';

const InitialState = Record({
  lives: List(),
  live: Map(),
  historyLives: List(),
});
const initialState = new InitialState;

const revive = ({ lives, live }) => initialState.merge({
  lives: List(lives),
  historyLives: List(lives),
  live: Map(live),
});

export default function liveReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);
  switch (action.type) {
    case FETCH_LIVES + '_SUCCESS': {
      const lives = action.result.retinfo;
      return state.setIn(['lives'], List(lives));
    }
    case FETCH_LIVE_BY_ID + '_SUCCESS': {
      const live = action.result.retinfo;
      return state.setIn(['live'], Map(live));
    }
    case FETCH_HISTORY_LIVES + '_SUCCESS': {
      const lives = action.result.retinfo;
      return state.setIn(['historyLives'], List(lives));
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

export function getHistoryLives() {
  return {
    type: FETCH_HISTORY_LIVES,
    promise: (client) => client.get(`/history_lives`)
  };
}

export function getSearchLive(keyword) {
  return {
    type: FETCH_LIVE_BY_ID,
    promise: (client) => client.get(`/lives/${keyword}`)
  };
}
