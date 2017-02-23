import {Map, List} from 'immutable';
import requestStatus from '../../requestStatus';
const GET_POSITIONS_TREE = 'department/GET_POSITIONS_TREE';
const GET_DEPARTMENTS_TREE = 'department/GET_DEPARTMENTS_TREE';
const GET_POSITION_EMPLOYEES_LIST = 'department/GET_POSITION_EMPLOYEES_LIST';
const POST_DEPARTMENT = 'POST_DEPARTMENT';
const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT_BY_ID';
const PUT_DEPARTMENT = 'PUT_DEPARTMENT_BY_ID';
const GET_SEARCH_EMPLOYEES = 'GET_SEARCH_EMPLOYEES_BY_KEYWORD';

import * as treeOperation from '../../../helpers/treeOperation';
import * as listOperation from '../../../helpers/listOperation';

import {departmentUrlPrefix} from '../urlPrefix';

const initialState = Map({
  requestDepartmentsTreeStatus: requestStatus.LOAD_INIT,
  departmentsTree: Map(),
  requestPositionsListStatus: requestStatus.LOAD_INIT,
  positionsList: List(),
  requestEmployeesListStatus: requestStatus.LOAD_INIT,
  positionsEmployeesMap: Map(),
});

export default function reducer(state = initialState, action = {}) {
  if (!Map.isMap(state)) {
    return initialState;
  }
  switch (action.type) {
    case GET_DEPARTMENTS_TREE:
      return state.setIn(['requestDepartmentsTreeStatus'], requestStatus.LOAD_LOADING);
    case GET_DEPARTMENTS_TREE + '_SUCCESS':
      if (action.result.status !== 200) {
        return state.setIn(['requestDepartmentsTreeStatus'], requestStatus.LOAD_ERROR);
      }
      return state.setIn(['requestDepartmentsTreeStatus'], requestStatus.LOAD_SUCCESS)
        .update('departmentsTree', () => {
          // 插入部门树
          const msg = action.result.items;
          const result = treeOperation.copy(msg, (data) => {
            const newNode = {};
            newNode.id = data.id;
            newNode.key = data.id;
            newNode.companyId = data.companyId;
            newNode.parentId = data.parentId;
            newNode.name = data.name;
            newNode.code = data.code;
            newNode.eeLeader = {};
            newNode.eeLeader.id = data.eeLeader ? data.eeLeader.eeLeaderId : '';
            newNode.eeLeader.name = data.eeLeader ? data.eeLeader.leaderName : '';
            newNode.eeLeader.avatar = data.eeLeader ? data.eeLeader.avatar : '';
            newNode.level = data.level;
            newNode.positionSum = data.positionSum;
            newNode.employesSum = data.peopleSum;
            return newNode;
          }, 'childrenList');
          return Map(result);
        })
        .update('positionsList', (rawData) => {
          // 插入职位的根(部门)
          const result = [];
          treeOperation.loop(action.result.items, (data) => {
            const rawDataNode = rawData.find((node) => {
              return node.id === data.id;
            });
            if (rawDataNode && rawDataNode.id) {
              result.push({id: data.id, nodeType: 'department', name: data.name, children: rawDataNode.children});
            } else {
              result.push({id: data.id, nodeType: 'department', name: data.name, children: []});
            }
          }, 'childrenList');
          return List(result);
        });
    case GET_DEPARTMENTS_TREE + '_FAIL':
      return state.setIn(['requestDepartmentsTreeStatus'], requestStatus.LOAD_ERROR);
    case GET_POSITIONS_TREE:
      return state.setIn(['requestPositionsListStatus'], requestStatus.LOAD_LOADING);
    case GET_POSITIONS_TREE + '_SUCCESS':
      if (action.result.status !== 200 || action.result.items.length === 0) {
        return state.setIn(['requestPositionsListStatus'], requestStatus.LOAD_ERROR);
      }
      return state.setIn(['requestPositionsListStatus'], requestStatus.LOAD_SUCCESS)
        .update('positionsList', (list) => {
          const msg = action.result.items;
          return list.map(item => {
            if (item.id === msg[0].departmentId) {
              item.children = listOperation.copy(msg, (data) => {
                const newNode = {};
                newNode.id = data.id;
                newNode.name = data.name;
                newNode.departmentId = data.departmentId;
                newNode.nodeType = 'position';
                return newNode;
              }, 'childrenList');
            }
            return item;
          });
        });
    case GET_POSITIONS_TREE + '_FAIL':
      return state.setIn(['requestPositionsListStatus'], requestStatus.LOAD_ERROR);
    case GET_POSITION_EMPLOYEES_LIST:
      return state.setIn(['requestEmployeesListStatus'], requestStatus.LOAD_LOADING);
    case GET_POSITION_EMPLOYEES_LIST + '_SUCCESS':
      if (action.result.status !== 200 || action.result.items.length === 0) {
        return state.setIn(['requestEmployeesListStatus'], requestStatus.LOAD_ERROR);
      }
      return state.setIn(['requestEmployeesListStatus'], requestStatus.LOAD_SUCCESS)
        .update('positionsEmployeesMap', map => {
          const msg = action.result.items;
          return map.set(msg[0].positionId, msg);
        });
    case GET_POSITION_EMPLOYEES_LIST + '_FAIL':
      return state.setIn(['requestEmployeesListStatus'], requestStatus.LOAD_ERROR);
    case PUT_DEPARTMENT + '_SUCCESS':
      return state;
    default:
      return state;
  }
}

export function getDepartmentTree() {
  return {
    type: GET_DEPARTMENTS_TREE,
    promise: (client) => {
      return client.get(departmentUrlPrefix + 'departments/tree');
    }
  };
}

export function getPositionsTree(id) {
  return {
    type: GET_POSITIONS_TREE,
    promise: (client) => {
      return client.get(departmentUrlPrefix + `departments/${id}/positions/tree`);
    }
  };
}

export function getPositionEmployeesList(departmentId, positionId ) {
  return {
    type: GET_POSITION_EMPLOYEES_LIST,
    promise: (client) => {
      return client.get(departmentUrlPrefix + `departments/${departmentId}/positions/${positionId}/employees`);
    }
  };
}

export function postDepartment(data) {
  return {
    type: POST_DEPARTMENT,
    promise: (client) => {
      return client.post(departmentUrlPrefix + 'departments/', { data });
    }
  };
}

export function delDepartment(id) {
  return {
    type: DELETE_DEPARTMENT,
    promise: (client) => {
      return client.del(departmentUrlPrefix + `departments/${id}`);
    }
  };
}

export function putDepartment(id, data) {
  return {
    type: PUT_DEPARTMENT,
    promise: (client) => {
      return client.put(departmentUrlPrefix + `departments/${id}`, { data });
    }
  };
}

export function getEmployeesLeaders(data) {
  return {
    type: GET_SEARCH_EMPLOYEES,
    promise: (client) => {
      return client.get(departmentUrlPrefix + `search/employees`, { data });
    }
  };
}
