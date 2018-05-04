import React from 'react';
import { connect } from 'dva';
import { Icon, Form, Input, Button, Row, Col, Upload, message } from 'antd';
import styles from './style.less';
import RequestBasicTable from './../../components/InstructionTable/RequestBasicTable';
import RequestBodyTable from './../../components/InstructionTable/RequestBodyTable';
import ResponseBodyTable from './../../components/InstructionTable/ResponseBodyTable';
import CodeBlock from './../../components/CodeBlock';

// 请求头部、方法
const requestBasicData = [{
  param: 'URL',
  value: 'http://aiop.bupt.com/restapi/image/v1/face_sim',
}, {
  param: 'Method',
  value: 'POST',
}, {
  param: 'Content-Type',
  value: 'application/json',
}, {
  param: 'access_token',
  value: <span>通过API Key和Secret Key获取的access_token，参考<a href="/instruction/access-token">令牌获取</a></span>,
}];

// 请求参数实体
const requestBodyData = [{
  param: 'face1',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '人脸图像1（Base64编码形式）',
}, {
  param: 'face2',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '人脸图像2（Base64编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "face1": "iVBORw0KGgoAAAANSUh...+sUq/j8Uf/0z6s8T6AAAAABJRU5ErkJggg==",
    "face2": "/9j/4AAQSkZJRgABAQE...8Nvurrd4SpGuO3gBMJO854GEzcQeVA//2Q=="
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'score',
  type: 'float',
  description: '相似度得分。若人脸图像无法匹配则返回-1',
}];

// 返回示例代码
const responseCodeData = `{
    "score": 0.92191726,
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class FaceSim extends React.Component {
  state = {
    loading: false,
    imageUrl1: undefined,
    imageUrl2: undefined,
  };

  // 清空调用结果框中内容
  componentWillUnmount = () => {
    this.props.dispatch({ type: 'instruction/changeResult', payload: '' });
  }

  // 请求调用能力的api
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err) => {
        if (!err) {
          const pureFace1 = this.pureBase64(this.state.imageUrl1);
          const pureFace2 = this.pureBase64(this.state.imageUrl2);
          this.props.dispatch({ type: 'instruction/invokeFaceSim', payload: { face1: pureFace1, face2: pureFace2 } });
        }
      }
    );
  }

  /**
  * 图片上传相关
  */
  pureBase64 = (mixedBase64) => {
    return mixedBase64.split(',')[1];
  }

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
  handleChangeImage1 = (info) => {
    this.getBase64(info.file.originFileObj, imageUrl1 => this.setState({ imageUrl1 }));
  }

  handleChangeImage2 = (info) => {
    this.getBase64(info.file.originFileObj, imageUrl2 => this.setState({ imageUrl2 }));
  }

  render() {
    const { instruction } = this.props;
    const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
    return (
      <div>
        <h1>人脸相似度计算</h1>

        <h2>接口描述</h2>
        <p>判断两个人脸图像的相似度得分。</p>

        <h2>请求说明</h2>
        <h3>请求描述</h3>
        <RequestBasicTable data={requestBasicData} />

        <h3>请求参数</h3>
        <RequestBodyTable data={requestBodyData} />

        <h3>请求示例</h3>
        <CodeBlock data={requestCodeData} />

        <h2>返回说明</h2>
        <h3>返回参数</h3>
        <ResponseBodyTable data={responseBodyData} />

        <h3>返回示例</h3>
        <CodeBlock data={responseCodeData} />

        <h2>调用测试</h2>

        <Row gutter={10}>
          <Col span={5}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="人脸图像1" {...formItemLayout}>
                <Upload
                  name="file"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChangeImage1}
                >
                  {this.state.imageUrl1 ? <img src={this.state.imageUrl1} alt="" className={styles.imageView} /> : <div className={styles.imageView}><Icon type={this.state.loading ? 'loading' : 'plus'} /></div>}
                </Upload>
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button type="primary" htmlType="submit" loading={instruction.submitting}>提交</Button>
              </Form.Item>
            </Form>
          </Col>

          <Col span={5}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="人脸图像2" {...formItemLayout}>
                <Upload
                  name="file"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChangeImage2}
                >
                  {this.state.imageUrl2 ? <img src={this.state.imageUrl2} alt="" className={styles.imageView} /> : <div className={styles.imageView}><Icon type={this.state.loading ? 'loading' : 'plus'} /></div>}
                </Upload>
              </Form.Item>
            </Form>
          </Col>
          <Col span={14}>
            <Form.Item label="调用结果" {...formItemLayout}>
              <Input.TextArea rows={6} style={{ resize: 'none' }} value={JSON.stringify(instruction.result)} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
  }
}
