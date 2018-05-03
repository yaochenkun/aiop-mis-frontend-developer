import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from '../../components/Result';
import styles from './RegisterResult.less';

// 邮箱地址表
const emailAddressMap = {
  'qq.com': 'http://mail.qq.com',
  'gmail.com': 'http://mail.google.com',
  'sina.com': 'http://mail.sina.com.cn',
  '163.com': 'http://mail.163.com',
  '126.com': 'http://mail.126.com',
  'yeah.net': 'http://www.yeah.net/',
  'sohu.com': 'http://mail.sohu.com/',
  'tom.com': 'http://mail.tom.com/',
  'sogou.com': 'http://mail.sogou.com/',
  '139.com': 'http://mail.10086.cn/',
  'hotmail.com': 'http://www.hotmail.com',
  'live.com': 'http://login.live.com/',
  'live.cn': 'http://login.live.cn/',
  'live.com.cn': 'http://login.live.com.cn',
  '189.com': 'http://webmail16.189.cn/webmail/',
  'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
  'yahoo.cn': 'http://mail.cn.yahoo.com/',
  'eyou.com': 'http://www.eyou.com/',
  '21cn.com': 'http://mail.21cn.com/',
  '188.com': 'http://www.188.com/',
  'foxmail.coom': 'http://www.foxmail.com',
};

@connect(state => ({
  register: state.register,
}))
export default class RegisterResult extends Component {
  render() {
    const { register } = this.props;
    const title = <div className={styles.title}>您的账户：{register.curUser.username} 注册成功</div>;
    const actions = (
      <div className={styles.actions}>
        <a href={emailAddressMap[register.curUser.email.split('@')[1]]}><Button size="large" type="primary">查看邮箱</Button></a>
        <Link to="/index/login"><Button size="large">前往登录</Button></Link>
      </div>
    );
    return (
      <Result
        className={styles.registerResult}
        type="success"
        title={title}
        description="您的账户信息已发送至您的邮箱中，请查收。"
        actions={actions}
        style={{ marginTop: 56 }}
      />
    );
  }
}
