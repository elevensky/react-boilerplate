import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Button, Modal, Table, Input, Icon } from 'antd';

import * as liveActions from 'redux/modules/live';
var imageUrl = require('./video_banne2.png');

@connect(
  (state) => ({ live: state.live.live }),
  liveActions)
export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div className="my-lives wrap-box">
        <div className="wrap-box-title bg-gray">
          <span className="title">滚动公告</span>
        </div>
        <div className="wrap-box-body bg-white pd20">
          <div className="limit-form">
            <div style={{position: 'relative', width: '330px'}}>
              <img src={imageUrl} width="330px" height="160px" style={{borderRadius: '10px'}} alt="示例封面" />
              <div className="marquee" style={{position: 'absolute', bottom: '0'}}>
                <span>{this.state.value}</span>
              </div>
            </div>
            <Input type="textarea" rows={4} placeholder="请输入内容" style={{width: '330px', marginTop: '20px'}} onChange={e => this.setState({value: e.target.value})} />
            <hr className="hr-normal mt20 mb20"/>
            <p className="mt20 text-center"><Button size="large" type="primary" htmlType="submit">提交</Button></p>
          </div>
        </div>
      </div>
    );
  }
}
