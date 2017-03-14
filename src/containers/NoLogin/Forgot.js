import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Alert, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import * as authActions from 'redux/modules/auth';
import './NoLogin.less';

@connect(state => ({user: state.auth.user}), authActions)
class RegistrationForm extends React.Component {
  state = {
    passwordDirty: false,
    imgCode: '',
    error: null,
    step: 0,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handlePasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }
  checkPhone = (rule, value, callback) => {
    const form = this.props.form;
    const reg = /^1[0-9]{10}$/;
    if (value && !reg.test(value)) {
      callback('手机格式不正确!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value.length < 6) {
      callback('密码不能少于6位');
      return;
    }
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  authPhone = async (e) => {
    const value = e.target.value;
    const { reterr } = await this.props.checkPhone(value);
    this.setState({error: reterr});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const step = Boolean(this.state.step);

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1 className="text-center no-login-title fw400 mb10">
          {step && <Icon type="left" style={{cursor: 'pointer'}} className="pull-left mt10" onClick={() => this.setState({step: 0})} />}
          {step ? '输入密码' : '输入手机号'}
        </h1>
        {this.state.error && this.state.error.msg && <Alert message={this.state.error.msg} type="error" />}
        <div style={step ? {display: 'none'} : {display: 'block'}}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请输入用户名' },
                {
                  validator: this.checkPhone,
                }
              ],
            })(
              <Input addonBefore={<Icon type="mobile" />} onBlur={this.authPhone} placeholder="手机号" />
            )}
          </FormItem>
          <FormItem style={{marginBottom: '10px'}}>
            <Row gutter={8}>
              <Col span={15}>
                <Input size="large" onChange={(e) => this.setState({imgCode: e.target.value})} placeholder="验证码" />
              </Col>
              <Col span={9} className="text-right">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488436139062&di=9c24b3dc45d536a26f37a77b839515f1&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F822721%2F201607%2F822721-20160720230416701-1768858575.png" height="40px" width="100px" alt="验证码" />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={15}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码' }],
                })(
                  <Input size="large" placeholder="手机验证码" />
                )}
              </Col>
              <Col span={9} className="text-right">
                <Button className="pull-right" type="primary" disabled={!this.state.imgCode.length} size="large">获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" style={{width: '100%'}} onClick={() => this.setState({step: 1})} size="large">下一步</Button>
          </FormItem>
        </div>
        <div style={!step ? {display: 'none'} : {display: 'block'}}>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!'},
              {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" addonBefore={<Icon type="lock" />} onBlur={this.handlePasswordBlur} placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请输入确认密码!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" placeholder="确认密码" addonBefore={<Icon type="lock" />} />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" style={{width: '100%'}} htmlType="submit" size="large">完成</Button>
          </FormItem>
        </div>
        <div className="mt10 text-center nologin-tip-box">已有账号，<Link className="col-yellow" to="/login">去登陆</Link></div>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Register extends Component {

  render() {
    return (
      <div className="pageRegister login-box box-shadow container">
        <Helmet title="忘记密码"/>
        <WrappedRegistrationForm />
      </div>
    );
  }
}
