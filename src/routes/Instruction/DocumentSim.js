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
  value: 'http://aiop.bupt.com/restapi/nlp/v1/document_sim',
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
  param: 'doc1',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '文档1（GBK编码的URL编码形式）',
}, {
  param: 'doc2',
  type: 'string',
  mandatory: <Icon type="check" />,
  description: '文档2（GBK编码的URL编码形式）',
}];

// 请求示例代码
const requestCodeData = `{
    "doc1": "梵高早期受荷兰画家马蒂斯·玛丽斯的影响以灰暗色系进行创作，
             直到他搬往巴黎与作为画商的弟弟同住，
             接触了当时震动了整个巴黎美术界的画家们，
             画风渐渐被印象派的画家影响，后来经过在野外的长期写生，
             色调渐渐由灰暗色系变为明亮色系。在他去世之后，
             他的作品《星夜》、《向日葵》与《麦田乌鸦》等，
             已跻身于全球最著名最珍贵的艺术作品的行列。
             文森特的作品目前主要收纳在阿姆斯特丹的梵高美术馆，
             以及奥特洛的国立克罗-米勒美术馆。",
    "doc2": "毕加索的艺术生涯几乎贯穿其一生，作品风格丰富多样，
             后人用“毕加索永远是年轻的”的说法形容毕加索多变的艺术形式。
             史学上不得不把他浩繁的作品分为不同的时期——早年的“蓝色时期”、
             “粉红色时期”、盛年的“黑人时期”、“分析和综合立体主义时期”
             （又称“立体主义时期”）、后来的“超现实主义时期”等等。
             他于1907年创作的《亚威农少女》是第一张被认为有立体主义倾向的作品，
             是一幅具有里程碑意义的著名杰作。它不仅标志着毕加索个人艺术历程中的重大转折，
             而且也是西方现代艺术史上的一次革命性突破，引发了立体主义运动的诞生。"
}`;

// 返回参数实体
const responseBodyData = [{
  param: 'score',
  type: 'float',
  description: '相似度得分。若文档无法匹配则返回-1',
}, {
  param: 'docs',
  type: 'array',
  description: '原始文档数组',
}, {
  param: 'doc_1',
  type: 'string',
  description: '文档1',
}, {
  param: 'doc_2',
  type: 'string',
  description: '文档2',
}];

// 返回示例代码
const responseCodeData = `{
    "score": 0.99488354,
    "docs": {
        "doc1": "梵高早期受荷兰画家马蒂斯·玛丽斯的影响以灰暗色系进行创作，
                 直到他搬往巴黎与作为画商的弟弟同住，
                 接触了当时震动了整个巴黎美术界的画家们，
                 画风渐渐被印象派的画家影响，后来经过在野外的长期写生，
                 色调渐渐由灰暗色系变为明亮色系。在他去世之后，
                 他的作品《星夜》、《向日葵》与《麦田乌鸦》等，
                 已跻身于全球最著名最珍贵的艺术作品的行列。
                 文森特的作品目前主要收纳在阿姆斯特丹的梵高美术馆，
                 以及奥特洛的国立克罗-米勒美术馆。",
        "doc2": "毕加索的艺术生涯几乎贯穿其一生，作品风格丰富多样，
                 后人用“毕加索永远是年轻的”的说法形容毕加索多变的艺术形式。
                 史学上不得不把他浩繁的作品分为不同的时期——早年的“蓝色时期”、
                 “粉红色时期”、盛年的“黑人时期”、“分析和综合立体主义时期”
                 （又称“立体主义时期”）、后来的“超现实主义时期”等等。
                 他于1907年创作的《亚威农少女》是第一张被认为有立体主义倾向的作品，
                 是一幅具有里程碑意义的著名杰作。它不仅标志着毕加索个人艺术历程中的
                 重大转折，而且也是西方现代艺术史上的一次革命性突破，引发了立体主义
                 运动的诞生。"
    }
}`;

@connect(state => ({
  instruction: state.instruction,
}))
@Form.create()
export default class DocumentSim extends React.Component {
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
          this.props.dispatch({ type: 'instruction/invokeDocumentSim', payload: values });
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
        <h1>文档相似度计算</h1>

        <h2>接口描述</h2>
        <p>判断两个文档的相似度得分。</p>

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
              <Form.Item label="文档1" {...formItemLayout}>
                {getFieldDecorator('doc1', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input.TextArea rows={8} style={{ resize: 'none' }} />
                )}
              </Form.Item>
              <Form.Item label="文档2" {...formItemLayout}>
                {getFieldDecorator('doc2', { rules: [{ required: true, message: '请输入请求参数！' }] })(
                  <Input.TextArea rows={8} style={{ resize: 'none' }} />
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
