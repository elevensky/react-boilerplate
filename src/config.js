require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const APIHOST = 'localhost';
const APIPORT = '9002';

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: APIHOST,
  apiPort: APIPORT,
  app: {
    title: 'React',
    description: 'react boilerplate',
    head: {
      titleTemplate: 'React | %s',
      meta: [
        {charset: 'utf-8'},
      ]
    }
  },

}, environment);
