import React, { PureComponent } from 'react';
import { Modal, Upload, Icon, message } from 'antd';

export default class UploadPictureModal extends PureComponent {
  // 上传文件时的动作响应
  handleChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 'success') {
        message.success('上传成功');
      } else {
        message.error(info.file.response.reason);
      }
    }
  }

  render() {
    const { params } = this.props;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <Upload.Dragger
          name="file"
          multiple={false}
          data={{ id: params.id }}
          headers={{ token: params.token }}
          action={params.url}
          onChange={this.handleChange}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
        </Upload.Dragger>
      </Modal>
    );
  }
}
