import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import { Button, Layout, Menu, Icon } from 'antd';
const { Content } = Layout;
const { SubMenu } = Menu;
import config from '../../config';
import Header from '../../components/Header';
import './Dashboard.less';
const videoImage = require('./video.svg');

@connect(
  null,
  { pushState: push})
export default class Dashboard extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <Layout id="dashboard">
        <Helmet {...config.app.head}/>
        <Header />
        <div className="sidebar">
          <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
            <div className="btn-create text-center">
              <Button type="primary" size="large"><img src={videoImage} /> 创建直播</Button>
            </div>
            <SubMenu
              key="sub1"
              title={<span><Icon type="team" /><span className="nav-text">活动管理</span></span>}
            >
              <Menu.Item key="1"><Link to="/">我的直播</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/">历史直播</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="appstore" /><span className="nav-text">模板管理</span></span>}
            >
              <Menu.Item key="4"><Link to="/">我的模板</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/">模板组建</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="hdd" /><span className="nav-text">设备管理</span></span>}
            >
              <Menu.Item key="31"><Link to="/">我的设备</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={<span><Icon type="setting" /><span className="nav-text">用户管理</span></span>}
            >
              <Menu.Item key="41"><Link to="/">用户中心</Link></Menu.Item>
              <Menu.Item key="42"><Link to="/">安全管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <Content className="main-body">
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
