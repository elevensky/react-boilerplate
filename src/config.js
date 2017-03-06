require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
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
