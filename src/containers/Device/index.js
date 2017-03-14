import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, Form, Modal, Table, Input, Icon } from 'antd';

const FormItem = Form.Item;
import * as deviceActions from 'redux/modules/device';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(deviceActions.getDevices());
  }
}])
@connect(
  (state) => ({ devices: state.device.devices }),
  deviceActions)
export default class Devices extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
      coding: '',
      name: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleDevice(id) {
  }

  async closeDevice(type) {
    try {
      await this.props.closeDevice(type);
      await this.props.getDevices();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const columns = [{
      title: '设备号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '推流地址',
      dataIndex: 'vurl',
      width: '300px',
      key: 'vurl',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span> { text === '1' ? '离线' : '关闭' }</span>
      ),
    }, {
      title: '推流总时长',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => (
        <span> { text } 秒</span>
      ),
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'start_time',
    }, {
      title: '操作',
      key: 'action',
      className: 'text-center',
      render: (text, record) => (
        <span>
          <a href="#"><Icon type="close-circle-o" /> 禁用</a>
          <a href="#" className="mr10"><Icon type="edit" /> 编辑</a>
        </span>
      ),
    }];

    return (
      <div className="my-lives wrap-box">
        <Helmet title="我的直播"/>
        <Modal title="添加设备"
               visible={this.state.visible}
               onOk={this.handleOk}
               footer={null}
               onCancel={this.handleCancel}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="Fail"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input placeholder="unavailable choice" id="error" />
            </FormItem>

            <FormItem
              label="Warning"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              validateStatus="warning"
            >
              <Input placeholder="Warning" id="warning" />
            </FormItem>
            <FormItem
              wrapperCol={{
                xs: { span: 16, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}
            >
              <Button type="primary" htmlType="submit">确定添加</Button>
            </FormItem>
          </Form>
        </Modal>
        <div className="wrap-box-title">
          <span className="title">我的直播</span>
          <Button style={{marginTop: '15px'}} className="pull-right" type="primary" onClick={this.showModal}>
              增加设备
          </Button>
        </div>
        <div className="wrap-box-body">
          <Table columns={columns} dataSource={this.props.devices.toJS()} />
        </div>
      </div>
    );
  }
}
