import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, Modal, Icon } from 'antd';

import PasswordForm from './PasswordForm';
import * as liveActions from 'redux/modules/live';

@connect(
  (state) => ({ user: state.user }),
  liveActions)
export default class Safe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showType: '',
    };
  }
  handleOk = (e) => {
    this.setState({
      showModal: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      showModal: false,
    });
  }
  render() {
    return (
      <div className="user user-safe wrap-box">
        <Modal title="创建模板"
               visible={this.state.showModal}
               onOk={this.handleOk}
               footer={null}
               onCancel={this.handleCancel}>
          {this.state.showType === 'password' && <PasswordForm />}
        </Modal>
        <div className="wrap-box-title bg-gray">
          <span className="title">账户安全</span>
        </div>
        <div className="wrap-box-body clearfix">
          <div className="item-box pd20">
            <Icon type="setting" style={{fontSize: '24px', color: '#5c79e5'}} className="pull-left" /> <span className="mr20"></span>修改密码
            <span className="pull-right">
              <Button type="primary" onClick={e => this.setState({showModal: true, showType: 'password'})}>马上修改</Button>
            </span>
          </div>
          <div className="item-box pd20">
            <Icon type="mobile" style={{fontSize: '24px', color: '#5c79e5'}} className="pull-left" /> <span className="mr20"></span>修改手机
            <span className="pull-right">
              <Button type="primary" onClick={e => this.setState({showModal: true, showType: 'phone'})}>更换手机</Button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
