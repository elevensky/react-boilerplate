export default function loadAuth(req) {
  return Promise.resolve({
    retval: 'ok',
    retinfo: { user: req.session.user },
    reterr: '',
  });
}
