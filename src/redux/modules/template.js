import { Record, List, Map } from 'immutable';
import moment from 'moment';

const FETCH_TEMPLATES = 'FETCH_TEMPLATES';
const FETCH_TEMPLATE_BY_ID = 'kk/FETCH_TEMPLATE_BY_ID';
const SELECT_TEMPLATE_BY_ID = 'SELECT_TEMPLATE_BY_ID';

const InitialState = Record({
  templates: List(),
  template: Map(),
  selectId: '',
});
const initialState = new InitialState;

const revive = ({ lives, live }) => initialState.merge({
  templates: List(lives),
  template: Map(live),
  selectId: '',
});

export default function templateReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);
  switch (action.type) {
    case SELECT_TEMPLATE_BY_ID: {
      return state.setIn(['selectId'], action.payload.id);
    }
    case FETCH_TEMPLATES + '_SUCCESS': {
      const templates = action.result.retinfo;
      return state.setIn(['templates'], List(templates));
    }
    case FETCH_TEMPLATE_BY_ID + '_SUCCESS': {
      const template = action.result.retinfo;
      return state.setIn(['template'], Map(template));
    }
    default:
      return state;
  }
}

export function getTemplates() {
  return {
    type: FETCH_TEMPLATES,
    promise: (client) => client.get('/templates')
  };
}

export function getTemplate(id) {
  return {
    type: FETCH_TEMPLATE_BY_ID,
    promise: (client) => client.get(`/templates/${id}`)
  };
}

export function selectTemplate(id) {
  return {
    type: SELECT_TEMPLATE_BY_ID,
    payload: {id}
  };
}

export function selectedTemplate(globalState) {
  return globalState.template && globalState.template.get('selectId');
}
