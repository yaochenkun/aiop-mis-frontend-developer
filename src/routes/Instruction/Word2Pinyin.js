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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/word_2_pinyin',
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
  description: '待转换成拼音的汉字文本（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '被转换的原始汉字文本',
}, {
  param: 'items',
  type: 'array',
  description: '汉字数组',
}, {
  param: 'word',
  type: 'string',
  description: '汉字',
}, {
  param: 'pinyin',
  type: 'string',
  description: '全拼',
}, {
  param: 'shenMu',
  type: 'string',
  description: '声母',
}, {
  param: 'tone',
  type: 'int',
  description: '声调（包含：1、2、3、4）',
}, {
  param: 'yunMu',
  type: 'string',
  description: '韵母',
}];

// 返回示例代码
const responseCodeData = `{
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡",
    "items": [
        {
            "pinyin": "jin",
            "shenMu": "j",
            "tone": 1,
            "word": "今",
            "yunMu": "in"
        },
        {
            "pinyin": "tian",
            "shenMu": "t",
            "tone": 1,
            "word": "天",
            "yunMu": "ian"
        },
        {
            "pinyin": "li",
            "shenMu": "l",
            "tone": 3,
            "word": "李",
            "yunMu": "i"
        },
        {
            "pinyin": "hua",
            "shenMu": "h",
            "tone": 2,
            "word": "华",
            "yunMu": "ua"
        },
        {
            "pinyin": "dao",
            "shenMu": "d",
            "tone": 4,
            "word": "到",
            "yunMu": "ao"
        },
        {
            "pinyin": "xue",
            "shenMu": "x",
            "tone": 2,
            "word": "学",
            "yunMu": "ue"
        },
        {
            "pinyin": "xiao",
            "shenMu": "x",
            "tone": 4,
            "word": "校",
            "yunMu": "iao"
        },
        {
            "pinyin": "pang",
            "shenMu": "p",
            "tone": 2,
            "word": "旁",
            "yunMu": "ang"
        },
        {
            "pinyin": "de",
            "shenMu": "d",
            "tone": 5,
            "word": "的",
            "yunMu": "e"
        },
        {
            "pinyin": "ka",
            "shenMu": "k",
            "tone": 1,
            "word": "咖",
            "yunMu": "a"
        },
        {
            "pinyin": "fei",
            "shenMu": "f",
            "tone": 1,
            "word": "啡",
            "yunMu": "ei"
        },
        {
            "pinyin": "ting",
            "shenMu": "t",
            "tone": 1,
            "word": "厅",
            "yunMu": "ing"
        },
        {
            "pinyin": "he",
            "shenMu": "h",
            "tone": 1,
            "word": "喝",
            "yunMu": "e"
        },
        {
            "pinyin": "le",
            "shenMu": "l",
            "tone": 5,
            "word": "了",
            "yunMu": "e"
        },
        {
            "pinyin": "liang",
            "shenMu": "l",
            "tone": 3,
            "word": "两",
            "yunMu": "iang"
        },
        {
            "pinyin": "bei",
            "shenMu": "b",
            "tone": 1,
            "word": "杯",
            "yunMu": "ei"
        },
        {
            "pinyin": "ka",
            "shenMu": "k",
            "tone": 1,
            "word": "咖",
            "yunMu": "a"
        },
        {
            "pinyin": "fei",
            "shenMu": "f",
            "tone": 1,
            "word": "啡",
            "yunMu": "ei"
        }
    ]
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class Word2Pinyin extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeWord2Pinyin', payload: values });
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
        <h1>汉字转拼音</h1>

        <h2>接口描述</h2>
        <p>将原始汉字文本逐字转换成拼音表示。</p>

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
