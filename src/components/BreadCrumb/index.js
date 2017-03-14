import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Button } from 'antd';

const ButtonGroup = Button.Group;

const BreadCrumb = (props) => {
  const active = props.active ? props.active : 'edit';
  return (
    <div id="breadcrumb" className="mb10">
      <Breadcrumb separator=">" className="pull-left">
        <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
      </Breadcrumb>
      <ButtonGroup className="pull-right">
        <Button size="large" type={active === 'control' ? 'primary' : ''}><Link to="/live/control">直播控制</Link></Button>
        <Button size="large" type={active === 'edit' ? 'primary' : ''}><Link to="/live/base">活动信息</Link></Button>
        <Button size="large" type={active === 'statistics' ? 'primary' : ''}><Link to="/live/statistics">数据统计</Link></Button>
      </ButtonGroup>
    </div>
  );
};

export default BreadCrumb;
