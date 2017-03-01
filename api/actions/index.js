export loadInfo from './loadInfo';
export loadAuth from './loadAuth';
export login from './login';
export logout from './logout';
export * as widget from './widget/index';
export * as departments from './departments/index';

// 验证手机号错误接口
export function check_phone(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve({
    retval: 'ok',
    retinfo: {},
    reterr: '',
  });
}

// 获取手机验证码
export function phone_verify_code(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve({
    retval: 'ok',
    retinfo: null,
    reterr: '',
  });
}
