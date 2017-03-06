import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as authActions from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), authActions)
export default class Header extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
    };
  }

  logout = async (e) => {
    e.preventDefault();
    const { router } = this.context;
    try {
      await this.props.logout();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const logoImage = require('./logo.svg');
    return (
      <div className="header clearfix">
        <div className="logo pull-left cf-white">
          <Link to="/"><img src={logoImage} alt="logo" /></Link>
        </div>
        <div className="user-bar pull-right mr20">
          <span className="cf-white">{this.props.user && this.props.user.name}</span>
          <span className="cf-white mr5 ml5"> | </span>
          <a className="cf-white" onClick={this.logout}>退出</a>
        </div>
      </div>
    );
  }
}
