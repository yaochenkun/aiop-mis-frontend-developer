import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table } from 'antd';

export default class MonitorTable extends PureComponent {
  // 翻页
  handleTableChange = (pager) => {
    this.props.onChange(pager.current);
  }
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '9%',
        sorter: (record1, record2) => (record1.id - record2.id),
      },
      {
        title: '调用成功量',
        dataIndex: 'invokeCountSuccess',
        render: (_, record) => (this.props.invokeResultFilter === '调用成功' ? record.invokeCount : '/'),
      },
      {
        title: '调用失败量',
        dataIndex: 'invokeCountFailure',
        render: (_, record) => (this.props.invokeResultFilter === '调用失败' ? record.invokeCount : '/'),
      },
      {
        title: '调用总量',
        dataIndex: 'invokeCountTotal',
        render: (_, record) => (this.props.invokeResultFilter === '全部' ? record.invokeCount : '/'),
      },
      {
        title: '调用日期',
        dataIndex: 'invokeDate',
        sorter: (record1, record2) => (record1.updateDate - record2.updateDate),
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: record => <a onClick={() => this.showEnhanceAbilityModal(record)}>查看详情</a>,
      },
    ];

    const { data } = this.props;
    return (
      <Table
        dataSource={data.list}
        pagination={data.pagination}
        columns={columns}
        onChange={this.handleTableChange}
        rowKey={record => record.id}
      />
    );
  }
}
