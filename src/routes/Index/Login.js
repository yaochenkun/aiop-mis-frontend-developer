import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    count: 0,
    type: 'Account',
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.login.status === 'ok') {
  //     this.props.dispatch(routerRedux.push('/'));
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
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
          this.props.dispatch({ type: 'login/sendCaptcha', payload: values });
        }
      }
    );
  }

  // 提交登录
  handleSubmit = (e) => {
    e.preventDefault();
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({ type: `login/verify${type}Login`, payload: { ...values, role: '开发者' } });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;

    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
            <TabPane tab="账户密码登录" key="Account">
              {
                login.status === 'error' &&
                login.type === 'Account' &&
                login.submitting === false &&
                this.renderMessage('账户或密码错误')
              }
              <FormItem>
                {getFieldDecorator('username', { rules: [{ required: type === 'Account', message: '请输入账户名！' }] })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="账户"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', { rules: [{ required: type === 'Account', message: '请输入密码！' }] })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="手机号登录" key="Mobile">
              {
                login.status === 'error' &&
                login.type === 'Mobile' &&
                login.submitting === false &&
                this.renderMessage('验证码错误')
              }
              <FormItem>
                {getFieldDecorator('mobile', { rules: [{ required: type === 'Mobile', message: '请输入手机号！' }, { pattern: /^1\d{10}$/, message: '手机号格式错误！' }] })(
                  <Input
                    size="large"
                    prefix={<Icon type="mobile" className={styles.prefixIcon} />}
                    placeholder="手机号"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', { rules: [{ required: type === 'Mobile', message: '请输入验证码！' }] })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className={styles.prefixIcon} />}
                        placeholder="验证码"
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
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={styles.additional}>
            {getFieldDecorator('remember', { valuePropName: 'checked', initialValue: localStorage.getItem('remember') })(
              <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
            )}
            <a className={styles.forgot} href="/index/retrieve-password/verify">忘记密码</a>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        <div className={styles.other}>
          <Link className={styles.register} to="/index/register">注册账户</Link>
        </div>
      </div>
    );
  }
}
