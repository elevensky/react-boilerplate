import config from '../../config';
const urlPrefix = {};

if (config.apiHost === '192.168.1.148') {
  // 后台人员 ip:192.168.1.148:9002
  urlPrefix.departmentUrlPrefix = '/api-employee/';
  urlPrefix.employeeUrlPrefix = '/api-employee/v1/';
} else if (config.apiHost === 'java-employee-api.nsb') {
  // 平台 ip:java-employee-api.nsb/ port:80
  urlPrefix.departmentUrlPrefix = '/';
  urlPrefix.employeeUrlPrefix = '/';
} else {
  // mock 数据 ip：localhost port：7030
  urlPrefix.departmentUrlPrefix = '/';
  urlPrefix.employeeUrlPrefix = '/';
}

export default urlPrefix;
