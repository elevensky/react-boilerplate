require('babel-polyfill');

const environment = {
  localhost: {
    isProduction: false,
    apiHost: 'localhost',
    apiPort: process.env.APIPORT,
    imageVerificationUrl: 'https://dev.easyvaas.com/user/yangguozhi/kkuser/captcha/index/90/30/5'
  },
  development: {
    isProduction: false,
    apiHost: 'dev.easyvaas.com/user/yangguozhi/kkuser',
    apiPort: process.env.APIPORT,
    host: '123.57.40.185',
    imageVerificationUrl: 'https://dev.easyvaas.com/user/yanghuan/kkuser/captcha/index/90/30/5'
  },
  production: {
    isProduction: true,
    apiHost: 'easyvaas.com/user/yanghuan/kkuser',
    apiPort: process.env.APIPORT,
    imageVerificationUrl: 'https://dev.easyvaas.com/user/yangguozhi/kkuser/captcha/index/90/30/5'
  }
}[process.env.NODE_ENV || 'localhost'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: 'kaikai living',
    description: '开开直播管理后台',
    head: {
      titleTemplate: '%s | 开开直播',
      meta: [
        {charset: 'utf-8'},
      ]
    }
  },

}, environment);
