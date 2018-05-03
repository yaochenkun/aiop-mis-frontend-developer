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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/text_keywords',
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
  description: '待提取关键词的文本（GBK编码的URL编码形式）',
}, {
  param: 'size',
  type: 'int',
  mandatory: <Icon type="close" />,
  description: '希望提取的关键词个数（默认为3）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "为提升多边形的填充效率,在分析和比较常见填充算法后,
             以活性边表算法为基础,深入挖掘不同扫描方向上的求交次数及多边形自交特性,
             提出一种强鲁棒性自适应活性边表算法.新算法引入横度和纵度的概念表示横纵
             扫描方向上的求交次数,并以此为标准自适应选择扫描方向.此外,
             通过对活性边表中相邻交点的横坐标进行检测和纠正,
             正确而高效地填充了自交多边形.经实验验证,
             新算法灵活的自适应性和高效的自交纠正方法,大大提高了时间效率和鲁棒性.",
    "size": 5 // 可省略
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '被提取关键词的原始文本',
}, {
  param: 'items',
  type: 'array',
  description: '提取后的关键词数组',
}, {
  param: 'item',
  type: 'string',
  description: '关键词',
}, {
  param: 'index',
  type: 'int',
  description: '关键词在句中的索引位置',
}];

// 返回示例代码
const responseCodeData = `{
    "text": "为提升多边形的填充效率,在分析和比较常见填充算法后,
             以活性边表算法为基础,深入挖掘不同扫描方向上的求交次数及多边形自交特性,
             提出一种强鲁棒性自适应活性边表算法.新算法引入横度和纵度的概念表示横纵
             扫描方向上的求交次数,并以此为标准自适应选择扫描方向.此外,
             通过对活性边表中相邻交点的横坐标进行检测和纠正,
             正确而高效地填充了自交多边形.经实验验证,
             新算法灵活的自适应性和高效的自交纠正方法,大大提高了时间效率和鲁棒性.",
    "items": [
        {
            "index": 22,
            "item": "算法"
        },
        {
            "index": 54,
            "item": "多边形"
        },
        {
            "index": 97,
            "item": "扫描"
        },
        {
            "index": 99,
            "item": "方向"
        },
        {
            "index": 148,
            "item": "纠正"
        }
    ]
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
          this.props.dispatch({ type: 'instruction/invokeTextKeywords', payload: values });
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
        <h1>关键词提取</h1>

        <h2>接口描述</h2>
        <p>提取出若干个代表输入文本语义内容的词汇或短语。</p>

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
