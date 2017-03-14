import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { Card, Icon, Modal, Row, Col, Checkbox, Input, Button } from 'antd';
import * as templateActions from 'redux/modules/template';
import './Templates.less';

const CheckboxGroup = Checkbox.Group;
const options1 = [
  { label: '标题', value: 'title' },
  { label: '封面', value: 'cover' },
  { label: '直播时间', value: 'time' },
  { label: '简介', value: 'introduction', disabled: false },
];

const options2 = [
  { label: '简介', value: 'rich' },
  { label: '榜单', value: 'rank' },
  { label: '自定义菜单', value: 'custom', disabled: false },
  { label: '滚动公告', value: 'announcement', disabled: false },
  { label: '关注', value: 'follow', disabled: false },
];

const options3 = [
  { label: '观众互动', value: 'interactive' },
  { label: '观看限制', value: 'limit' },
];

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(templateActions.getTemplates());
  }
}])
@connect(
  (state) => ({templates: state.template.templates}),
  { ...templateActions, push})
export default class Templates extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  state = { visible: false }
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
  selectTemplate(id) {
    const { router } = this.context;
    this.props.selectTemplate(id);
    router.push('/lives/new');
  }
  genTemplateList() {
    const templates = this.props.templates.toJS();
    return templates.map(item => (<a key={item.id} className="template-card-wrap type-default pull-left" href="javascript:;" onClick={() => this.selectTemplate(item.id)}>
        <Card title={item.name} className="template-list-card">
          <p>信息编辑 <br />标题、封面、地址、跑马灯</p>
          <p className="mt20">观众互动 <br />聊天列表、红包、打赏</p>
          <p className="mt20">菜单管理 <br />互动、简介、榜单、自定义菜单</p>
          <p className="mt20">直播功能 <br />观看限制</p>
          <div className="mask">
            <Icon type="check" className="check-box" />
          </div>
        </Card>
      </a>)
    );
  }
  render() {
    return (
      <div className="templates wrap-box">
        <Modal title="创建模板"
               visible={this.state.visible}
               onOk={this.handleOk}
               footer={null}
               width="620"
               onCancel={this.handleCancel}>
          <Row className="modal-components" data-initialized="true">
            <Col span="8">
              <h3 className="text-center select-head">信息编辑<span className="arrow-down"></span></h3>
              <div className="modal-components-selectbox">
                <CheckboxGroup disabled defaultValue={['title', 'cover', 'time']} className="vertical-checkbox" options={options1} onChange={this.onTabsChange} />
              </div>
            </Col>
            <Col span="8">
              <h3 className="text-center select-head">菜单管理<span className="arrow-down"></span></h3>
              <div className="modal-components-selectbox">
                <CheckboxGroup disabled defaultValue={['rich', 'rank']} className="vertical-checkbox" options={options2} onChange={this.onTabsChange} />
              </div>
            </Col>
            <Col span="8">
              <h3 className="text-center select-head">直播功能<span className="arrow-down"></span></h3>
              <div className="modal-components-selectbox">
                <CheckboxGroup disabled defaultValue={['interactive', 'limit']} className="vertical-checkbox" options={options3} onChange={this.onTabsChange} />
              </div>
            </Col>
          </Row>
          <div className="template-name clearfix">
              <span className="mr10 pull-left">模板名称： </span><span className="pull-left"><Input size="large" style={{width: '200'}} placeholder="请输入模板名称  " /></span>
          </div>
          <div className="text-center mt20">
            <Button size="large" type="primary">提交</Button>
          </div>
        </Modal>
        <Helmet title="我的模板"/>
        <div className="wrap-box-title bg-gray">
          <span className="title">我的模板</span>
        </div>
        <div className="wrap-box-body bg-white clearfix pd20" style={{paddingTop: '0'}}>
          {this.genTemplateList()}
          <div className="template-card-wrap type-create pull-left" href="javascript:;">
            <Card title="自定义模板" className="template-list-card">
              <div className="text-center" style={{cursor: 'pointer'}} onClick={e => { e.preventDefault(); this.setState({visible: true});}}><Icon type="plus" style={{fontSize: '32px', marginTop: '70px'}}/> <br /> <span className="mt20" style={{fontSize: '14px'}}>创建模板</span></div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
