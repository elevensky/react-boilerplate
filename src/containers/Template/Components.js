import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Row, Col, Icon, Card } from 'antd';

import * as liveActions from 'redux/modules/live';
import './Components.less';

@connect(
  (state) => ({ live: state.live.live }),
  liveActions)
export default class BaseLive extends Component {
  render() {
    return (
      <div className="components wrap-box">
        <div className="wrap-box-title bg-gray">
          <span className="title">模板组件</span>
        </div>
        <div className="wrap-box-body clearfix">
          <div className="component-card-wrap style-1 pull-left" href="javascript:;">
            <Card title="基本信息" className="template-list-card">
              <div className="text-center">
                <p className="mt20">标题</p>
                <p className="mt20">封面</p>
                <p className="mt20">时间</p>
                <p className="mt20">地点</p>
              </div>
            </Card>
          </div>
          <div className="component-card-wrap style-blue pull-left" href="javascript:;">
            <Card title="直播管理" className="template-list-card">
              <div className="text-center">
                <p className="mt20">简介</p>
                <p className="mt20">榜单</p>
                <p className="mt20">自定义菜单</p>
                <p className="mt20">关注</p>
              </div>
            </Card>
          </div>
          <div className="component-card-wrap style-2 pull-left" href="javascript:;">
            <Card title="菜单管理" className="template-list-card">
              <div className="text-center">
                <p className="mt20">观众互动</p>
                <p className="mt20">观看限制</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
