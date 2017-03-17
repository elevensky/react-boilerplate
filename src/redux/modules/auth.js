const LOAD = 'kk/auth/LOAD';
const LOGIN = 'kk/auth/LOGIN';
const LOGOUT = 'kk/auth/LOGOUT';
const CHECKPHONE = 'kk/auth/CHECKPHONE';
const FETCH_PHONE_VERIFY_CODE = 'kk/auth/FETCH_PHONE_VERIFY_CODE';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD + '_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.retinfo
      };
    case LOAD + '_FAIL':
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.result.reterr
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN + '_SUCCESS':
      return {
        ...state,
        loggingIn: false,
        user: action.result.retinfo
      };
    case LOGIN + '_FAIL':
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.result.reterr
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT + '_SUCCESS':
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT + '_FAIL':
      return {
        ...state,
        loggingOut: false,
        logoutError: action.result.reterr
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    type: LOAD,
    promise: (client) => client.get('/login', 'local')
  };
}

export function login(data) {
  return {
    type: LOGIN,
    promise: (client) => client.post('/login', { data }, 'local')
  };
}

export function logout() {
  return {
    type: LOGOUT,
    promise: (client) => client.get('/logout', 'local')
  };
}

export function checkPhone(phone) {
  return {
    type: CHECKPHONE,
    promise: (client) => client.post('/check_phone', { data: { phone }}, 'local')
  };
}

export function fetchPhoneVerifyCode(data) {
  return {
    type: FETCH_PHONE_VERIFY_CODE,
    promise: (client) => client.post('/phone_verify_code', { data }, 'local')
  };
}
