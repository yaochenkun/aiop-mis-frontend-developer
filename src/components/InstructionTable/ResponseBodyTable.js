import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

const columns = [{
  title: '参数',
  dataIndex: 'param',
  width: '20%',
  render: text => <span className={styles.blue}>{text}</span>,
}, {
  title: '类型',
  dataIndex: 'type',
  width: '10%',
}, {
  title: '描述',
  dataIndex: 'description',
}];

export default class ResponseBodyTable extends React.Component {
  render() {
    return (
      <Table columns={columns} dataSource={this.props.data} bordered pagination={false} size="middle" className={styles.infoTable} rowKey={record => record.param} />
    );
  }
}
