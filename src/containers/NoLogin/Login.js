import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import * as authActions from 'redux/modules/auth';
import './NoLogin.less';
const phoneImage = require('./phone.svg');
const lockImage = require('./lock.svg');

@connect(state => ({user: state.auth.user}), authActions)
class NormalLoginForm extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { router } = this.context;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        try {
          await this.props.login(values);
          router.push('/');
        } catch (error) {
          console.log(error);
        }
      }
    });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '请输入用户名！' },
              {
                validator: this.checkPhone,
              }
            ],
            validateTrigger: 'onBlur',
          })(
            <Input prefix={<img src={phoneImage} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem style={{marginBottom: '5'}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<img src={lockImage} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <Link to="/forgot" className="login-form-forgot pull-right">忘记密码</Link>
          <Button type="primary" htmlType="submit" style={{width: '100%', marginTop: '10'}}>
            登陆
          </Button>
          <div className="nologin-tip-box mt10 text-center">没有账号，<Link to="/register">立即注册</Link></div>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default class Login extends Component {
  render() {
    const {user, logout} = this.props;
    return (
      <div className="pageLogin login-box box-shadow container">
        <Helmet title="用户登陆"/>
        <h1 className="text-center no-login-title mb10 fw400">登陆</h1>
        <WrappedNormalLoginForm />
      </div>
    );
  }
}
