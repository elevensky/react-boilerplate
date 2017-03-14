import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Button, Table, Input, Icon, Tabs, DatePicker } from 'antd';

const TabPane = Tabs.TabPane;
import BreadCrumb from '../../components/BreadCrumb/';
import * as liveActions from 'redux/modules/live';

const columns = [{
  title: '直播标题',
  className: 'text-center',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '直播时间',
  className: 'text-center',
  dataIndex: 'time',
  key: 'time',
  render: (text, record) => {
    return <div><span>{record.start_time}</span><span className="ml5 mr5">至</span>{record.end_time}</div>;
  }
}, {
  title: '直播地点',
  className: 'text-center',
  dataIndex: 'address',
  key: 'address',
}];

const columns2 = [{
  title: '观看总时长',
  className: 'text-center',
  dataIndex: 'watch_times',
  key: 'watch_times',
  render: (text) => {
    return <span>{text} 分钟</span>;
  }
}, {
  title: '最高并发数',
  className: 'text-center',
  dataIndex: 'highest_peak',
  key: 'highest_peak',
  render: (text) => {
    return <span>{text} G</span>;
  }
}, {
  title: '存储时长',
  className: 'text-center',
  dataIndex: 'storage_time',
  key: 'storage_time',
  render: (text) => {
    return <span>{text} 分钟</span>;
  }
}, {
  title: '观看总次数',
  className: 'text-center',
  dataIndex: 'watch_nums',
  key: 'watch_nums',
  render: (text) => {
    return <span>{text} 次</span>;
  }
}, {
  title: '评论数',
  className: 'text-center',
  dataIndex: 'comment',
  key: 'comment',
  render: (text) => {
    return <span>{text} 次</span>;
  }
}, {
  title: '红包数量',
  className: 'text-center',
  dataIndex: 'redbag',
  key: 'redbag',
  render: (text) => {
    return <span>{text} 个</span>;
  }
}, {
  title: '红包金额',
  className: 'text-center',
  dataIndex: 'redbag_sum',
  key: 'redbag_sum',
  render: (text) => {
    return <span>{text} 元</span>;
  }
}, {
  title: '打赏数量',
  className: 'text-center',
  dataIndex: 'play',
  key: 'play',
  render: (text) => {
    return <span>{text} 个</span>;
  }
}, {
  title: '打赏金额',
  className: 'text-center',
  dataIndex: 'play_sum',
  key: 'play_sum',
  render: (text) => {
    return <span>{text} 元</span>;
  }
}];

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
      <div className="live-statistics wrap-box">
        <Helmet title="数据统计"/>
        <BreadCrumb active="statistics" />
        <div className="wrap-box-title bg-gray">
          <span className="title">数据统计</span>
        </div>
        <div className="wrap-box-body bg-white pd20">
          <div className="clearfix"></div>
          <Table dataSource={dataSource} columns={columns} pagination={false}/>
          <Table style={{marginTop: '40px'}} dataSource={dataSource2} columns={columns2} pagination={false}/>
          <Tabs style={{marginTop: '40px'}} type="card" tabBarExtraContent={this.genSearchBar()}>
            <TabPane tab="红包" key="1">
              <Table dataSource={dataSource3} columns={columns3}/>
            </TabPane>
            <TabPane tab="打赏" key="2">
              <Table dataSource={dataSource3} columns={columns3}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
