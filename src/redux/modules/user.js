const FETCH_USER = 'FETCH_USER';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
    case FETCH_USER + '_SUCCESS': {
      const user = action.result.retinfo;
      return {
        ...state,
        ...user
      };
    }

    default:
      return state;
  }
}
