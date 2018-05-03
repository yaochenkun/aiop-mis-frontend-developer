import React from 'react';
import { connect } from 'dva';
import { Icon, Form, Input, Button, Row, Col, Select } from 'antd';
import RequestBasicTable from './../../components/InstructionTable/RequestBasicTable';
import RequestBodyTable from './../../components/InstructionTable/RequestBodyTable';
import ResponseBodyTable from './../../components/InstructionTable/ResponseBodyTable';
import CodeBlock from './../../components/CodeBlock';

// 请求头部、方法
const requestBasicData = [{
  param: 'URL',
  value: 'http://aiop.bupt.com/restapi/nlp/v1/motion_classify',
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
  description: '待进行情感倾向分析的文本（GBK编码的URL编码形式）',
}, {
  param: 'class_num',
  type: 'int',
  mandatory: <Icon type="close" />,
  description: '情感分类类别数（默认为2）',
}];

// 请求示例代码
const requestCodeData = `{
  "text": "希望明天病情会好转",
  "class_num": 5
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '进行情感倾向分析的文本',
}, {
  param: 'items',
  type: 'array',
  description: '结果数组',
}, {
  param: 'negative_prob',
  type: 'float',
  description: '表示属于消极类别（二分类）的概率 ，取值范围[0,1]',
}, {
  param: 'positive_prob',
  type: 'float',
  description: '表示属于积极类别（二分类）的概率 ，取值范围[0,1]',
}, {
  param: '平静镇定',
  type: 'float',
  description: '表示属于平静镇定类别（五分类）的概率 ，取值范围[0,1]',
}, {
  param: '悲伤自责',
  type: 'float',
  description: '表示属于悲伤自责类别（五分类）的概率 ，取值范围[0,1]',
}, {
  param: '愉悦放松',
  type: 'float',
  description: '表示属于愉悦放松类别（五分类）的概率 ，取值范围[0,1]',
}, {
  param: '焦虑迷茫',
  type: 'float',
  description: '表示属于焦虑迷茫类别（五分类）的概率 ，取值范围[0,1]',
}, {
  param: '痛苦绝望',
  type: 'float',
  description: '表示属于痛苦绝望类别（五分类）的概率 ，取值范围[0,1]',
}, {
  param: 'sentiment',
  type: 'int',
  description: '表示情感极性分类结果所属种类（1：积极，2：消极）',
}, {
  param: 'sentiment_prob',
  type: 'float',
  description: '表示情感极性分类结果所属种类的概率',
}];

// 返回示例代码
const responseCodeData = `{
    "sentiment": "愉悦放松",
    "sentiment_prob": 0.590645801951989,
    "items": {
        "平静镇定": 0.12570316592709022,
        "悲伤自责": 0.12106210315333037,
        "愉悦放松": 0.590645801951989,
        "焦虑迷茫": 0.05342942152915127,
        "痛苦绝望": 0.10915950743843912
    }
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class MotionClassify extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeMotionClassify', payload: values });
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
        <h1>情感倾向分析</h1>

        <h2>接口描述</h2>
        <p>对包含主观观点信息的文本进行情感极性类别（积极、消极、中性）的判断，并给出相应的置信度。</p>

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
              <Form.Item label="输入文本" {...formItemLayout}>
                {getFieldDecorator('text', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input.TextArea rows={15} style={{ resize: 'none' }} />
                )}
              </Form.Item>
              <Form.Item label="选择分类类别数" {...formItemLayout}>
                {getFieldDecorator('class_num', { rules: [{ required: true, message: '请输入请求参数！' }], initialValue: 5 })(
                  <Select>
                    <Select.Option value={2}>2</Select.Option>
                    <Select.Option value={5}>5</Select.Option>
                  </Select>
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
