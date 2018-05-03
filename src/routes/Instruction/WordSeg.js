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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/word_seg',
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
  description: '待分词的文本（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '被分词的原始文本',
}, {
  param: 'items',
  type: 'array',
  description: '分词后的词块数组',
}, {
  param: 'seg',
  type: 'string',
  description: '词块',
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
            "seg": "今天"
        },
        {
            "byteLen": 2,
            "byteOffset": 2,
            "seg": "李华"
        },
        {
            "byteLen": 1,
            "byteOffset": 4,
            "seg": "到"
        },
        {
            "byteLen": 2,
            "byteOffset": 5,
            "seg": "学校"
        },
        {
            "byteLen": 1,
            "byteOffset": 7,
            "seg": "旁"
        },
        {
            "byteLen": 1,
            "byteOffset": 8,
            "seg": "的"
        },
        {
            "byteLen": 2,
            "byteOffset": 9,
            "seg": "咖啡"
        },
        {
            "byteLen": 1,
            "byteOffset": 11,
            "seg": "厅"
        },
        {
            "byteLen": 1,
            "byteOffset": 12,
            "seg": "喝"
        },
        {
            "byteLen": 1,
            "byteOffset": 13,
            "seg": "了"
        },
        {
            "byteLen": 1,
            "byteOffset": 14,
            "seg": "两"
        },
        {
            "byteLen": 1,
            "byteOffset": 15,
            "seg": "杯"
        },
        {
            "byteLen": 2,
            "byteOffset": 16,
            "seg": "咖啡"
        }
    ]
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class WordSeg extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeWordSeg', payload: values });
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
        <h1>中文分词</h1>

        <h2>接口描述</h2>
        <p>分词接口提供基本词和混排两种粒度的分词结果，基本词粒度较小，适用于搜索引擎等需要更多召回的任务，而混排粒度倾向于保留更多的短语。</p>

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
