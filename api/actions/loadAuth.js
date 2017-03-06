export default function loadAuth(req) {
  return Promise.resolve({
    retval: 'ok',
    retinfo: req.session.user ? req.session.user : null,
    reterr: '',
  });
}
