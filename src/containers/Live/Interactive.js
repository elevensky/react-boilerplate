import React, { Component, PropTypes } from 'react';
import { Checkbox, Form, Button, Input } from 'antd';
import Helmet from 'react-helmet';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

import BreadCrumb from '../../components/BreadCrumb/';
const options = [
  { label: '允许聊天', value: 'chat' },
  { label: '允许红包', value: 'redEnvelopes' },
  { label: '允许打赏', value: 'reward' },
];
const defaultCheckedList = ['Apple', 'Orange'];

export default class Interactive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < options.length),
      checkAll: checkedList.length === options.length,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <div className="create-lives wrap-box">
        <Helmet title="观众互动设置-创建直播"/>
        <BreadCrumb />
        <div className="wrap-box-title bg-gray">
          <span className="title">观众互动</span>
        </div>
        <div className="wrap-box-body bg-white pd20">
          <div className="interactive-form">
            <CheckboxGroup className="vertical-checkbox" options={options} onChange={this.onChange} />
            <hr className="hr-normal mt20 mb20"/>
            <p className="mt20 text-center"><Button size="large" type="primary" htmlType="submit">提交</Button></p>
          </div>
        </div>
      </div>
    );
  }
}
