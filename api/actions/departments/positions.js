
const id1111 = [{
  "id": 'id1111p1',
  "logicalDel": 0,
  "createTime": "2017-01-21T19:45:21.000+0000",
  "updateTime": "2017-01-21T19:45:21.000+0000",
  "companyId": 1,
  "parentId": 1,
  "departmentId": 'id1111',
  "name": "1111技术部1",
  "code": "1001",
  "positionTypeId": null,
  "positionLevelId": null,
  "note": null,
  "childrenList": []
},
  {
    "id": 'id1111p2',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:46.000+0000",
    "updateTime": "2017-01-21T19:45:56.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id1111',
    "name": "1111技术部2",
    "code": "1002",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  }];

const id2222 = [
  {
    "id": 'id2222p1',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:21.000+0000",
    "updateTime": "2017-01-21T19:45:21.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id2222',
    "name": "2222技术部1",
    "code": "1001",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  },
  {
    "id": 'id2222p2',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:46.000+0000",
    "updateTime": "2017-01-21T19:45:56.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id2222',
    "name": "2222技术部2",
    "code": "1002",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  }
];

const id3333 =[
  {
    "id": 'id3333p1',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:21.000+0000",
    "updateTime": "2017-01-21T19:45:21.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id3333',
    "name": "3333技术部1",
    "code": "1001",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  },
  {
    "id": 'id3333p2',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:46.000+0000",
    "updateTime": "2017-01-21T19:45:56.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id3333',
    "name": "3333技术部2",
    "code": "1002",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  }
];

const id4444 = [
  {
    "id": 'id4444p1',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:21.000+0000",
    "updateTime": "2017-01-21T19:45:21.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id4444',
    "name": "4444技术部1",
    "code": "1001",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  },
  {
    "id": 'id4444p2',
    "logicalDel": 0,
    "createTime": "2017-01-21T19:45:46.000+0000",
    "updateTime": "2017-01-21T19:45:56.000+0000",
    "companyId": 1,
    "parentId": 1,
    "departmentId": 'id4444',
    "name": "4444技术部2",
    "code": "1002",
    "positionTypeId": null,
    "positionLevelId": null,
    "note": null,
    "childrenList": []
  }
];


export function getPositionsTree(req) {
  let result = [];
  switch (req.params.departmentId){
    case 'id1111':
      result = id1111;
      break;
    case 'id2222':
      result = id2222;
      break;
    case 'id3333':
      result = id3333;
      break;
    case 'id4444':
      result = id4444;
      break;
    default:
      break;
  }
  return ({status: 200, items: result});
}
