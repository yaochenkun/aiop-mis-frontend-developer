import React, { PureComponent } from 'react';
import { Modal, Upload, Icon, message } from 'antd';
import styles from './index.less';

export default class UploadPictureModal extends PureComponent {
  state = {
    loading: false,
    imageUrl: undefined,
  };

  // 图片编码
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 上传校验
  beforeUpload = (file) => {
    const isPic = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
    if (!isPic) {
      message.error('只能上传后缀为jpg、jpeg、png和svg的图片文件!', 2);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB!', 2);
    }
    return isPic && isLt2M;
  }

  // 上传状态改变
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      message.success('上传成功');

      // 刷新界面操作
      this.props.invalidate();
    }
  }

  render() {
    const uploadButton = (
      <div className={styles.imageView}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    );
    const { params } = this.props;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <Upload
          name="file"
          listType="picture-card"
          showUploadList={false}
          data={{ id: params.id }}
          headers={{ token: params.token }}
          action={params.url}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" className={styles.imageView} /> : uploadButton}
        </Upload>
      </Modal>
    );
  }
}
