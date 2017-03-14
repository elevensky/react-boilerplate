import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { Button, Tabs, Select, Form, Input, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import * as liveActions from 'redux/modules/live';

@connect(
  (state) => ({ live: state.live.live }),
  liveActions)
export default class LiveWay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveMode: '',
      pullStreamUrl: '',
      desktopLiveUrl: '',
      mobileLiveUrl: ''
    };
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    return (
      <div className="my-lives wrap-box">
        <div className="wrap-box-title">
          <span className="title">直播方式</span>
        </div>
        <div className="wrap-box-body bg-white clearfix pd20">
          <Tabs type="card" animated={false}>
            <TabPane tab="专业设备直播" key="1">
              <div className="pd20">
                <p className="mb20" style={{margin: '30px 0'}}>请选择直播设备</p>
                <Select defaultValue="pushstream" style={{ width: 120 }} onChange={this.handleChange}>
                  <Option value="pushstream">推流直播</Option>
                  <Option value="camera">摄影机</Option>
                </Select>
              </div>
            </TabPane>
            <TabPane tab="拉流直播" key="2">
              <div className="pd20">
                <Form layout="vertical">
                  <FormItem
                  label="请输入拉流地址"
                  >
                    <Input style={{width: '320'}} onChange={this.handlePullStreamChange}/>
                  </FormItem>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="桌面直播" key="3">
              <div className="pd20">
                <Form layout="vertical">
                  <FormItem
                  label="请在直播工具中输入以下推流地址"
                  >
                    <Input style={{width: '320', marginRight: '10'}} onChange={(e) => { this.setState({desktopLiveUrl: e.target.value}); }}/>
                    <CopyToClipboard text={this.state.desktopLiveUrl}
                      onCopy={() => { message.success('已复制到剪切板');}}
                    >
                      <Button>复制</Button>
                    </CopyToClipboard>
                  </FormItem>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="手机直播" key="4">
              <div className="pd20">
                <Form layout="vertical">
                  <FormItem
                  label="请在直播工具中输入以下推流地址"
                  >
                   <Input style={{width: '320', marginRight: '10'}} onChange={(e) => { this.setState({mobileLiveUrl: e.target.value}); }}/>
                    <CopyToClipboard text={this.state.mobileLiveUrl}
                      onCopy={() => { message.success('已复制到剪切板');}}
                    >
                      <Button>复制</Button>
                    </CopyToClipboard>
                  </FormItem>
                </Form>
              </div>
            </TabPane>
          </Tabs>
          <hr className="hr-normal mt20 mb20" />
          <p className="text-center">
            <Button size="large" type="primary" htmlType="submit" onClick={this.handleSubmit}>
              提交
            </Button>
          </p>
        </div>
      </div>
    );
  }
}
