import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import PrettyError from 'pretty-error';
import http from 'http';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(bodyParser.json());

// 请求部门树
app.get('/departments/tree', (req, res) => {
  res.json(actions.departments.departmentsTree(req));
});
// 新增部门
app.post('/departments', (req, res) => {
  res.json(actions.departments.postDepartment(req));
});
// 修改部门信息
app.put('/departments/:departmentId', (req, res) => {
  res.json(actions.departments.putDepartment(req));
});

// 请求部门的详细信息
app.get('/departments/:departmentId', (req, res) => {
  res.json(actions.departments.getDepartmentById(req));
});
app.delete('/departments/:departmentId', (req, res) => {
  res.json(actions.departments.delDepartment(req));
});
// 请求部门岗位树
app.get('/departments/:departmentId/positions/tree', (req, res) => {
  res.json(actions.departments.getPositionsTree(req));
});
// 请求岗位下的员工
app.get('/departments/:departmentId/positions/:positionId/employees', (req, res) => {
  res.json(actions.departments.getEmployessByPosition(req));
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);

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
