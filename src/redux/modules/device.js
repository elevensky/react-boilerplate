import { Record, List, Map } from 'immutable';
import moment from 'moment';

const FETCH_DEVICES = 'FETCH_DEVICES';
const FETCH_DEVICE_BY_ID = 'kk/FETCH_DEVICE_BY_ID';

const InitialState = Record({
  devices: List(),
  device: Map(),
});
const initialState = new InitialState;

const revive = ({ devices, device }) => initialState.merge({
  devices: List(devices),
  device: Map(device)
});

export default function templateReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);
  switch (action.type) {
    case FETCH_DEVICES + '_SUCCESS': {
      const devices = action.result.retinfo;
      return state.setIn(['devices'], List(devices));
    }
    case FETCH_DEVICE_BY_ID + '_SUCCESS': {
      const device = action.result.retinfo;
      return state.setIn(['device'], Map(device));
    }
    default:
      return state;
  }
}

export function getDevices() {
  return {
    type: FETCH_DEVICES,
    promise: (client) => client.get('/devices')
  };
}

export function getDevice(id) {
  return {
    type: FETCH_DEVICE_BY_ID,
    promise: (client) => client.get(`/devices/${id}`)
  };
}
