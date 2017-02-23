import * as treeOperation from '../../../src/helpers/treeOperation';

const tree = {
  "id": "id1111",
  "companyId": 1,
  "companyName": "公司名称",
  "parentId": -1,
  "eeLeader": {
    "eeLeaderId": "11211",
    "leaderName": "象老板",
    "avatar": "头像路径",
  },
  "peopleSum": 50,
  "positionSum": 3,
  "name": "总裁办公室1",
  "code": "1001",
  "level": 1,
  "note": "备注",
  "childrenList": [
    {
      "id": "id2222",
      "companyId": 1,
      "companyName": "公司名称",
      "parentId": 'id1111',
      "eeLeader": {
        "eeLeaderId": "11211",
        "leaderName": "象老板",
        "avatar": "头像路径",
      },
      "peopleSum": 50,
      "positionSum": 3,
      "name": "总裁办公室2",
      "code": "1002",
      "level": 2,
      "note": "备注",
      "childrenList": [
        {
          "id": "id4444",
          "companyId": 1,
          "companyName": "公司名称",
          "parentId": 'id2222',
          "eeLeader": {
            "eeLeaderId": "11211",
            "leaderName": "象老板",
            "avatar": "头像路径",
          },
          "peopleSum": 50,
          "positionSum": 3,
          "name": "总裁办公室4",
          "code": "1002",
          "level": 2,
          "note": "备注",
          "childrenList": []
        },
        {
          "id": "id5555",
          "companyId": 1,
          "companyName": "公司名称",
          "parentId": 'id2222',
          "eeLeader": {
            "eeLeaderId": "11211",
            "leaderName": "象老板",
            "avatar": "头像路径",
          },
          "peopleSum": 50,
          "positionSum": 3,
          "name": "总裁办公室5",
          "code": "1002",
          "level": 2,
          "note": "备注",
          "childrenList": []
        },
        {
          "id": "id6666",
          "companyId": 1,
          "companyName": "公司名称",
          "parentId": 'id2222',
          "eeLeader": {
            "eeLeaderId": "11211",
            "leaderName": "象老板",
            "avatar": "头像路径",
          },
          "peopleSum": 50,
          "positionSum": 3,
          "name": "总裁办公室6",
          "code": "1002",
          "level": 2,
          "note": "备注",
          "childrenList": []
        }
      ]
    },
    {
      "id": "id3333",
      "companyId": 1,
      "companyName": "公司名称",
      "parentId": 'id1111',
      "eeLeader": {
        "eeLeaderId": "11211",
        "leaderName": "象老板",
        "avatar": "头像路径",
      },
      "peopleSum": 50,
      "positionSum": 3,
      "name": "总裁办公室3",
      "code": "1003",
      "level": 2,
      "note": "备注",
      "childrenList": [
        {
          "id": "id7777",
          "companyId": 1,
          "companyName": "公司名称",
          "parentId": 'id2222',
          "eeLeader": {
            "eeLeaderId": "11211",
            "leaderName": "象老板",
            "avatar": "头像路径",
          },
          "peopleSum": 50,
          "positionSum": 3,
          "name": "总裁办公室7",
          "code": "1002",
          "level": 2,
          "note": "备注",
          "childrenList": []
        },
        {
          "id": "id8888",
          "companyId": 1,
          "companyName": "公司名称",
          "parentId": 'id2222',
          "eeLeader": {
            "eeLeaderId": "11211",
            "leaderName": "象老板",
            "avatar": "头像路径",
          },
          "peopleSum": 50,
          "positionSum": 3,
          "name": "总裁办公室8",
          "code": "1002",
          "level": 2,
          "note": "备注",
          "childrenList": []
        }
      ]
    }
  ]
};

export function departmentsTree(req) {
  return ({status: 200, items: tree});
}

export function getDepartmentById(req) {
  const departmentId = req.params.departmentId;
  let result = {};
  const loop = (data)=>{
    if(data.id === departmentId){
      result = data;
      return ;
    }
    if(data.childrenList && data.childrenList.length ){
      data.childrenList.map(item=>{
        loop(item);
      });
    }
  };
  loop(tree);
  return ({status: 200, items: result});
}

export function postDepartment(req) {
  if (req.body.parentId) {
    let d = new Date();
    req.body.id = d.getTime().toString();
    req.body.eeLeader = {};
    req.body.eeLeader.id = d.getTime().toString();
    req.body.eeLeader.name = req.body.leader;
    req.body.companyId = '123';
    req.body.code = 'test';
    const parent = treeOperation.find(tree, (data) => {
      return data.id === req.body.parentId;
    }, 'childrenList');
    if (parent) {
      if (parent.childrenList instanceof Array) {
        parent.childrenList.push(req.body);
      } else {
        parent.childrenList = [];
        parent.childrenList.push(req.body);
      }
    }
  }
  return ({status: 200, items: {}});
}

export function putDepartment(req) {
  if(req.body.id) {
    const department = treeOperation.find(tree, (data)=>{
      return data.id === req.body.id;
    }, 'childrenList');
    if(department) {
      department.name = req.body.name;
      department.code = req.body.code;
    }
  }
  return ({status: 200, items: {}});
}

export function delDepartment(req) {
  const departmentId = req.params.departmentId;
  if(departmentId) {
    const department = treeOperation.find(tree, (data)=>{
      return data.id === departmentId;
    }, 'childrenList');
    if(department) {
      const parentDepartment = treeOperation.find(tree, (data)=>{
        return data.id === department.parentId;
      }, 'childrenList');
      if(parentDepartment) {
        let index = 0;
        for(index = 0 ; index < parentDepartment.childrenList.length; index++) {
          if(parentDepartment.childrenList[index].id === departmentId) {
            parentDepartment.childrenList.splice(index, 1);
            break;
          }
        }
      }
    }
  }
  return ({status: 200, items: {}});
}