import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Table } from 'antd';

const columns = [
  {
    title: '能力名称',
    dataIndex: 'name',
  },
  {
    title: '调用总量',
    dataIndex: 'invokeTotalCount',
  },
  {
    title: '调用成功量',
    dataIndex: 'invokeSuccessCount',
  },
  {
    title: '调用失败量',
    dataIndex: 'invokeFailureCount',
  },
  {
    title: '成功率',
    dataIndex: 'invokeSuccessRate',
    render: val => `${Math.round(val * 100)}%`,
  },
  {
    title: '失败率',
    dataIndex: 'invokeFailureRate',
    render: val => `${Math.round(val * 100)}%`,
  },
  {
    title: '操作',
    key: 'action',
    render: record => <Link to={{ pathname: '/app/app-monitor', query: { abilityId: record.id } }}>查看</Link>,
  },
];

@connect(state => ({
  dashboard: state.dashboard,
}))
export default class MyAbilitiesTable extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Table
        size="small"
        dataSource={data}
        columns={columns}
        rowKey={record => record.id}
      />
    );
  }
}
