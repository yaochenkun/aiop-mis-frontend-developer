import React from 'react';
import { connect } from 'dva';
import { Icon, Form, Input, Button, Row, Col, InputNumber } from 'antd';
import RequestBasicTable from './../../components/InstructionTable/RequestBasicTable';
import RequestBodyTable from './../../components/InstructionTable/RequestBodyTable';
import ResponseBodyTable from './../../components/InstructionTable/ResponseBodyTable';
import CodeBlock from './../../components/CodeBlock';

// 请求头部、方法
const requestBasicData = [{
  param: 'URL',
  value: 'http://aiop.bupt.com/restapi/nlp/v1/text_suggester',
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
  param: 'text',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '待对比的基准句子（GBK编码的URL编码形式）',
}, {
  param: 'sentences',
  type: 'array',
  mandatory: <Icon type="check" />,
  description: '待推荐的句子集合（GBK编码的URL编码形式）',
}, {
  param: 'size',
  type: 'int',
  mandatory: <Icon type="close" />,
  description: '希望推荐的句子个数（默认为3）',
}];

// 请求示例代码
const requestCodeData = `{
    "sentences": [
        "咖啡是一种可以提神的饮料",
        "今天李华的学校来了许多教育工作者",
        "张红每天晚上都会抽时间去咖啡厅喝咖啡"
    ],
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡",
    "size": 2
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '原始基准句子',
}, {
  param: 'suggester',
  type: 'array',
  description: '被推荐的句子集合',
}];

// 返回示例代码
const responseCodeData = `{
    "suggester": [
        "张红每天晚上都会抽时间去咖啡厅喝咖啡",
        "咖啡是一种可以提神的饮料"
    ],
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡"
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class TextKeywords extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeTextSuggester', payload: { ...values, sentences: [values.sentence1, values.sentence2, values.sentence3] } });
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
        <h1>文本推荐</h1>

        <h2>接口描述</h2>
        <p>从给定的一系列句子中对比出与输入句子最相似的句子。</p>

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
              <Form.Item label="输入基准文本" {...formItemLayout}>
                {getFieldDecorator('text', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="输入待推荐句子1" {...formItemLayout}>
                {getFieldDecorator('sentence1', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="输入待推荐句子2" {...formItemLayout}>
                {getFieldDecorator('sentence2', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="输入待推荐句子3" {...formItemLayout}>
                {getFieldDecorator('sentence3', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="数量" {...formItemLayout}>
                {getFieldDecorator('size', { rules: [{ required: true, message: '请输入请求参数！' }], initialValue: 3 })(
                  <InputNumber size="large" min={0} precision={0} style={{ width: '100%' }} />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button type="primary" htmlType="submit" loading={instruction.submitting}>提交</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form.Item label="调用结果" {...formItemLayout}>
              <Input.TextArea rows={20} style={{ resize: 'none' }} value={JSON.stringify(instruction.result)} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
  }
}
