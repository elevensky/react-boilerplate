import {
  Map,
  List
} from 'immutable';
import requestStatus from '../../requestStatus';

import {employeeUrlPrefix} from '../urlPrefix';

const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_TRY_DATE_TYPE = 'employee/GET_TRY_DATE_TYPE';
const POST_NEW_EMPLOYEE = 'employee/POST_NEW_EMPLOYEE';
const GET_EMPLOYEE_ALL_PAGE = 'employee/GET_EMPLOYEE_ALL_PAGE';
const GET_EMPLOYEE_INFO = 'employee/GET_EMPLOYEE_INFO';
const GET_EMPLOYEE_RECORD_INFO = 'employee/GET_EMPLOYEE_RECORD_INFO';
const GET_EMPLOYEE_RESUMES = 'employee/GET_EMPLOYEE_RESUMES';
const GET_EMPLOYEE_EDUCATIONS = 'employee/GET_EMPLOYEE_EDUCATIONS';
const GET_EMPLOYEE_SOCIALRELATIONS = 'employee/GET_EMPLOYEE_SOCIALRELATIONS';
const GET_EMPLOYEE_IDENTITIES = 'employee/GET_EMPLOYEE_IDENTITIES';
const GET_EMPLOYEE_BANKACCOUNTS = 'employee/GET_EMPLOYEE_BANKACCOUNTS';
const GET_EMPLOYEE_CERTIFICATIONS = 'employee/GET_EMPLOYEE_CERTIFICATIONS';
const GET_EMPLOYEE_TRAININGSTUDY = 'employee/GET_EMPLOYEE_TRAININGSTUDY';
const GET_EMPLOYEE_PROBATION_INFO = 'employee/GRT_EMPLOYEE_PROBATION_INFO';
const GET_EMPLOYEE_REGULAR_TYPE = 'employee/GET_EMPLOYEE_REGULAR_TYPE';
const PUT_EMPLOYEE_PROBATION_INFO = 'employee/PUT_EMPLOYEE_PROBATION_INFO';

const initialState = Map({
  // 搜索的数据状态
  searchListDataStatus: requestStatus.LOAD_INIT,
  searchListDataSum: 0,
  searchListData: List(),
  // 页面列表展示
  listData: Map({
    status: requestStatus.LOAD_INIT,
    sum: 0,
    no: 0,
    data: [] // 目前只保留一页数据，每次都重新请求
  }),
  // 员工基本信息
  userInfo: Map({
    status: requestStatus.LOAD_INIT,
    data: {}
  }),
  // 任职信息
  recordInfo: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 履历记录
  resumes: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 学历记录
  educations: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 社会关系
  socialrelations: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 证件信息
  identities: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 银行账户
  bankaccounts: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 资格认证
  certifications: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 培训学习
  trainingStudy: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  // 转正
  getProbationInfo: Map({
    status: requestStatus.LOAD_INIT,
    data: {}
  }),
  // 转正类型
  getRegularType: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
  putProbationInfo: Map({
    status: requestStatus.LOAD_INIT,
    data: []
  }),
});

export default function reducer(state = initialState, action = {}) {
  if (!Map.isMap(state)) {
    return initialState;
  }
  switch (action.type) {
    case GET_EMPLOYEE_ALL_PAGE:
      return state.setIn(['listData', 'status'], () => requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_ALL_PAGE + '_SUCCESS':
      if (action.result.status !== 200 || !(action.result.items instanceof Array)) {
        return state.setIn(['listData', 'status'], () => requestStatus.LOAD_ERROR);
      }
      return state.setIn(['listData', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['listData', 'sum'], () => action.result.paginate.totalItemsCount)
        .updateIn(['listData', 'no'], () => action.result.paginate.pageNumber)
        .updateIn(['listData', 'data'], () => {
          const msg = action.result.items;
          const result = [];
          msg.map((item) => {
            result.push({
              id: item.id,
              key: item.id,
              name: item.employeeId,
              gender: item.gender,
              avatar: item.avatar,
              birthday: item.birthday,
              phoneNumber: item.phoneNumber,
              workNumber: item.workNumber,
              positionId: item.positionId,
              positionName: item.positionName,
              companyEmail: item.companyEmail,
              serviceStatus: item.serviceStatus,
              departmentId: item.departmentId,
              departmentName: item.departmentName,
              employmentTypeId: item.employmentTypeId,
            });
          });
          return result;
        });
    case GET_EMPLOYEE_ALL_PAGE + '_FAIL':
      return state.setIn(['listData', 'status'], () => requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_INFO:
      return state.setIn(['userInfo', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_INFO + '_SUCCESS':
      return state.updateIn(['userInfo', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['userInfo', 'data'], () => action.result.items);
    case GET_EMPLOYEE_INFO + '_FAIL':
      return state.setIn(['userInfo', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_RECORD_INFO:
      return state.setIn(['recordInfo', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_RECORD_INFO + '_SUCCESS':
      return state.updateIn(['recordInfo', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['recordInfo', 'data'], () => action.result.items);
    case GET_EMPLOYEE_RECORD_INFO + '_FAIL':
      return state.setIn(['recordInfo', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_RESUMES:
      return state.setIn(['resumes', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_RESUMES + '_SUCCESS':
      return state.updateIn(['resumes', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['resumes', 'data'], () => action.result.items);
    case GET_EMPLOYEE_RESUMES + '_FAIL':
      return state.setIn(['resumes', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_EDUCATIONS:
      return state.setIn(['educations', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_EDUCATIONS + '_SUCCESS':
      return state.updateIn(['educations', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['educations', 'data'], () => action.result.items);
    case GET_EMPLOYEE_EDUCATIONS + '_FAIL':
      return state.setIn(['educations', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_SOCIALRELATIONS:
      return state.setIn(['socialrelations', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_SOCIALRELATIONS + '_SUCCESS':
      return state.updateIn(['socialrelations', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['socialrelations', 'data'], () => action.result.items);
    case GET_EMPLOYEE_SOCIALRELATIONS + '_FAIL':
      return state.setIn(['socialrelations', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_IDENTITIES:
      return state.setIn(['identities', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_IDENTITIES + '_SUCCESS':
      return state.updateIn(['identities', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['identities', 'data'], () => action.result.items);
    case GET_EMPLOYEE_IDENTITIES + '_FAIL':
      return state.setIn(['identities', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_BANKACCOUNTS:
      return state.setIn(['bankaccounts', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_BANKACCOUNTS + '_SUCCESS':
      return state.updateIn(['bankaccounts', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['bankaccounts', 'data'], () => action.result.items);
    case GET_EMPLOYEE_BANKACCOUNTS + '_FAIL':
      return state.setIn(['bankaccounts', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_CERTIFICATIONS:
      return state.setIn(['certifications', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_CERTIFICATIONS + '_SUCCESS':
      return state.updateIn(['certifications', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['certifications', 'data'], () => action.result.items);
    case GET_EMPLOYEE_CERTIFICATIONS + '_FAIL':
      return state.setIn(['certifications', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_TRAININGSTUDY:
      return state.setIn(['trainingStudy', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_TRAININGSTUDY + '_SUCCESS':
      return state.updateIn(['trainingStudy', 'status'], () => requestStatus.LOAD_SUCCESS)
        .updateIn(['trainingStudy', 'data'], () => action.result.items);
    case GET_EMPLOYEE_TRAININGSTUDY + '_FAIL':
      return state.setIn(['trainingStudy', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_PROBATION_INFO:
      return state.setIn(['getProbationInfo', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_PROBATION_INFO + '_SUCCESS':
      return state.setIn(['getProbationInfo', 'status'], requestStatus.LOAD_SUCCESS)
        .setIn(['getProbationInfo', 'data'], action.result.items);
    case GET_EMPLOYEE_PROBATION_INFO + '_FAIL':
      return state.setIn(['getProbationInfo', 'status'], requestStatus.LOAD_ERROR);
    case GET_EMPLOYEE_REGULAR_TYPE:
      return state.setIn(['getRegularType', 'status'], requestStatus.LOAD_LOADING);
    case GET_EMPLOYEE_REGULAR_TYPE + '_SUCCESS':
      return state.setIn(['getRegularType', 'status'], requestStatus.LOAD_SUCCESS)
        .setIn(['getRegularType', 'data'], action.result.items);
    case GET_EMPLOYEE_REGULAR_TYPE + '_FAIL':
      return state.setIn(['getRegularType', 'status'], requestStatus.LOAD_ERROR);
    case PUT_EMPLOYEE_PROBATION_INFO:
      return state.setIn(['putProbationInfo', 'status'], requestStatus.LOAD_LOADING);
    case PUT_EMPLOYEE_PROBATION_INFO + '_SUCCESS':
      return state.setIn(['putProbationInfo', 'status'], requestStatus.LOAD_SUCCESS)
        .setIn(['putProbationInfo', 'data'], action.result.items);
    case PUT_EMPLOYEE_PROBATION_INFO + '_FAIL':
      return state.setIn(['putProbationInfo', 'status'], requestStatus.LOAD_ERROR);
    default:
      return state;
  }
}

export function getEmployeeAllPage(pageNo = 1, pageSize = 10) {
  return {
    type: GET_EMPLOYEE_ALL_PAGE,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `induction-page-all?pageSize=${pageSize}&pageNo=${pageNo}`);
    }
  };
}


export function getTryDateType() {
  return {
    type: GET_TRY_DATE_TYPE,
    promise: (client) => {
      return client.get('/departments/tree');
    }
  };
}

export function postNewEmployee(data) {
  console.log(employeeUrlPrefix);
  return {
    type: POST_NEW_EMPLOYEE,
    promise: (client) => {
      return client.post(employeeUrlPrefix + 'employees-induction-info', {data});
    }
  };
}

export function getEmployeeInfo(employeeId) {
  return {
    type: GET_EMPLOYEE_INFO,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}`);
    }
  };
}

export function getEmployeeRecordInfo(employeeId) {
  return {
    type: GET_EMPLOYEE_RECORD_INFO,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/employee-record-info`);
    }
  };
}
// GET /v1/employees/{employee_id}/resumes
export function getEmployeeResumesAction(employeeId) {
  return {
    type: GET_EMPLOYEE_RESUMES,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/resumes`);
    }
  };
}

export function getEmployeeEducationsAction(employeeId) {
  return {
    type: GET_EMPLOYEE_EDUCATIONS,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/educations`);
    }
  };
}

export function getEmployeeSocialrelationsAction(employeeId) {
  return {
    type: GET_EMPLOYEE_SOCIALRELATIONS,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/social-relationships`);
    }
  };
}

export function getEmployeeIdentitiesAction(employeeId) {
  return {
    type: GET_EMPLOYEE_IDENTITIES,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/identities`);
    }
  };
}

export function getEmployeeBankaccountsAction(employeeId) {
  return {
    type: GET_EMPLOYEE_BANKACCOUNTS,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/bank-accounts`);
    }
  };
}

export function getEmployeeCertificationsAction(employeeId) {
  return {
    type: GET_EMPLOYEE_CERTIFICATIONS,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/certifications`);
    }
  };
}

export function getEmployeeTrainingStudyAction(employeeId) {
  return {
    type: GET_EMPLOYEE_TRAININGSTUDY,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/training-sessions`);
    }
  };
}

export function getEmployeeProbationInfoAction(employeeId) {
  return {
    type: GET_EMPLOYEE_PROBATION_INFO,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `employees/${employeeId}/employee-probation-info`);
    }
  };
}

export function getEmployeeRegularTypeAction() {
  return {
    type: GET_EMPLOYEE_REGULAR_TYPE,
    promise: (client) => {
      return client.get(employeeUrlPrefix + `enumeration/regular-type`);
    }
  };
}

export function putEmployeeProbationInfoAction(employeeId, data) {
  return {
    type: PUT_EMPLOYEE_PROBATION_INFO,
    promise: (client) => {
      return client.put(employeeUrlPrefix + `employees/${employeeId}/employee-probation-info`, {data});
    }
  };
}
