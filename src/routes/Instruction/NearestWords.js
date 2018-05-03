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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/nearest_words',
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
  description: '待比较相似度的原始短语（GBK编码的URL编码形式）',
}, {
  param: 'size',
  type: 'int',
  mandatory: <Icon type="close" />,
  description: '希望产生的相似短语个数（默认为3）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "琴棋书画",
    "size": 10 // 可省略
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '被比较相似度的原始短语',
}, {
  param: 'items',
  type: 'array',
  description: '提取后的短语数组',
}, {
  param: 'score',
  type: 'float',
  description: '相似度得分',
}, {
  param: 'word',
  type: 'string',
  description: '短语',
}];

// 返回示例代码
const responseCodeData = `{
    "text": "琴棋书画",
    "items": [
        {
            "score": 0.9283656,
            "word": "琴棋書畫"
        },
        {
            "score": 0.8989734,
            "word": "书画"
        },
        {
            "score": 0.8913565,
            "word": "书法"
        },
        {
            "score": 0.89085984,
            "word": "诗词歌赋"
        },
        {
            "score": 0.88938504,
            "word": "文人画"
        },
        {
            "score": 0.8879221,
            "word": "篆刻"
        },
        {
            "score": 0.887331,
            "word": "四言诗"
        },
        {
            "score": 0.88659793,
            "word": "琴艺"
        },
        {
            "score": 0.8860243,
            "word": "王献之"
        },
        {
            "score": 0.8838679,
            "word": "千家诗"
        }
    ]
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class NearestWords extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeNearestWords', payload: values });
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
        <h1>最相似短文本</h1>

        <h2>接口描述</h2>
        <p>选出词库中与输入词汇最相似的若干个词汇，按照相似度得分从高至低排列。</p>

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
