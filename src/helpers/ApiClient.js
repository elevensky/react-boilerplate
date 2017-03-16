import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, local) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const apiPort = config.apiPort ? ':' + config.apiPort : '';
  if (local) {
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
  }
  // Prepend host and port of the API server to the path.
  return 'http://' + config.apiHost + apiPort + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, payload, type) => new Promise((resolve, reject) => {
        const local = typeof payload === 'string' || typeof type === 'string' ? true : false;
        const request = superagent[method](formatUrl(path, local));

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (typeof payload === 'object') {
          const { params, data } = payload;
          if (params) {
            request.query(params);
          }
          if (data) {
            request.send(data);
          }
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
