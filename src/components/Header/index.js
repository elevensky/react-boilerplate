import React, { Component } from 'react';
import { Menu, Icon, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// import RetinaImage from 'react-retina-image';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
    };
  }

  handleClick(event) {
    console.log('click ', event);
    this.setState({
      current: event.key,
    });
  }

  render() {
    return (
      <div className="header">
        <Row>
          <Col span="3">
            <a className="alpha dark" href="/" style={{ padding: 0 }}>logo</a>
          </Col>
          <Col span="18">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ lineHeight: '62px' }}
            >
              <Menu.Item key="mail">
                <Icon type="mail" />示例导航1
              </Menu.Item>
              <Menu.Item key="app" disabled>
                <Icon type="appstore" />示例导航2
              </Menu.Item>
              <SubMenu title={<span><Icon type="setting" />示例导航1 - 子导航</span>}>
                <MenuItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            </Menu>
          </Col>
          <Col span="3">
            some
          </Col>
        </Row>
      </div>
    );
  }
}
