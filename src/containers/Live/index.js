import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, Modal, Table, Input, Icon } from 'antd';

import BaseForm from '../Live/LiveBase';
import BreadCrumb from '../../components/BreadCrumb/';
import { getTemplate } from 'redux/modules/template';
import './Live.less';

@connect(
  (state, ownProps) => ({ selectId: state.template.selectId, params: ownProps.params }),
  {getTemplate, push}
)
export default class New extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillMount() {
    const selectId = this.props.selectId;
    this.props.getTemplate(selectId);
  }
  render() {
    const { id } = this.props.params;
    return (
      <div className="create-lives wrap-box">
        <Helmet title="创建直播"/>
        {id && <BreadCrumb />}
        <div className="wrap-box-title bg-gray">
          <span className="title">基本信息</span>
        </div>
        <div className="wrap-box-body bg-white pd20">
          <BaseForm />
        </div>
      </div>
    );
  }
}
