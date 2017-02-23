import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Alert,
  Input,
  Button,
  Row,
  Col,
  Form,
  TreeSelect,
  Select
} from 'antd';

import * as departmentActions from '../../redux/modules/department/index';
import * as treeOperation from '../../helpers/treeOperation';

const Option = Select.Option;
const FormItem = Form.Item;

const rootDepartmentParentId = -1;
const rootDepartmentParentName = '无上级部门';

const fromData = {
  name: '',
  code: '',
  parentId: rootDepartmentParentId,
  companyId: '',
  level: '',
  eeLeaderId: null,
  eeLeaderName: '',
  companyName: '',
  keyword: '',
  data: [
    {
      'id': '1',
      'name': '员工1',
    },
    {
      'id': '2',
      'name': '员工2',
    },
    {
      'id': '3',
      'name': '员工3',
    },
    {
      'id': '4',
      'name': '员工4',
    },
    {
      'id': '5',
      'name': 'name',
    },
  ],
};

@connect(
  state => ({}),
  departmentActions
)
class FormModal extends Component {
  static propTypes = {
    department: PropTypes.object,
    postDepartment: PropTypes.func,
    putDepartment: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {...fromData};
  }

  componentWillMount() {
    const {isCreate, id, departmentsTree} = this.props;
    /*
     * 总共有3种状态
     * 1：添加根部门 isCreate:true id:null
     * 2：添加子部门 isCreate:true id:id
     * 3：修改部门   isCreate:false id:id
     * */
    if (isCreate) {
      // 新增加部门
      if (id) {
        // 添加子部门 (id为父id)
        const parentDepartment = treeOperation.find(departmentsTree, (data) => {
          return data.id === id;
        });
        if (parentDepartment) {
          this.setState({
            'parentId': parentDepartment.id,
            'level': Number(parentDepartment.level) + 1,
            'companyName': parentDepartment.companyName,
            'companyId': parentDepartment.companyId,
          });
        }
      } else {
        // 添加根部门(不需要设置参数）
        this.setState({...fromData});
      }
    } else {
      // 编辑部门
      if (id) {
        const departmentObj = treeOperation.find(departmentsTree, (data) => {
          return data.id === id;
        });
        if (departmentObj) {
          this.setState({
            'name': departmentObj.name,
            'code': departmentObj.code,
            'parentId': departmentObj.parentId,
            'companyId': departmentObj.companyId,
            'companyName': departmentObj.companyName,
            'level': departmentObj.level,
            'eeLeaderId': departmentObj.eeLeader.id,
            'eeLeaderName': departmentObj.eeLeader.name,
            'avatar': departmentObj.eeLeader.avatar
          });
        }
      } else {
        this.setState({...fromData});
      }
    }
  }

  onChange(value) {
    const {departmentsTree} = this.props;
    const parentDepartment = treeOperation.find(departmentsTree, (data) => {
      return data.id === value;
    });
    if (parentDepartment) {
      this.setState({
        'level': parentDepartment.level + 1,
        'parentId': parentDepartment.id
      });
    }
  }

  formatDepartmentsTree(departmentTree) {
    return treeOperation.copy(departmentTree, (data) => {
      const result = {};
      result.label = data.name;
      result.value = data.id;
      result.key = data.key;
      return result;
    }, 'children');
  }

  handleSubmit(event) {
    event.preventDefault();
    const {onSubmit} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const postData = {
          companyId: 1,
          parentId: 1,
          name: '',
          eeLeaderId: 33,
          code: '',
          level: '',
          isNameExist: 'no'
        };
        // 组合数据，组合成后台需要的，直接提交
        if (values.parentId === rootDepartmentParentName) {
          postData.parentId = rootDepartmentParentId;
        } else {
          postData.parentId = values.parentId;
        }
        postData.name = values.name;
        postData.code = values.code;
        postData.level = values.level;
        // 部门负责人
        onSubmit(postData);
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {onCancel, departmentsTree} = this.props;
    const treeData = this.formatDepartmentsTree(departmentsTree);
    const options = this.state.data.map(item => <Option key={item.id}>{item.name}</Option>);
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 14},
    };
    const formItemLayout2 = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    return (
      <Form onSubmit={(event) => this.handleSubmit(event)}>
        {this.props.error && <Row>
          <Col span={12}>
            <Alert message={this.props.error.message} type="error" />
          </Col>
        </Row>}
        <Row gutter={40}>
          <Col span={12}>
            <FormItem {...formItemLayout}
                      label="部门名称"
                      required
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: '请输入部门名称'}],
                valuePropName: 'value',
                initialValue: this.state.name,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout2}
                      label="部门编码"
            >
              {getFieldDecorator('code', {
                rules: [{required: true, message: '请输入部门编码'}],
                valuePropName: 'value',
                initialValue: this.state.code,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem {...formItemLayout}
                      label="上级部门"
                      required
            >
              {getFieldDecorator('parentId', {
                rules: [{required: true, message: '请选择上级部门'}],
                valuePropName: 'value',
                initialValue: this.state.parentId === rootDepartmentParentId || !this.state.parentId
                  ? rootDepartmentParentName : this.state.parentId,
              })(
                <TreeSelect
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  treeData={[treeData]}
                  disabled={this.state.parentId === rootDepartmentParentId || !this.state.parentId}
                  placeholder="请选择上级部门"
                  treeDefaultExpandAll
                  onChange={this.onChange.bind(this)}
                />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout2}
                      label="部门层级"
            >
              {getFieldDecorator('level', {
                valuePropName: 'value',
                initialValue: this.state.level,
              })(<Input disabled/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem {...formItemLayout}
                      label="部门负责人"
                      required
            >
              {getFieldDecorator('leader', {
                valuePropName: 'value',
                initialValue: '',
              })(<Select
                  combobox
                  placeholder="请选择相关负责人"
                  notFoundContent="没有相关负责人"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                >
                  {options}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout2}
                      label="所属公司"
            >
              {getFieldDecorator('attachmentName', {
                valuePropName: 'defaultValue',
                initialValue: this.state.companyName,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <div className="text-right">
          <FormItem>
            <Button type="ghost" className="mr20" htmlType="button" size="large" onClick={onCancel}>取消</Button>
            <Button type="primary" htmlType="submit" size="large">保存</Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export default Form.create()(FormModal);
