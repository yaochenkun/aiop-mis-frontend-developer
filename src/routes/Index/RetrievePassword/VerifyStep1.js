import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './style.less';

export default class VerifyStep1 extends Component {
  state = {
    count: 0,
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // 返回首页
  onReturnIndex = () => {
    this.props.dispatch(routerRedux.push('/index/login'));
  }

  // 发送验证码
  onGetCaptcha = () => {
    this.props.form.validateFields(['mobile'], { force: true },
      (err, values) => {
        if (!err) {
          // 倒计时展示
          let count = 59;
          this.setState({ count });
          this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
              clearInterval(this.interval);
            }
          }, 1000);

          // 请求发送验证码
          this.props.dispatch({ type: 'retrieve/sendCaptcha', payload: values });
        }
      }
    );
  }

  // 提交验证码认证
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({ type: 'retrieve/verifyRetrieveCaptcha', payload: values });
        }
      }
    );
  }

  render() {
    const { count } = this.state;
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="手机">
            {getFieldDecorator('mobile', { rules: [{ required: true, message: '请输入手机号！' }, { pattern: /^1\d{10}$/, message: '手机号格式错误！' }] })(
              <Input
                size="large"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="验证码">
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', { rules: [{ required: true, message: '请输入验证码！' }] })(
                  <Input
                    size="large"
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  disabled={count}
                  className={styles.getCaptcha}
                  size="large"
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
            }}
            label=""
          >
            <Button type="primary" onClick={this.handleSubmit}>
              下一步
            </Button>
            <Button onClick={this.onReturnIndex} style={{ marginLeft: 8 }}>
              返回首页
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
