import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Table, Badge, Divider, Modal } from 'antd';
import styles from './style.less';

const statusStyles = {
  '关闭': 'default',
  '运行中': 'processing',
  '已上线': 'success',
  '异常': 'error',
};
export default class ManageTable extends PureComponent {
  // 翻页
  handleTableChange = (pager) => {
    this.props.onChange(pager.current);
  }

  // 删除
  handleDelete = (id) => {
    Modal.confirm({
      title: '您确定要删除该应用吗?',
      content: '删除该应用后将无法恢复!',
      onOk: () => {
        this.props.dispatch({ type: 'app/delete', payload: { id } });
      },
    });
  }

  render() {
    const { data, loading } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '9%',
        sorter: (record1, record2) => (record1.id - record2.id),
      },
      {
        title: '应用名称',
        dataIndex: 'name',
        width: '15%',
      },
      {
        title: 'API Key',
        dataIndex: 'clientId',
        width: '20%',
      },
      {
        title: 'Secret Key',
        dataIndex: 'clientSecret',
        width: '20%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [{
          text: '关闭',
          value: '关闭',
        }, {
          text: '运行中',
          value: '运行中',
        }, {
          text: '已上线',
          value: '已上线',
        }, {
          text: '异常',
          value: '异常',
        }],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        render: content => <Badge status={statusStyles[content]} text={content} />,
      },
      {
        title: '更新时间',
        dataIndex: 'updateDate',
        width: '13%',
        sorter: (record1, record2) => (record1.updateDate - record2.updateDate),
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: record => (
          <div>
            <Link to={`/app/app-profile/${record.id}`}>管理</Link>
            <Divider type="vertical" />
            <a className={styles.delete} onClick={() => this.handleDelete(record.id)}>删除</a>
          </div>
        ),
      },
    ];

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          dataSource={data.list}
          columns={columns}
          pagination={data.pagination}
          onChange={this.handleTableChange}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}
