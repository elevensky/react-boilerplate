import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, Radio, Input } from 'antd';

const RadioGroup = Radio.Group;
import * as liveActions from 'redux/modules/live';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(liveActions.getLives());
  }
}])
@connect(
  (state) => ({ live: state.live.live }),
  liveActions)
export default class Limit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      value: '',
    };
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      type: e.target.value,
    });
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '52px',
      lineHeight: '52px',
    };
    return (
      <div className="my-lives wrap-box">
        <div className="wrap-box-title bg-gray">
          <span className="title">观看权限</span>
        </div>
        <div className="wrap-box-body bg-white pd20">
          <div className="limit-form">
            <RadioGroup onChange={this.onChange} value={this.state.type}>
              <Radio style={radioStyle} value={1}>免费</Radio>
              <Radio style={radioStyle} value={2}>付费观看 <Input placeholder="元" style={{width: '100px'}} onChange={(e) => this.setState({value: e.target.value})}/></Radio>
              <Radio style={radioStyle} value={3}>密码观看 <Input style={{width: '100px'}} onChange={this.handlePullStreamChange}/></Radio>
            </RadioGroup>
            <hr className="hr-normal mt20 mb20"/>
            <p className="mt20 text-center"><Button size="large" type="primary" htmlType="submit">提交</Button></p>
          </div>
        </div>
      </div>
    );
  }
}
