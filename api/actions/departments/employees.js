
const id1111p1 = [
  {
    "avatar": "/url",
    "birthday": "2017-01-24T02:20:39.832Z",
    "companyId": 0,
    "departmentId": 0,
    "departmentName": "总裁办公室1",
    "email": "string",
    "gender": "女",
    "id": 0,
    "identityNumber": "string",
    "identityTypeId": 0,
    "inductionAt": "2017-01-24T02:20:39.832Z",
    "name": "员工1",
    "phoneNumber": "string",
    "positionId": 'id1111p1',
    "positionName": "1111技术部1",
    "qq": "string",
    "serviceStatus": "未定义",
    "userId": 0,
    "wechat": "string",
    "workNumber": "string"
  },
  {
    "avatar": "/url",
    "birthday": "2017-01-24T02:20:39.832Z",
    "companyId": 0,
    "departmentId": 0,
    "departmentName": "总裁办公室1",
    "email": "string",
    "gender": "女",
    "id": 1,
    "identityNumber": "string",
    "identityTypeId": 0,
    "inductionAt": "2017-01-24T02:20:39.832Z",
    "name": "员工2",
    "phoneNumber": "string",
    "positionId": 'id1111p1',
    "positionName": "1111技术部1",
    "qq": "string",
    "serviceStatus": "未定义",
    "userId": 0,
    "wechat": "string",
    "workNumber": "string"
  },
  {
    "avatar": "/url",
    "birthday": "2017-01-24T02:20:39.832Z",
    "companyId": 0,
    "departmentId": 0,
    "departmentName": "总裁办公室1",
    "email": "string",
    "gender": "女",
    "id": 2,
    "identityNumber": "string",
    "identityTypeId": 0,
    "inductionAt": "2017-01-24T02:20:39.832Z",
    "name": "员工3",
    "phoneNumber": "string",
    "positionId": 'id1111p1',
    "positionName": "1111技术部1",
    "qq": "string",
    "serviceStatus": "未定义",
    "userId": 0,
    "wechat": "string",
    "workNumber": "string"
  },
  {
    "avatar": "/url",
    "birthday": "2017-01-24T02:20:39.832Z",
    "companyId": 0,
    "departmentId": 0,
    "departmentName": "总裁办公室1",
    "email": "string",
    "gender": "女",
    "id": 3,
    "identityNumber": "string",
    "identityTypeId": 0,
    "inductionAt": "2017-01-24T02:20:39.832Z",
    "name": "员工4",
    "phoneNumber": "string",
    "positionId": 'id1111p1',
    "positionName": "1111技术部1",
    "qq": "string",
    "serviceStatus": "未定义",
    "userId": 0,
    "wechat": "string",
    "workNumber": "string"
  }
];

export function getEmployessByPosition(req) {
  let result = [];
  switch (req.params.positionId){
    case 'id1111p1':
      result = id1111p1;
      break;
  }
  return ({status: 200, items: result});
}
