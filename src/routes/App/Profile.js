import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Menu, Dropdown, Badge } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import AbilityTable from './AbilityTable';
import styles from './style.less';
import UploadPictureModal from './../../components/UploadPictureModal';
import { PROXY_SERVER, FILE_SERVER } from './../../common/config';

const { Description } = DescriptionList;

const statusStyles = {
  '关闭': 'default',
  '运行中': 'processing',
  '已上线': 'success',
  '异常': 'error',
};

@connect(state => ({
  app: state.app,
}))
export default class AdvancedProfile extends Component {
  state = {
    clientSecretToggleText: '显示',
    clientSecret: '***********************',
    uploadLogoModalVisible: false,
  }

  // 拉取应用信息
  componentDidMount() {
    // 获取路由中的当前应用id
    const appId = this.props.match.params.id;
    this.props.dispatch({ type: 'app/get', payload: { id: appId } });
    this.props.dispatch({ type: 'app/listAbilityUnderApp', payload: { id: appId } });
  }

  // 修改应用状态
  changeStatus = (e) => {
    const status = e.key;
    const appId = this.props.match.params.id;
    this.props.dispatch({ type: 'app/updateStatus', payload: { id: appId, status } });
  }

  // 切换clientSecret显示/隐藏
  toggleClientSecret = () => {
    if (this.state.clientSecretToggleText === '显示') {
      this.setState({
        clientSecretToggleText: '隐藏',
        clientSecret: this.props.app.curApp.clientSecret,
      });
    } else {
      this.setState({
        clientSecretToggleText: '显示',
        clientSecret: '***********************',
      });
    }
  }

  // 1.上传对话框
  showUploadLogoModal = () => {
    this.setState({ uploadLogoModalVisible: true });
  }
  okUploadLogoModal = () => {
    this.setState({ uploadLogoModalVisible: false });
  }
  cancelUploadLogoModal = () => {
    this.setState({ uploadLogoModalVisible: false });
  }
  invalidateApp = () => {
    const appId = this.props.match.params.id;
    this.props.dispatch({ type: 'app/get', payload: { id: appId } });
  }

  render() {
    const { app } = this.props;
    const { curApp } = app;
    const statusMenu = (
      <Menu onClick={this.changeStatus}>
        <Menu.Item key="关闭">
          <Badge status={statusStyles['关闭']} text="关闭" />
        </Menu.Item>
        <Menu.Item key="运行中">
          <Badge status={statusStyles['运行中']} text="运行中" />
        </Menu.Item>
        <Menu.Item key="已上线">
          <Badge status={statusStyles['已上线']} text="已上线" />
        </Menu.Item>
        <Menu.Item key="异常">
          <Badge status={statusStyles['异常']} text="异常" />
        </Menu.Item>
      </Menu>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="应用类别">{curApp.type}</Description>
        <Description term="开发平台">{curApp.platform}</Description>
        <Description term="创建日期">{moment(curApp.createDate).format('YYYY-MM-DD')}</Description>
        <Description term="更新日期">{moment(curApp.updateDate).format('YYYY-MM-DD')}</Description>
        <Description term="API Key">{curApp.clientId}</Description>
        <Description term="Secret Key">
          {this.state.clientSecret}
          <a style={{ marginLeft: 10 }} onClick={this.toggleClientSecret}>{this.state.clientSecretToggleText}</a>
        </Description>
        <Description term="应用状态">
          <Badge status={statusStyles[curApp.status]} text={curApp.status} />
          <Dropdown overlay={statusMenu}>
            <a style={{ marginLeft: 10 }}>修改</a>
          </Dropdown>
        </Description>
      </DescriptionList>
    );

    return (
      <PageHeaderLayout
        title={`应用：${curApp.name}`}
        logo={<img alt="" src={FILE_SERVER + curApp.logoFile} className={styles.logo} onClick={this.showUploadLogoModal} />}
        action={<Button onClick={() => this.props.dispatch(routerRedux.push('/app/app-manage'))}>返回应用列表</Button>}
        content={description}
      >
        <Card title="应用描述" style={{ marginBottom: 24 }} bordered={false}>
          {curApp.description}
        </Card>
        <Card title="应用能力列表" style={{ marginBottom: 24 }} bordered={false}>
          <AbilityTable loading={app.loading} data={app.curAbilityUnderAppList} dispatch={this.props.dispatch} />
        </Card>
        <UploadPictureModal title="上传应用图标" visible={this.state.uploadLogoModalVisible} onOk={this.okUploadLogoModal} onCancel={this.cancelUploadLogoModal} params={{ id: curApp.id, token: sessionStorage.getItem('token'), url: `${PROXY_SERVER}/api/app/logo` }} invalidate={this.invalidateApp} />
      </PageHeaderLayout>
    );
  }
}
