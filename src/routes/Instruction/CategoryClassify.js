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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/category_classify',
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
  description: '待进行分类的文本（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "text": "敦煌莫高窟是甘肃省敦煌市境内的莫高窟、西千佛洞的总称,
             是我国著名的四大石窟之一,也是世界上现存规模最宏大,
             保存最完好的佛教艺术宝库。"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'text',
  type: 'string',
  description: '进行分类的文本',
}, {
  param: 'category',
  type: 'string',
  description: '所属类别',
}, {
  param: 'items',
  type: 'array',
  description: '类别概率数组（当前支持的类别包括：科技、文化、家居、房产、星座、时政、时尚、社会、彩票、娱乐、体育、教育、股票、健康、军事、游戏、财经）',
}];

// 返回示例代码
const responseCodeData = `{
    "text": "敦煌莫高窟是甘肃省敦煌市境内的莫高窟、西千佛洞的总称,
             是我国著名的四大石窟之一,也是世界上现存规模最宏大,
             保存最完好的佛教艺术宝库。",
    "category": "文化",
    "items": {
        "科技": 1.8919097105306352e-15,
        "文化": 0.9999999999948166,
        "家居": 5.005160193963048e-12,
        "房产": 2.4923194564116562e-14,
        "星座": 6.24226464395273e-25,
        "时政": 9.991638150881216e-14,
        "时尚": 2.910628077557968e-21,
        "社会": 2.2676880114982412e-17,
        "彩票": 2.181809273419871e-22,
        "娱乐": 5.848771709717548e-17,
        "体育": 1.6441350730165076e-26,
        "教育": 1.2497256342744997e-14,
        "股票": 5.3168335931237364e-21,
        "健康": 5.7004726947771555e-18,
        "军事": 6.829988083175624e-18,
        "游戏": 3.895141384978721e-14,
        "财经": 4.132543878614991e-17
    }
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class CategoryClassify extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeCategoryClassify', payload: values });
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
        <h1>文本分类</h1>

        <h2>接口描述</h2>
        <p>将输入文本按照不同领域进行归类（包括：科技、人文、娱乐、历史等类别）。</p>

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
