import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Table, Input, Button, Row, Col, Tree, Modal, Popconfirm, message} from 'antd';
import DepartmentForm from './DepartmentForm';

import * as departmentActions from '../../redux/modules/department/index';

const prefixCls = 'Department';

@connect(
  state => ({department: state.department}),
  departmentActions
)
export default class Department extends Component {

  static propTypes = {
    department: PropTypes.object,
    getPositionsTree: PropTypes.func,
    getDepartmentTree: PropTypes.func,
    getPositionEmployeesList: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isCreate: true,
      id: null,
      error: ''
    };
  }

  componentDidMount() {
    this.props.getDepartmentTree();
  }

  async onSubmit(values) {
    try {
      if (this.state.isCreate) {
        const payload = await this.props.postDepartment(values);
        const {status, errorCode} = payload;
        if (status !== 200) {
          return this.setState({error: errorCode[0]});
        }
        message.success('操作成功');
      } else {
        // 修改部门
        await this.props.putDepartment(this.state.id, values);
        message.success('操作成功');
      }
      this.setState({showModal: false, error: ''});
      this.props.getDepartmentTree();
    } catch (err) {
      console.log('onSubmit', err);
    }
  }
  async delDepartment(id) {
    try {
      await this.props.delDepartment(id);
      await this.props.getDepartmentTree();
      message.success('删除成功');
    } catch (err) {
      console.log(err);
    }
  }

  editDepartment(id) {
    this.setState({isCreate: false, showModal: true, id: id});
  }

  addDepartment(id) {
    let departmentId = id;
    if (!id) {
      const departmentsTree = this.props.department.get('departmentsTree').toJS();
      // departmentId可能为空，创建根部门
      departmentId = departmentsTree.id;
    }
    this.setState({isCreate: true, showModal: true, id: departmentId});
  }

  generateTable() {
    let result = null;
    const departmentsData = [];
    if (this.props.department) {
      const departmentsTree = this.props.department.get('departmentsTree').toJS();
      if (departmentsTree.id) {
        departmentsData.push(departmentsTree);
      }
    }
    if (!departmentsData.length) {
      return result;
    }
    const columns = [{
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    }, {
      title: '部门层级',
      dataIndex: 'level',
      key: 'level',
      width: '15%',
    }, {
      title: '部门编号',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
    }, {
      title: '部门负责人',
      dataIndex: 'eeLeader.name',
      key: 'eeLeader.id',
      width: '15%',
    }, {
      title: '操作',
      key: 'Action',
      width: '15%',
      render: (text, record) => (
        <span>
          <a onClick={this.editDepartment.bind(this, record.id)}>编辑</a>
          <span className="ant-divider"/>
          <a onClick={this.addDepartment.bind(this, record.id)}>新增下级部门</a>
          {(!record.parentId || !(record.parentId === -1)) && <span className="ant-divider"/>}
          {(!record.parentId || !(record.parentId === -1)) && <Popconfirm placement="top" title="确认删除此部门" onConfirm={() => this.delDepartment(record.id)} okText="确认"
                      cancelText="取消">
            <a className="ant-dropdown-link">删除</a>
          </Popconfirm>}
        </span>
      )
    }];
    result = <Table columns={columns} dataSource={departmentsData} pagination={false}/>;
    return result;
  }
  generateTree() {
    let result = null;
    if (this.props.department) {
      const positionsList = this.props.department.get('positionsList');
      const positionsEmployeesMap = this.props.department.get('positionsEmployeesMap');
      const loop = data => data.map((item) => {
        if (item.children && item.children.length) {
          return <Tree.TreeNode key={item.id} title={item.name}>{loop(item.children)}</Tree.TreeNode>;
        }
        if (positionsEmployeesMap) {
          const employeeMap = positionsEmployeesMap.find((value, key) => {
            return key === item.id;
          });
          if (employeeMap) {
            const isLeaf = true;
            return (<Tree.TreeNode key={item.id} title={item.name}>
              {employeeMap.map(employee => {
                return <Tree.TreeNode isLeaf={isLeaf} key={employee.id} title={employee.name}/>;
              })}
            </Tree.TreeNode>);
          }
          return <Tree.TreeNode key={item.id} title={item.name}/>;
        }
        return <Tree.TreeNode key={item.id} title={item.name}/>;
      });

      result = loop(positionsList);
    }
    return result;
  }

  positionsTreeLoadData(node) {
    const nodeId = node.props.eventKey;
    const positionsList = this.props.department.get('positionsList').toJS();
    if (!(positionsList instanceof Array)) {
      return null;
    }
    const find = (data) => {
      if (!(data instanceof Array)) {
        return null;
      }
      for (let index = 0; index < data.length; index++) {
        if (String(data[index].id) === nodeId) {
          return data[index];
        }
        if (data[index].children && data[index].children.length) {
          const findResult = find(data[index].children);
          if (findResult) {
            return findResult;
          }
        }
      }
    };
    const position = find(positionsList);
    // 有职位的，不再请求
    if (position && position.children.length) {
      return Promise.resolve();
    }

    // 如果是职位节点，需要请求职位下面的人员
    if (position && position.nodeType === 'position') {
      // 有员工的，不再请求职位下面的人员
      const positionsEmployeesMap = this.props.department.get('positionsEmployeesMap');
      const employee = positionsEmployeesMap.find((value, key) => {
        return key === nodeId;
      });
      if (employee && employee.id) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        const promise = this.props.getPositionEmployeesList(position.departmentId, position.id);
        promise.then(
          (data) => resolve(data),
          (error) => resolve(error)
        );
      });
    }
    return new Promise((resolve) => {
      const promise = this.props.getPositionsTree(nodeId);
      promise.then(
        (data) => resolve(data),
        (error) => resolve(error)
      );
    });
  }

  render() {
    const {showModal, isCreate, id, error} = this.state;
    const departmentsTree = this.props.department.get('departmentsTree').toJS();
    const modal = (
      <Modal title={isCreate ? '新建部门' : '修改部门'}
             visible={showModal}
             closable={false}
             width={720}
             footer={""}
             className={`${prefixCls}-modal`}>
        <Row>
          <Col span="24">
            <DepartmentForm departmentsTree={departmentsTree} onSubmit={this.onSubmit.bind(this)} onCancel={() => this.setState({showModal: false, error: ''})}
                            isCreate={isCreate} id={id} error={error}/>
          </Col>
        </Row>
      </Modal>
    );
    return (
      <div className={`${prefixCls}`}>
        <Helmet title="部门"/>
        {showModal && modal}
        <div className={`${prefixCls}-content`}>
          <Row>
            <Col span={18}>
              <div className={`${prefixCls}-department`}>
                <div className={`${prefixCls}-department-search`}>
                  <span>查询部门：</span>
                  <Input.Search
                    style={{width: 200}}
                    placeholder="请输入关键字搜索"/>
                  <a href="/departmentTreeShow">查看部门结构图</a>
                </div>

                <div className={`${prefixCls}-department-add`}>
                  <Button type="primary" onClick={this.addDepartment.bind(this, null)}>添加部门</Button>
                </div>
                <div className={`${prefixCls}-department-table`}>
                  {this.generateTable()}
                </div>

              </div>
            </Col>
            <Col span={6}>
              <div className={`${prefixCls}-position`}>
                <div className={`${prefixCls}-position-search`}>
                  <span>查询职位</span>
                  <Input.Search
                    style={{width: 200}}
                    placeholder="请输入关键字搜索"/>
                </div>
                <div className={`${prefixCls}-position-tree`}>
                  <Tree loadData={this.positionsTreeLoadData.bind(this)}>
                    {this.generateTree()}
                  </Tree>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
