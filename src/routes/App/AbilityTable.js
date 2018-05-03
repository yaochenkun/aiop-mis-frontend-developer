import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Divider, Modal } from 'antd';
import EnhanceAbilityModal from './EnhanceAbilityModal';
import styles from './style.less';

@connect(state => ({
  app: state.app,
}))
export default class AbilityTable extends PureComponent {
  // 1.申请能力确认对话框
  showOccupyAbilityModal = (record) => {
    Modal.confirm({
      title: `您确定要申请能力"${record.zhName}"吗?`,
      confirmLoading: this.props.app.submitting,
      onOk: () => {
        this.props.dispatch({ type: 'app/occupyAbility', payload: { appId: this.props.app.curApp.id, abilityId: record.id } });
      },
    });
  }

  // 2.注销能力确认对话框
  showCancelAbilityModal = (record) => {
    Modal.confirm({
      title: `您确定要注销能力"${record.zhName}"吗?`,
      confirmLoading: this.props.app.submitting,
      onOk: () => {
        this.props.dispatch({ type: 'app/cancelAbility', payload: { appId: this.props.app.curApp.id, abilityId: record.id } });
      },
    });
  }

  // 3.提升配额对话框
  showEnhanceAbilityModal = (record) => {
    this.refs.enhanceAbilityForm.setFieldsValue({ invokeLimit: record.actualInvokeLimit, qpsLimit: record.actualQpsLimit }); // 设置对话框的初始值
    this.props.dispatch({ type: 'app/changeCurAbilityUnderApp', payload: record }); // 记录当前要配置的能力
    this.props.dispatch({ type: 'app/changeEnhanceAbilityModalVisible', payload: true }); // 显示
  }
  okEnhanceAbilityModal = (values) => {
    this.props.dispatch({ type: 'app/updateAbilityLimit', payload: { appId: this.props.app.curApp.id, abilityId: this.props.app.curAbilityUnderApp.id, ...values, invokeLimit: Number(values.invokeLimit), qpsLimit: Number(values.qpsLimit) } });
  }
  cancelEnhanceAbilityModal = () => {
    this.props.dispatch({ type: 'app/changeEnhanceAbilityModalVisible', payload: false });
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
    const { data, loading, app } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '9%',
        sorter: (record1, record2) => (record1.id - record2.id),
      },
      {
        title: '中文名称',
        dataIndex: 'zhName',
        width: '16%',
      },
      {
        title: '英文名称',
        dataIndex: 'enName',
        width: '18%',
      },
      {
        title: '算法类别',
        dataIndex: 'type',
        width: '10%',
      },
      {
        title: '调用量限制',
        dataIndex: 'actualInvokeLimit',
        width: '15%',
        className: styles.columnAlignRight,
        render: (_, record) => (record.abilityId ? <span>{`${record.actualInvokeLimit} 次/天`}</span> : ''),
      },
      {
        title: 'QPS限制',
        dataIndex: 'actualQpsLimit',
        width: '13%',
        className: styles.columnAlignRight,
        render: (_, record) => (record.abilityId ? <span>{`${record.actualQpsLimit} 请求/秒`}</span> : ''),
      },
      {
        title: '操作',
        key: 'action',
        render: record => (
          record.abilityId
            ?
              <span>
                <a onClick={() => this.showEnhanceAbilityModal(record)}>提升配额</a>
                <Divider type="vertical" />
                <a className={styles.delete} onClick={() => this.showCancelAbilityModal(record)}>注销能力</a>
              </span>
            :
              <a onClick={() => this.showOccupyAbilityModal(record)}>申请能力</a>
        ),
      },
    ];

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey={record => record.id}
        />
        <EnhanceAbilityModal
          ref="enhanceAbilityForm"
          title="提升配额"
          visible={app.enhanceAbilityModalVisible}
          onOk={this.okEnhanceAbilityModal}
          onCancel={this.cancelEnhanceAbilityModal}
          confirmLoading={app.submitting}
        />
      </div>
    );
  }
}
