export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {promise, type, ...rest} = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      // const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: type});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          if (result && result.retval === 'ok') {
            next({...rest, result, type: type + '_SUCCESS'});
            return result;
          }
          next({...rest, result, type: type + '_FAIL'});
          return result;
        }
        // (result) => next({...rest, result, type: type + '_SUCCESS'}),
        // (error) => next({...rest, error, type: '_FAILURE'})
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: type + '_FAIL'});
      });

      return actionPromise;
    };
  };
}
