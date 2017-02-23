import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import HeaderElement from '../../components/Header';
import './App.less';

@connect(
  null,
  { pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        <Header>
          <HeaderElement />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {this.props.children}
        </Content>
        <Footer className="footer text-center">
          <p>&copy; {new Date().getFullYear()} 公司名称・浙ICP备16029273号-1・联系我们：400-0820-145</p>
        </Footer>
      </div>
    );
  }
}
