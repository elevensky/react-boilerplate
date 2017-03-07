import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, Modal, Table, Input, Icon } from 'antd';

import * as liveActions from 'redux/modules/live';
import './index.less';

const data = [{
  key: '1',
  url: 'http://easylive.com/index',
  id: '1202111',
  cover: 'http://wx1.sinaimg.cn/large/40a9031aly1fd8pk2nvk6j20gg088dgo.jpg',
  title: '我要去追赶夏天的萤火虫',
  times: '100万',
  start_time: '2017-2-28 18:36',
  status: '直播中'
}];

@connect(
  (state) => ({live: state.live}),
  liveActions)
export default class MyLiving extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
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

  shareLive(event, record) {
    event.preventDefault();
    const _self = this;
    require.ensure([], function(require) {
      require('./social-share.js');
      _self.setState({visible: true}, function() {
        window.socialShare('#share-box', {
          url: record.url,
          title: record.title,
          description: record.description,
          sites: ['qzone', 'qq', 'weibo', 'wechat'],
        });
      });
    });
  }

  render() {
    const columns = [{
      title: '直播标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '观看次数',
      dataIndex: 'times',
      key: 'times',
    }, {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      key: 'action',
      className: 'text-center',
      render: (text, record) => (
        <span>
          <a onClick={(event) => this.shareLive(event, record)} className="mr10"><Icon type="export" /> 分享</a>
          <a href="#" className="mr10"><Icon type="eye-o" /> 观看</a>
          <a href="#" className="mr10"><Icon type="pie-chart" /> 统计</a>
          <a href="#"><Icon type="close-circle-o" /> 关闭直播</a>
        </span>
      ),
    }];
    return (
      <div className="my-living wrap-box">
        <Helmet title="我的直播"/>
        <Modal title="分享"
               visible={this.state.visible}
               onOk={this.handleOk}
               footer={null}
               onCancel={this.handleCancel}>
          <div id="share-box" data-initialized="true">
            <a href="#" className="social-share-icon icon-weibo">微薄</a>
            <a href="#" className="social-share-icon icon-qq">QQ</a>
            <a href="#" className="social-share-icon icon-qzone">QQ空间</a>
            <a href="#" className="social-share-icon icon-wechat">微信</a>
          </div>
        </Modal>
        <div className="wrap-box-title">
          <span className="title">我的直播</span>
          <div className="global-search mt10 pull-right">
            <Input
              placeholder="请输入活动标题"
              suffix={(
                <Button className="search-btn" type="primary">
                  <Icon type="search" />
                </Button>
              )}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
