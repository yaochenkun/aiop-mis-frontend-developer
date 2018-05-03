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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/word_ner',
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
  description: '待进行命名实体识别的文本（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "南普罗旺斯的古老小城阿尔勒（Arles），
             以热烈明亮的地中海阳光和时尚的艺术风格闻名。
             看过《梵高传》的人大概都会记得杰出的画家曾在这里创作、生活过。
             这里的街道、房屋、酒吧，国际摄影节，在石头古巷和小广场上，
             展览当今缔造潮流的大摄影师和风流人物。"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '进行命名实体识别的原始文本',
}, {
  param: 'items',
  type: 'array',
  description: '识别后的实体数组',
}, {
  param: 'word',
  type: 'string',
  description: '词块',
}, {
  param: 'ner',
  type: 'string',
  description: '识别出的实体种类',
}, {
  param: 'byteLen',
  type: 'int',
  description: '词块长度，以基本粒度词汇为单位',
}, {
  param: 'byteOffset',
  type: 'int',
  description: '词块在原始文本中的偏移量，以基本粒度词汇为单位',
}];

// 返回示例代码
const responseCodeData = `{
    "text": "南普罗旺斯的古老小城阿尔勒（Arles），
             以热烈明亮的地中海阳光和时尚的艺术风格闻名。
             看过《梵高传》的人大概都会记得杰出的画家曾在这里创作、生活过。
             这里的街道、房屋、酒吧，国际摄影节，在石头古巷和小广场上，
             展览当今缔造潮流的大摄影师和风流人物。",
    "items": [
        {
            "byteLen": 4,
            "byteOffset": 1,
            "ner": "place_name",
            "word": "普罗旺斯"
        },
        {
            "byteLen": 2,
            "byteOffset": 8,
            "ner": "person_name",
            "word": "小城"
        },
        {
            "byteLen": 3,
            "byteOffset": 10,
            "ner": "translate_name",
            "word": "阿尔勒"
        },
        {
            "byteLen": 3,
            "byteOffset": 27,
            "ner": "place_name",
            "word": "地中海"
        },
        {
            "byteLen": 2,
            "byteOffset": 46,
            "ner": "translate_name",
            "word": "梵高"
        },
        {
            "byteLen": 2,
            "byteOffset": 63,
            "ner": "person_name",
            "word": "曾在"
        },
        {
            "byteLen": 2,
            "byteOffset": 95,
            "ner": "person_name",
            "word": "古巷"
        },
        {
            "byteLen": 3,
            "byteOffset": 98,
            "ner": "org_name",
            "word": "小广场"
        }
    ]
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class WordNer extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeWordNer', payload: values });
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
        <h1>命名实体识别</h1>

        <h2>接口描述</h2>
        <p>识别文本中具有特定意义的实体，主要包括人名、地名、机构名、专有名词等。</p>

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
                  <Input.TextArea rows={20} style={{ resize: 'none' }} />
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
