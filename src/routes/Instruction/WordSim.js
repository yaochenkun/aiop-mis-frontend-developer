import React from 'react';
import { connect } from 'dva';
import { Icon, Form, Input, Button, Row, Col } from 'antd';
import RequestBasicTable from './../../components/InstructionTable/RequestBasicTable';
import RequestBodyTable from './../../components/InstructionTable/RequestBodyTable';
import ResponseBodyTable from './../../components/InstructionTable/ResponseBodyTable';
import CodeBlock from './../../components/CodeBlock';

// 请求头部、方法
const requestBasicData = [{
  param: 'URL',
  value: 'http://aiop.bupt.com/restapi/nlp/v1/word_sim',
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
  param: 'text1',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '短文本1（GBK编码的URL编码形式）',
}, {
  param: 'text2',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '短文本2（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text1": "发明",
    "text2": "创作"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'score',
  type: 'float',
  description: '相似度得分。若短文本无法匹配则返回-1',
}, {
  param: 'words',
  type: 'array',
  description: '原始短文本数组',
}, {
  param: 'word_1',
  type: 'string',
  description: '短文本1',
}, {
  param: 'word_2',
  type: 'string',
  description: '短文本2',
}];

// 返回示例代码
const responseCodeData = `{
    "score": 0.92191726,
    "words": {
        "word_1": "发明",
        "word_2": "创作"
    }
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class WordSim extends React.Component {
  // 清空调用结果框中内容
  componentWillUnmount = () => {
    this.props.dispatch({ type: 'instruction/changeResult', payload: '' });
  }

  // 请求调用能力的api
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({ type: 'instruction/invokeWordSim', payload: values });
        }
      }
    );
  }

  render() {
    const { instruction } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };
    return (
      <div>
        <h1>短文本相似度计算</h1>

        <h2>接口描述</h2>
        <p>判断两个短文本的相似度得分。</p>

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

        <Row gutter={16}>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="短文本1" {...formItemLayout}>
                {getFieldDecorator('text1', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="短文本2" {...formItemLayout}>
                {getFieldDecorator('text2', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button type="primary" htmlType="submit" loading={instruction.submitting}>提交</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form.Item label="调用结果" {...formItemLayout}>
              <Input.TextArea rows={6} style={{ resize: 'none' }} value={JSON.stringify(instruction.result)} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
  }
}
