import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import { Breadcrumb, Button, Layout, Menu, Icon } from 'antd';
const { Content } = Layout;
const { SubMenu } = Menu;
import config from '../../config';
import Header from '../../components/Header';
import './Dashboard.less';
const videoImage = require('./video.svg');

@connect(
  (state, ownProps) => ({location: ownProps.location, params: ownProps.params, template: state.template.template, livemenu: state.template.selectId}),
  { pushState: push})
export default class Dashboard extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    console.log(this.props.params);
  }
  render() {
    const { pathname } = this.props.location;
    const { id } = this.props.params;
    let sideType;
    if (pathname.indexOf('lives/') !== -1) {
      if (pathname.indexOf('statistics') !== -1 || pathname.indexOf('control') !== -1) {
        sideType = 'noMenu';
      } else {
        sideType = 'showLiveMenu';
      }
    } else {
      sideType = 'showDashBoardMenu';
    }
    return (
      <Layout id="dashboard" className={sideType === 'noMenu' && 'nomenu'}>
        <Helmet {...config.app.head}/>
        <Header />
        <div className="sidebar">
          { sideType === 'showLiveMenu' && <Menu theme="dark" mode="inline" defaultOpenKeys={['sub2', 'sub3']}>
            <Menu.Item key="1" className="ant-menu-submenu-title"><Icon type="edit" /><span className="nav-text"><Link to={`/lives/${id}/base`}>基本信息</Link></span></Menu.Item>
            <SubMenu
              key="sub2"
              title={<span><Icon type="setting" /><span className="nav-text">直播功能</span></span>}
            >
              <Menu.Item key="5"><Link to={`/lives/${id}/menu1`}>菜单一</Link></Menu.Item>
              <Menu.Item key="6"><Link to={`/lives/${id}/menu2`}>菜单二</Link></Menu.Item>
              <Menu.Item key="7"><Link to={`/lives/${id}/menu3`}>菜单三</Link></Menu.Item>
              <Menu.Item key="8"><Link to={`/lives/${id}/menu4`}>菜单四</Link></Menu.Item>
              <Menu.Item key="9"><Link to={`/lives/${id}/announcement`}>滚动公告</Link></Menu.Item>
              <Menu.Item key="11"><Link to={`/lives/${id}/follow`}>关注</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="lock" /><span className="nav-text">直播权限</span></span>}
            >
              <Menu.Item key="2"><Link to={`/lives/${id}/limit`}>观看权限</Link></Menu.Item>
              <Menu.Item key="3"><Link to={`/lives/${id}/interactive`}>观众互动</Link></Menu.Item>
            </SubMenu>
            <Menu.Item className="ant-menu-submenu-title" key="10"><Icon type="video-camera" /><span className="nav-text"><Link to={`/lives/${id}/mode`}>直播方式</Link></span></Menu.Item>
          </Menu>}
          { sideType === 'showDashBoardMenu' && <div>
            <div className="btn-create text-center">
              <Link to="/select_template"><Button type="primary" size="large"><img src={videoImage} /> 创建直播</Button></Link>
            </div>
            <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
              <SubMenu
                key="sub1"
                title={<span><Icon type="team" /><span className="nav-text">活动管理</span></span>}
              >
                <Menu.Item key="1"><IndexLink to="/lives">我的直播</IndexLink></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="appstore" /><span className="nav-text">模板管理</span></span>}
              >
                <Menu.Item key="4"><Link to="/templates">我的模板</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/templates/components">模板组件</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={<span><Icon type="hdd" /><span className="nav-text">设备管理</span></span>}
              >
                <Menu.Item key="31"><Link to="/devices">我的设备</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={<span><Icon type="setting" /><span className="nav-text">用户管理</span></span>}
              >
                <Menu.Item key="41"><Link to="/user">用户中心</Link></Menu.Item>
                <Menu.Item key="42"><Link to="/user/safe">安全管理</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </div>}
        </div>
        <Content className="main-body">
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
