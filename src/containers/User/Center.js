import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Row, Col, Button, Table, Input, Icon, Tabs, DatePicker } from 'antd';

const TabPane = Tabs.TabPane;
import * as liveActions from 'redux/modules/live';
import './User.less';

const columns3 = [{
  title: '编号',
  className: 'text-center',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '用户',
  className: 'text-center',
  dataIndex: 'name',
  key: 'name',
  render: (text, record) => {
    return <div><span>{text}</span></div>;
  }
}, {
  title: '发送时间',
  className: 'text-center',
  dataIndex: 'send_time',
  key: 'send_time',
}, {
  title: '类别',
  className: 'text-center',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '余额',
  className: 'text-center',
  dataIndex: 'overage',
  key: 'overage',
}];

const dataSource = [{
  key: '1',
  title: '胡彦斌',
  start_time: '2017-4-20 18:20',
  end_time: '2017-4-20 22:20',
  address: '西湖区湖底公园1号'
}];

const dataSource2 = [{
  key: '1',
  watch_times: '280',
  highest_peak: '1.8',
  storage_time: '20',
  watch_nums: '4000',
  comment: '300',
  redbag: '20',
  redbag_sum: '30',
  play: '10',
  play_sum: '18',
}];

const dataSource3 = [{
  key: '1',
  id: '111280',
  name: '妖怪',
  highest_peak: '1.8',
  send_time: '2017-8-12 18:37',
  type: '1',
  overage: '300'
}];

@connect(
  (state) => ({ live: state.live.live }),
  liveActions)
export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      startTime: null,
      endTime: null,
      endOpen: false,
    };
  }
  genSearchBar = () => {
    const { startTime, endTime, endOpen } = this.state;
    return (<div>
      <DatePicker
        disabledDate={this.disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={startTime}
        placeholder="起始时间"
        onChange={this.onStartChange}
        onOpenChange={this.handleStartOpenChange}
      />
      <span className="mr5 ml5">至</span>
      <DatePicker
        disabledDate={this.disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endTime}
        placeholder="截止时间"
        onChange={this.onEndChange}
        open={endOpen}
        onOpenChange={this.handleEndOpenChange}
      />
      <Button className="ml10" style={{background: '#ffa668', borderColor: '#ffa668', color: '#FFF'}}>查询</Button>
    </div>);
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { value } = this.state;
    return (
      <div className="live-statistics user wrap-box">
        <Helmet title="用户中心"/>
        <div className="wrap-box-title">
          <span className="title">用户中心</span>
        </div>
        <div className="wrap-box-body bg-white pd20" style={{background: '#f4f6fb'}}>
          <div className="shadowbox bg-white box-shadow mt20 pd20 clearfix">
            <p>用户名： <span>1886666666</span></p>
            <p className="mt10">账户类型： <span>个人用户</span></p>
          </div>
          <Row className="mt20">
            <Col span="12">
              <div className="mr20 pd20 shadowbox bg-white box-shadow">
                <p>账户余额</p>
                <p className="mt10"><span style={{fontSize: '24px'}}>20000</span> 元</p>
              </div>
            </Col>
            <Col span="12">
              <div className="ml20 pd20 shadowbox bg-white box-shadow">
                <p>账户收益</p>
                <p className="mt10"><span style={{fontSize: '24px'}}>20000</span> 元</p>
              </div>
            </Col>
          </Row>
          <Tabs style={{marginTop: '40px'}} type="card" tabBarExtraContent={this.genSearchBar()}>
            <TabPane tab="消费记录" key="1">
              <Table dataSource={dataSource3} columns={columns3}/>
            </TabPane>
            <TabPane tab="充值记录" key="2">
              <Table dataSource={dataSource3} columns={columns3}/>
            </TabPane>
            <TabPane tab="收益记录" key="3">
              <Table dataSource={dataSource3} columns={columns3}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
