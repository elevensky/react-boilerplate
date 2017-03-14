import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

app.use(session({
  secret: 'kaikai',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(bodyParser.json());
app.use('/templates/:id', (req, res) => {
  console.log(req.params.id);
  res.json({
    retval: 'ok',
    retinfo: {
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
    },
    reterr: '',
  });
});
app.use((req, res) => {
  console.log(req.url);
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
