import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Upload, Icon, message } from 'antd';

import BreadCrumb from '../../components/BreadCrumb/';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default class Interactive extends Component {
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

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <div className="create-lives wrap-box">
        <Helmet title="关注设置-创建直播"/>
        <BreadCrumb />
        <div className="wrap-box-title bg-gray">
          <span className="title">关注</span>
        </div>
        <div className="wrap-box-body bg-white pd20">
          <p>视频下方的关注按钮，请上传个人或公众号二维码</p>
          <div className="follow-form mt20 clearfix">
            <Upload
              className="image-uploader image-qr pull-left"
              name="qr"
              showUploadList={false}
              action="/upload.do"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {
                imageUrl ?
                  <img src={imageUrl} alt="" className="image" /> :
                  <Icon type="plus" className="image-uploader-trigger" />
              }
            </Upload>
            <p className="cf-note ml20 f12 pull-left" style={{marginTop: '80px'}}>建议尺寸：160*90px <br /> 图片格式：jpg/png <br />文件大小：2M以内</p>
          </div>
        </div>
      </div>
    );
  }
}
