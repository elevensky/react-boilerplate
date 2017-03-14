import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Button, Row, Col, message, Form, Radio, Input, Icon, Tabs, Pagination } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import BreadCrumb from '../../components/BreadCrumb/';
import * as liveActions from 'redux/modules/live';
var imageUrl = require('./video_banne2.png');

@connect(
  (state) => ({ live: state.live.live }),
  liveActions)
export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showSide: true,
      mobileLiveUrl: 'http://kaikai.tv/watch/546163/watch/546163'
    };
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { value } = this.state;
    return (
      <div className="live-control wrap-box">
        <Helmet title="直播控制"/>
        <BreadCrumb active="control" />
        <div className="wrap-box-title bg-gray">
          <Row>
            <Col span="12">
              <span className="title">直播控制</span>
              <Button type="primary" className="mr20 pull-right" style={{marginTop: '15px'}}>开启直播</Button>
            </Col>
            <Col span="12"><span className="title ml20">聊天管理</span></Col>
          </Row>
        </div>
        <div className="wrap-box-body bg-white pd20" style={{position: 'relative'}}>
          <div className="vline"></div>
          <Row>
            <Col span="12">
              <div className="control-form">
                <div style={{width: '450'}}>
                  <h3 className="mb10">直播存储</h3>
                  <img src={imageUrl} width="330" height="160" style={{borderRadius: '10'}} alt="示例封面" />
                  <div className="clearfix" style={{width: '330'}}>
                    <span className="pull-left"><Radio>储存直播录像</Radio></span>
                    <span className="pull-right">
                      <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={0}>隐藏</Radio>
                        <Radio value={1}>公开</Radio>
                      </RadioGroup>
                    </span>
                  </div>
                  <div className="mt20">
                    <h3 className="mb10">手机推流地址</h3>
                    <Input style={{width: '240', marginRight: '20'}} onChange={this.handlePullStreamChange}/>
                    <CopyToClipboard text={this.state.mobileLiveUrl}
                          onCopy={() => { message.success('已复制到剪切板');}}
                        >
                      <Button>复制</Button>
                    </CopyToClipboard>
                    <div className="imageQR mt10">
                      <QRCode size={120} value={this.state.mobileLiveUrl} />
                    </div>
                  </div>
                  <div className="mt20 third-push">
                    <h3 className="mb10">推流至第三方</h3>
                    <div className="third-push-hd clearfix">
                      <span className="status pull-left"></span>
                      <span className="pull-left" style={{width: '100'}}>名称</span>
                      <span className="pull-left" style={{width: '200'}}>推流地址</span>
                    </div>
                    <div className="third-push-item">
                      <span className="status pull-left"></span>
                      <Input style={{width: '80', marginRight: '20'}} onChange={this.handlePullStreamChange}/>
                      <Input style={{width: '220', marginRight: '20'}} onChange={this.handlePullStreamChange}/>
                      <Button type="primary">开始推流</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="12">
              <div className="pl20">
                <Tabs defaultActiveKey="2" animated={false}>
                  <TabPane tab="聊天" key="1">
                    <div className="control-message">
                      <a className="control-message-item" href="javascirpt:;">
                        <span className="avatar pull-left">
                          <img src="http://tva4.sinaimg.cn/crop.0.0.720.720.180/66ad3793jw8erw3gje22lj20k00k03zq.jpg" alt="" />
                        </span>
                        <div className="head clearfix">
                          <span className="name pull-left">大阪城的姑娘</span>
                          <span className="pull-right f12">
                            <span className="kick ml20">踢出房间</span>
                            <span className="forbid ml20">禁言</span>
                            <span className="delete ml20">删除</span>
                          </span>
                        </div>
                        <p className="body">前几次我的技术那几款按时参加你数据库驾驶舱不君</p>
                        <div className="date mt10 clearfix">
                          <span className="pull-right">2018-02-11  13:52</span>
                        </div>
                      </a>
                    </div>
                    <div className="pd20 control-message-send" style={{ paddingRight: '100'}}>
                      <Input size="large" onChange={this.handlePullStreamChange} placeholder="我也要说两句" />
                      <Button type="primary" size="large" className="pull-right" style={{marginRight: '-70'}}>发送</Button>
                    </div>
                  </TabPane>
                  <TabPane tab="成员" key="2">
                    <div className="control-members mb20 clearfix">
                      <div className="members-item-wrapper">
                        <div className="members-item">
                          <span className="avatar40 pull-left">
                            <img src="http://tva4.sinaimg.cn/crop.0.0.720.720.180/66ad3793jw8erw3gje22lj20k00k03zq.jpg" alt="" />
                          </span>
                          <p className="name">大阪城的姑娘</p>
                          <p className="actions mt5">
                            <a className="kick">踢出房间</a>
                            <a className="forbid ml10">禁言</a>
                          </p>
                        </div>
                      </div>
                      <div className="members-item-wrapper">
                        <div className="members-item">
                          <span className="avatar40 pull-left">
                            <img src="http://tva4.sinaimg.cn/crop.0.0.720.720.180/66ad3793jw8erw3gje22lj20k00k03zq.jpg" alt="" />
                          </span>
                          <p className="name">大阪城的姑娘</p>
                          <p className="actions mt5">
                            <a className="kick">踢出房间</a>
                            <a className="forbid ml10">禁言</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix">
                      <Pagination className="pull-right" defaultCurrent={1} total={50} />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
        <div className="toggle" onClick={(e) => this.setState({showSide: !this.state.showSide})}>{this.state.showSide ? <span>收<br/>起</span> : <span>展<br/>开</span>}</div>
        <div className={this.state.showSide ? 'extendbar-wrapper' : 'extendbar-wrapper hidden'}>
          <div className="extendbar">
            <p className="title pl20 pr20">PC观看地址 :</p>
            <p className="address pd20">http://kaikai.tv/29657watch/546163/wasdsd</p>
            <p className="text-center">
              <CopyToClipboard text={this.state.mobileLiveUrl}
                onCopy={() => { message.success('已复制到剪切板');}}
              >
                <Button>复制</Button>
              </CopyToClipboard>
            </p>
            <hr className="hr-normal mt20" />
            <p className="title pl20 pr20 mt20">手机观看地址 :</p>
            <p className="text-center mt10 qrimage"><QRCode size={85} value={this.state.mobileLiveUrl} /></p>
            <p className="text-center mt10">
              <CopyToClipboard text={this.state.mobileLiveUrl}
                onCopy={() => { message.success('已复制到剪切板');}}
              >
                <Button>复制</Button>
              </CopyToClipboard>
              <Button style={{marginLeft: '10'}}>分享</Button>
            </p>
            <hr className="hr-normal mt20" />
            <p className="title pl20 pr20 mt20">直播数据</p>
            <p className="mt5 pl20">在线观众： <span>115</span></p>
            <p className="mt5 pl20">观看次数： <span>9985</span></p>
            <p className="mt5 pl20">直播时长： <span>115</span></p>
            <p className="mt5 pl20">网络流量： <span>9985</span></p>
            <p className="mt5 pl20">收益情况： <span>115</span></p>
            <p className="text-center mt10"><Link to="/live/statistics">查看详情 >></Link></p>
          </div>
        </div>
      </div>
    );
  }
}
