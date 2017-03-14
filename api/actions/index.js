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

// 获取lives
export function lives(req) {
  return Promise.resolve({
    retval: 'ok',
    retinfo: [
      {
        key: '1',
        url: 'https://dev.easyvaas.com/user/yangguozhi/prolive/show/play/index?vid=PRQ0EC2Grwn6Tp5B',
        id: '1202111',
        cover: 'http://wx1.sinaimg.cn/large/40a9031aly1fd8pk2nvk6j20gg088dgo.jpg',
        title: '我要去追赶夏天的萤火虫',
        times: '100万',
        start_time: '2017-2-28 18:36',
        status: '直播中'
      }
    ],
    reterr: '',
  });
}

// 获取history_lives
export function history_lives(req) {
  return Promise.resolve({
    retval: 'ok',
    retinfo: [
      {
        key: '1',
        url: 'https://dev.easyvaas.com/user/yangguozhi/prolive/show/play/index?vid=PRQ0EC2Grwn6Tp5B',
        id: '1202111',
        cover: 'http://wx1.sinaimg.cn/large/40a9031aly1fd8pk2nvk6j20gg088dgo.jpg',
        title: '我要去追赶夏天的萤火虫',
        times: '100万',
        end_time: '2017-2-28 18:36',
        status: '直播中'
      }
    ],
    reterr: '',
  });
}

// 获取history_lives
export function templates(req) {
  return Promise.resolve({
    retval: 'ok',
    retinfo: [
      {
        id: '1111',
        name: '基础模板',
        moduls: {
          base: {
            name: '信息编辑',
            items: {
              title: '标题',
              address: '地址'
            }
          },
          audience_interaction: {
            name: '信息编辑',
            items: {
              list: '聊天列表',
              red_envelopes: '红包',
              address: '地址'
            }
          },
          meun: {
            name: '菜单管理',
            items: {
              menu1: '简介',
              menu2: '互动',
              menu3: '榜单',
              custom: '自定义菜单'
            }
          },
          live: {
            name: '直播功能',
            items: {
              menu1: '观看限制',
            }
          }
        }
      }
    ],
    reterr: '',
  });
}
// 我的设备
export function devices(req) {
  return Promise.resolve({
    retval: 'ok',
    retinfo: [
      {
        id: '1202111',
        name: 'VR高清头',
        vurl: 'https://dev.easyvaas.com/user/yangguozhi/prolive/show/play/index?vid=PRQ0EC2Grwn6Tp5B',
        state: '1',
        time: '300',
        create_time: '2017-2-28 18:36',
      }
    ],
    reterr: '',
  });
}
