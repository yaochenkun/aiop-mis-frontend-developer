import React from 'react';
import { Table } from 'antd';
import styles from './style.less';


const oauthErrorColumns = [{
  title: '错误码',
  dataIndex: 'errorCode',
  width: '15%',
  render: text => <span className={styles.blue}>{text}</span>,
}, {
  title: '错误原因',
  dataIndex: 'errorMsg',
}];

const oauthErrorData = [{
  errorCode: '100',
  errorMsg: 'system error',
}, {
  errorCode: '101',
  errorMsg: 'invalid grant type',
}, {
  errorCode: '102',
  errorMsg: 'invalid client id',
}, {
  errorCode: '102',
  errorMsg: 'invalid client secret',
}, {
  errorCode: '103',
  errorMsg: 'access token invalid or no longer valid',
}, {
  errorCode: '104',
  errorMsg: 'no permission to access data',
}, {
  errorCode: '199',
  errorMsg: 'undefined oauth error',
}];

const abilityErrorColumns = [{
  title: '错误码',
  dataIndex: 'errorCode',
  width: '15%',
  render: text => <span className={styles.blue}>{text}</span>,
}, {
  title: '错误原因',
  dataIndex: 'errorMsg',
}];

const abilityErrorData = [{
  errorCode: '200',
  errorMsg: 'empty param',
}, {
  errorCode: '201',
  errorMsg: 'long param',
}, {
  errorCode: '202',
  errorMsg: 'internal error',
}, {
  errorCode: '203',
  errorMsg: 'algorithmn error',
}, {
  errorCode: '204',
  errorMsg: 'invalid param',
}];

export default class ErrorCode extends React.Component {
  render() {
    return (
      <div>
        <h1>错误码</h1>
        <p>调用平台API时，若调用失败则将返回相应的错误码。错误码包括鉴权错误码与能力调用错误码，关于HTTP本身的错误码本平台不提供支持，需由开发者利用HTTP发送插件提供的HTTP错误回调方法自行捕获。</p>
        <h2>鉴权错误码</h2>
        <Table columns={oauthErrorColumns} dataSource={oauthErrorData} bordered pagination={false} size="middle" className={styles.infoTable} rowKey={record => record.param} />
        <h2>能力调用错误码</h2>
        <Table columns={abilityErrorColumns} dataSource={abilityErrorData} bordered pagination={false} size="middle" className={styles.infoTable} rowKey={record => record.param} />
      </div>
    );
  }
}
