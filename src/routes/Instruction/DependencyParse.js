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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/dependency_parse',
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
  description: '待进行依存句法分析的文本（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '进行依存句法分析的原始文本',
}, {
  param: 'items',
  type: 'array',
  description: '分析后的词块数组',
}, {
  param: 'id',
  type: 'int',
  description: '词块编号',
}, {
  param: 'word',
  type: 'string',
  description: '词块',
}, {
  param: 'postag',
  type: 'string',
  description: '词性',
}, {
  param: 'head',
  type: 'int',
  description: '词块的父节点',
}, {
  param: 'deprel',
  type: 'string',
  description: '词块与父节点的依赖关系',
}];

// 返回示例代码
const responseCodeData = `{
    "text": "今天李华到学校旁的咖啡厅喝了两杯咖啡",
    "items": [
        {
            "deprel": "状中结构",
            "head": 9,
            "id": 1,
            "postag": "t",
            "word": "今天"
        },
        {
            "deprel": "主谓关系",
            "head": 9,
            "id": 2,
            "postag": "nr",
            "word": "李华"
        },
        {
            "deprel": "状中结构",
            "head": 9,
            "id": 3,
            "postag": "v",
            "word": "到"
        },
        {
            "deprel": "定中关系",
            "head": 5,
            "id": 4,
            "postag": "n",
            "word": "学校"
        },
        {
            "deprel": "定中关系",
            "head": 8,
            "id": 5,
            "postag": "f",
            "word": "旁"
        },
        {
            "deprel": "右附加关系",
            "head": 5,
            "id": 6,
            "postag": "uj",
            "word": "的"
        },
        {
            "deprel": "定中关系",
            "head": 8,
            "id": 7,
            "postag": "n",
            "word": "咖啡"
        },
        {
            "deprel": "介宾关系",
            "head": 3,
            "id": 8,
            "postag": "n",
            "word": "厅"
        },
        {
            "deprel": "核心关系",
            "head": 0,
            "id": 9,
            "postag": "vg",
            "word": "喝"
        },
        {
            "deprel": "右附加关系",
            "head": 9,
            "id": 10,
            "postag": "ul",
            "word": "了"
        },
        {
            "deprel": "定中关系",
            "head": 12,
            "id": 11,
            "postag": "m",
            "word": "两"
        },
        {
            "deprel": "定中关系",
            "head": 13,
            "id": 12,
            "postag": "q",
            "word": "杯"
        },
        {
            "deprel": "动宾关系",
            "head": 9,
            "id": 13,
            "postag": "n",
            "word": "咖啡"
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
          this.props.dispatch({ type: 'instruction/invokeDependencyParse', payload: values });
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
        <h1>依存句法分析</h1>

        <h2>接口描述</h2>
        <p>依存句法分析接口可自动分析文本中的依存句法结构信息，利用句子中词与词之间的依存关系来表示词语的句法结构信息（如“主谓”、“动宾”、“定中”等结构关系），并用树状结构来表示整句的结构（如“主谓宾”、“定状补”等）。</p>

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
