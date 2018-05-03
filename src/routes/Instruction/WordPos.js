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
  value: '按照一般策略标注词性：http://aiop.bupt.com/restapi/nlp/v1/word_pos',
}, {
  param: 'URL',
  value: '按照机构名优先策略标注词性：http://aiop.bupt.com/restapi/nlp/v1/word_pos_organization',
}, {
  param: 'URL',
  value: '按照地名优先策略标注词性：http://aiop.bupt.com/restapi/nlp/v1/word_pos_place',
}, {
  param: 'URL',
  value: '按照日本人名优先策略标注词性：http://aiop.bupt.com/restapi/nlp/v1/word_pos_japanese',
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
  description: '待标注词性的文本串（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '被标注的原始文本',
}, {
  param: 'items',
  type: 'array',
  description: '标注后的词块数组',
}, {
  param: 'pos',
  type: 'string',
  description: '词块',
}, {
  param: 'nature',
  type: 'string',
  description: '词性',
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
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡",
    "items": [
        {
            "byteLen": 2,
            "byteOffset": 0,
            "nature": "t",
            "pos": "今天"
        },
        {
            "byteLen": 2,
            "byteOffset": 2,
            "nature": "nr",
            "pos": "李华"
        },
        {
            "byteLen": 1,
            "byteOffset": 4,
            "nature": "v",
            "pos": "到"
        },
        {
            "byteLen": 2,
            "byteOffset": 5,
            "nature": "n",
            "pos": "学校"
        },
        {
            "byteLen": 1,
            "byteOffset": 7,
            "nature": "f",
            "pos": "旁"
        },
        {
            "byteLen": 1,
            "byteOffset": 8,
            "nature": "uj",
            "pos": "的"
        },
        {
            "byteLen": 3,
            "byteOffset": 9,
            "nature": "nis",
            "pos": "咖啡厅"
        },
        {
            "byteLen": 1,
            "byteOffset": 12,
            "nature": "vg",
            "pos": "喝"
        },
        {
            "byteLen": 1,
            "byteOffset": 13,
            "nature": "ul",
            "pos": "了"
        },
        {
            "byteLen": 1,
            "byteOffset": 14,
            "nature": "m",
            "pos": "两"
        },
        {
            "byteLen": 1,
            "byteOffset": 15,
            "nature": "q",
            "pos": "杯"
        },
        {
            "byteLen": 2,
            "byteOffset": 16,
            "nature": "n",
            "pos": "咖啡"
        }
    ]
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class WordPos extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeWordPos', payload: values });
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
        <h1>词性标注</h1>

        <h2>接口描述</h2>
        <p>为分词结果中的每个单词标注词性，包括名词、动词、形容词或其他词性</p>

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
