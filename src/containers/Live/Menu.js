import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Editor from 'react-umeditor';
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

import * as liveActions from 'redux/modules/live';
import BreadCrumb from '../../components/BreadCrumb/';
const imageMenu1 = require('./menu1.png');
const imageMenu2 = require('./menu2.png');
const imageMenu3 = require('./menu3.png');
const imageMenu4 = require('./menu4.png');

const options = [
  { label: '土豪榜', value: 'rich' },
  { label: '手气榜', value: 'lucky' },
  { label: '分享榜', value: 'share' },
];
const defaultCheckedList = ['rich', 'lucky', 'share'];

function getIcons() {
  return [ 'source | undo redo | bold italic underline strikethrough fontborder | ', 'paragraph fontfamily fontsize | ', 'forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ', 'cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ', 'horizontal date time  | image | inserttable'];
}

// 注意上传接口的返回值，应该是 {'data': {'image_src': xxx} , 'status':'success'}
function getDefaultUploader() {
  return {
    url: '/api/upload',
    name: 'file',
    request: 'url',
  };
}

@connect(
  (state, ownProps) => ({ type: ownProps.params.type, }),
  { liveActions }
)
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  handleTitleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      title: e.target.value
    });
  }
  onTabsChange = (e) => {
    console.log(e.target.value);
    this.setState({
      title: e.target.value
    });
  }
  handleEditorChange = (e) => {
    const type = this.props.type;
    if (type === 'menu2' || type === 'menu4') return;
    var content = this.refs.editor.getContent();
    this.setState({
      content: content
    });
    console.log(e);
  }
  componentDidMount() {
    console.log(this.props.type);
  }
  render() {
    const plugins = { image: { uploader: getDefaultUploader() }};
    const type = this.props.type;
    return (
      <div className="live-menu wrap-box">
        <Helmet title="菜单设置-创建直播"/>
        <BreadCrumb />
        <div className="wrap-box-title bg-gray">
          <span className="title">菜单设置</span>
        </div>
        <div className="wrap-box-body bg-white clearfix pd20">
          <div className="clearfix mb20">
            <div className="menu-box-left pull-left" style={{width: '600px'}}>
              <FormItem
                label="标题"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 8 }}
                required
              >
                  <Input onChange={this.handleTitleChange}/>
              </FormItem>
              {(type === 'menu2' || type === 'menu4') && <FormItem
                label="内容"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                required
              >
                <Editor
                  ref="editor"
                  icons={getIcons()}
                  defaultValue="<p>请输入菜单内容</p>"
                  plugins={plugins}
                  onChange={this.handleEditorChange}
                  value={this.state.content}/>
              </FormItem>}
              {type === 'menu3' && <FormItem
                wrapperCol={{ span: 6, offset: 3 }}
              >
                <CheckboxGroup className="vertical-checkbox" options={options} onChange={this.onTabsChange} />
              </FormItem>}
            </div>
            <img src={imageMenu1} className="pull-left" alt="示例图片" />
          </div>
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
