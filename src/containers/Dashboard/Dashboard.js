import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import { Button, Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import config from '../../config';
import HeaderElement from '../../components/Header';
import './Dashboard.less';

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
        <Sider>
          <div className="logo text-center cf-white" style={{lineHeight: '64px'}}>
            <Link to="/">开开直播</Link>
          </div>
          <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}>
            <div className="btn-create text-center">
              <Button type="primary" size="large"><Icon type="video-camera" /> 创建直播</Button>
            </div>
            <SubMenu
              key="sub1"
              title={<span><Icon type="video-camera" /><span className="nav-text">活动管理</span></span>}
            >
              <Menu.Item key="1"><Link to="/">我的直播</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/">历史直播</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="bars" /><span className="nav-text">模板管理</span></span>}
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
              title={<span><Icon type="team" /><span className="nav-text">用户管理</span></span>}
            >
              <Menu.Item key="41"><Link to="/">用户中心</Link></Menu.Item>
              <Menu.Item key="42"><Link to="/">安全管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderElement />
          </Header>
          <Content style={{ margin: '0 16px', minHeight: '600px' }}>
            {this.props.children}
          </Content>
          <Footer className="footer text-center">
            <p>&copy; {new Date().getFullYear()} 公司名称・浙ICP备16029273号-1・联系我们：400-0820-145</p>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
