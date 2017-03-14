import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { DatePicker, Form, Select, Input, Icon, Button, Upload, Row, Col, message } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('只能上传JPG 文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('文件必须小于 2MB!');
  }
  return isJPG && isLt2M;
}

class BaseForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    };
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const imageUrl = this.state.imageUrl;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} style={{maxWidth: '600px'}}>
        <FormItem
          label="标题"
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="封面"
          {...formItemLayout}
          extra="建议尺寸：160*90px, 图片格式：jpg/png, 文件大小：2M以内"
        >
          {getFieldDecorator('cover', {
            rules: [{ required: true, message: '请上传封面图片!' }],
            onChange: this.handleSelectChange,
          })(
            <Upload
              className="image-uploader"
              name="cover"
              showUploadList={false}
              action="/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {
                imageUrl ?
                  <img src={imageUrl} alt="" className="cover" /> :
                  <Icon type="plus" className="image-uploader-trigger" />
              }
            </Upload>
          )}
        </FormItem>
        <FormItem
          label="活动地点"
          {...formItemLayout}
        >
          {getFieldDecorator('address')(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="直播时间"
          {...formItemLayout}
          required
        >
          <Row>
            <Col span="11">
              <FormItem>
                {getFieldDecorator('start-date-time', {
                  rules: [{ type: 'object', required: true, message: '请选择直播时间！' }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
            </Col>
            <Col span="2" className="text-center" style={{textIndent: '-5px'}}>至</Col>
            <Col span="11">
              <FormItem>
                {getFieldDecorator('end-time-picker', {
                  rules: [{ type: 'object', required: true, message: '请选择结束时间！' }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          wrapperCol={{span: 12, offset: 6}}
        >
          <Button size="large" type="primary" htmlType="submit">
            创建活动
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(BaseForm);
