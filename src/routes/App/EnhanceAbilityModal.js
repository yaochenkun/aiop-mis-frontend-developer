import React, { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';
import { REGEX } from './../../common/regex';

class EnhanceAbilityModal extends PureComponent {
  // 提交
  onOk = () => {
    this.props.form.validateFields({ force: true }, // 获取表单数据
      (err, values) => {
        if (!err) {
          this.props.onOk(values);
        }
      }
    );
  }

  render() {
    const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 7 } }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 } } };
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        confirmLoading={this.props.confirmLoading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="调用量限制">
            { getFieldDecorator('invokeLimit', { rules: [{ required: true, message: '请输入调用量限制' }, { pattern: REGEX.POSITIVE_INT_NUMBER, message: '请输入正整数！' }] })(
              <Input addonAfter="次 / 天" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="QPS限制">
            { getFieldDecorator('qpsLimit', { rules: [{ required: true, message: '请输入QPS限制' }, { pattern: REGEX.POSITIVE_INT_NUMBER, message: '请输入正整数！' }] })(
              <Input addonAfter="请求 / 秒" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EnhanceAbilityModal);
