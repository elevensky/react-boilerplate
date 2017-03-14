import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Layout } from 'antd';
const { Header, Content } = Layout;

import './App.less';
import './NoLoginLayOut.less';

export default class Dashboard extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const logoImage = require('../../components/Header/logo.svg');
    return (
      <Layout className="nologin">
        <Header style={{background: 'none'}}>
          <Link className="mt10 pull-left" to="/"><img src={logoImage} alt="logo" /></Link>
          <div className="pull-right f14">
            <Link className="col-white" to="/login">登陆</Link>
            <span className="col-white mr10 ml10">|</span>
            <Link className="col-white" to="/register">注册</Link>
          </div>
        </Header>
        <Content style={{ margin: '0 16px', minHeight: '600px' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
