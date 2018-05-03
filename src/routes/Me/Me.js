import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { Row, Col, Card, Avatar, Form, Input, Button, Select, Tabs, Tag, List } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import NoticeList from '../../components/NoticeIcon/NoticeList';
import { FILE_SERVER, PROXY_SERVER } from './../../common/config';
import { REGEX } from './../../common/regex';
import UploadPictureModal from './../../components/UploadPictureModal';
import styles from './style.less';

const { Description } = DescriptionList;

const { TabPane } = Tabs;

@connect(state => ({
  global: state.global,
  user: state.user,
  me: state.me,
}))
@Form.create()
export default class Me extends PureComponent {
  state = {
    mobileCount: 0,
    uploadAvatarModalVisible: false,
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'global/fetchNotices' });
  }

  // 发送手机验证码
  onGetMobileCaptcha = () => {
    this.props.form.validateFields(['mobile'], { force: true },
      (err, values) => {
        if (!err) {
          // 倒计时展示
          let mobileCount = 59;
          this.setState({ mobileCount });
          this.interval = setInterval(() => {
            mobileCount -= 1;
            this.setState({ mobileCount });
            if (mobileCount === 0) {
              clearInterval(this.interval);
            }
          }, 1000);

          // 请求发送验证码
          this.props.dispatch({ type: 'me/sendModifyMobileCaptcha', payload: values });
        }
      }
    );
  }

  onGetEmailCaptcha = () => {
    this.props.form.validateFields(['email'], { force: true },
      (err, values) => {
        if (!err) {
          // 倒计时展示
          let emailCount = 59;
          this.setState({ emailCount });
          this.interval = setInterval(() => {
            emailCount -= 1;
            this.setState({ emailCount });
            if (emailCount === 0) {
              clearInterval(this.interval);
            }
          }, 1000);

          // 请求发送验证码
          this.props.dispatch({ type: 'me/sendModifyEmailCaptcha', payload: values });
        }
      }
    );
  }

  // 提交手机+验证码
  submitMobileChange = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['mobile', 'mobileCaptcha'], (err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'me/updateMobile', payload: { ...values, userId: this.props.user.currentUser.id } });
      }
    });
  }

  // 提交邮箱+验证码
  submitEmailChange = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['email', 'emailCaptcha'], (err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'me/updateEmail', payload: { ...values, userId: this.props.user.currentUser.id } });
      }
    });
  }

  // 两次输入的密码匹配
  checkConfirmPassword = (rule, value, callback) => {
    const password = this.props.form.getFieldValue('newPassword');
    const confirmPassword = this.props.form.getFieldValue('confirmPassword');
    if (password !== undefined && confirmPassword !== undefined && password !== confirmPassword) {
      callback('两次密码输入不一致');
    }
    callback();
  }
  // 提交密码更改
  submitPasswordChange = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['oldPassword', 'newPassword', 'confirmPassword'], (err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'me/updatePassword', payload: { ...values, userId: this.props.user.currentUser.id } });
      }
    });
  }

  // 1.上传对话框
  showUploadAvatarModal = () => {
    this.setState({ uploadAvatarModalVisible: true });
  }
  okUploadAvatarModal = () => {
    this.setState({ uploadAvatarModalVisible: false });
  }
  cancelUploadAvatarModal = () => {
    this.setState({ uploadAvatarModalVisible: false });
  }
  invalidateAvatar = () => {
    this.props.dispatch({ type: 'user/fetchCurrentUser' });
  }

  getNoticeData = () => {
    const { notices = [] } = this.props.global;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  renderActivities = () => {
    const activityList = [
      {
        id: 'trend-1',
        updatedAt: '2017-12-06 19:08:18',
        user: {
          name: '您',
        },
        group: {
          name: '应用管理',
          link: '#',
        },
        project: {
          name: '舆情分析平台',
          link: '#',
        },
        template: '在 @{group} 创建应用 @{project}',
      },
      {
        id: 'trend-2',
        updatedAt: '2017-12-04 16:42:08',
        user: {
          name: '您',
        },
        group: {
          name: '能力管理',
          link: '#',
        },
        project: {
          name: '词性标注-地名',
          link: '#',
        },
        template: '在 @{group} 新增能力 @{project}',
      },
      {
        id: 'trend-3',
        updatedAt: '2017-12-04 15:57:22',
        user: {
          name: '您',
        },
        group: {
          name: '应用管理',
          link: '#',
        },
        project: {
          name: '个性化推荐APP',
          link: '#',
        },
        template: '在 @{group} 创建应用 @{project}',
      },
      {
        id: 'trend-4',
        updatedAt: '2017-12-03 11:37:00',
        user: {
          name: '您',
        },
        group: {
          name: '模型管理',
          link: '#',
        },
        project: {
          name: '自动问答',
          link: '#',
        },
        template: '在 @{group} 新增模型 @{project}',
      },
      {
        id: 'trend-5',
        updatedAt: '2017-12-02 10:55:13',
        user: {
          name: '您',
        },
        group: {
          name: '模型管理',
          link: '#',
        },
        project: {
          name: '文本分类',
          link: '#',
        },
        template: '在 @{group} 修改模型 @{project} 路径',
      },
      {
        id: 'trend-6',
        updatedAt: '2017-11-30 22:32:07',
        user: {
          name: '您',
        },
        group: {
          name: '模型管理',
          link: '#',
        },
        project: {
          name: '文本分类',
          link: '#',
        },
        template: '在 @{group} 新增模型 @{project}',
      },
      {
        id: 'trend-7',
        updatedAt: '2017-11-28 19:11:43',
        user: {
          name: '您',
        },
        group: {
          name: '能力管理',
          link: '#',
        },
        project: {
          name: '依存句法分析',
          link: '#',
        },
        template: '在 @{group} 修改能力 @{project} 调用地址、文档地址',
      },
      {
        id: 'trend-8',
        updatedAt: '2017-11-28 17:05:23',
        user: {
          name: '您',
        },
        group: {
          name: '能力管理',
          link: '#',
        },
        project: {
          name: '情感分类',
          link: '#',
        },
        template: '在 @{group} 注销能力 @{project}',
      },
      {
        id: 'trend-9',
        updatedAt: '2017-11-26 13:15:03',
        user: {
          name: '您',
        },
        group: {
          name: '能力管理',
          link: '#',
        },
        project: {
          name: '文本推荐',
          link: '#',
        },
        template: '在 @{group} 提升能力 @{project} 配额',
      },
      {
        id: 'trend-10',
        updatedAt: '2017-11-25 10:05:23',
        user: {
          name: '您',
        },
        group: {
          name: '能力管理',
          link: '#',
        },
        project: {
          name: '中文分词',
          link: '#',
        },
        template: '在 @{group} 申请能力 @{project}',
      },
      {
        id: 'trend-11',
        updatedAt: '2017-11-25 09:33:44',
        user: {
          name: '您',
        },
        group: {
          name: '应用管理',
          link: '#',
        },
        project: {
          name: '意绘',
          link: '#',
        },
        template: '在 @{group} 修改应用 @{project} 运行状态',
      },
      {
        id: 'trend-12',
        updatedAt: '2017-11-24 15:25:44',
        user: {
          name: '您',
        },
        group: {
          name: '应用管理',
          link: '#',
        },
        project: {
          name: '心情笔记',
          link: '#',
        },
        template: '在 @{group} 创建应用 @{project}',
      },
      {
        id: 'trend-13',
        updatedAt: '2017-11-24 13:22:43',
        user: {
          name: '您',
        },
        group: {
          name: '应用管理',
          link: '#',
        },
        project: {
          name: '意绘',
          link: '#',
        },
        template: '在 @{group} 创建应用 @{project}',
      },
    ];
    return activityList.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
        if (item[key]) {
          return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                <span className={styles.event}>{events}</span>
              </span>
            }
          />
          <span className={styles.datetime} title={item.updatedAt}>
            {item.updatedAt}
          </span>
        </List.Item>
      );
    });
  }

  render() {
    const {
      user: { currentUser },
      form: { getFieldDecorator },
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={FILE_SERVER + currentUser.avatarFile} onClick={this.showUploadAvatarModal} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>账户名：<strong>{currentUser.username}</strong></div>
          <DescriptionList className={styles.headerList} size="small" col="1">
            <Description term="角色">{currentUser.role}</Description>
            <Description term="邮箱">{currentUser.email}</Description>
            <Description term="手机">{currentUser.mobile}</Description>
          </DescriptionList>
        </div>
      </div>
    );

    const noticeData = this.getNoticeData();

    // 手机区号
    const mobilePrefixSelector = getFieldDecorator('prefix', { initialValue: '86' })(
      <Select>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    );
    const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 8 } }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 } } };
    const formItemLayoutWithoutLabel = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 8 } } };
    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              bodyStyle={{ padding: 0, paddingLeft: 15 }}
            >
              <Tabs size="large">
                <TabPane tab="我的待办" key="todos">
                  <NoticeList
                    data={noticeData['待办']}
                    title="清空待办"
                    locale={{ locale: { emptyText: '暂无数据', clear: '清空' } }}
                  />
                </TabPane>
                <TabPane tab="我的通知" key="notices">
                  <NoticeList
                    data={noticeData['通知']}
                    title="清空通知"
                    locale={{ locale: { emptyText: '暂无数据', clear: '清空' } }}
                  />
                </TabPane>
                <TabPane tab="我的消息" key="messages">
                  <NoticeList
                    data={noticeData['消息']}
                    title="清空消息"
                    locale={{ locale: { emptyText: '暂无数据', clear: '清空' } }}
                  />
                </TabPane>
                <TabPane tab="我的动态" key="moments">
                  <List>
                    <div className={styles.activitiesList}>
                      {this.renderActivities()}
                    </div>
                  </List>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="邮箱更换"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Form onSubmit={this.submitEmailChange}>
                <Form.Item {...formItemLayout} style={{ marginTop: 20 }} label="邮箱">
                  {getFieldDecorator('email', { rules: [{ required: true, message: '请输入邮箱地址！' }, { type: 'email', message: '邮箱地址格式错误！' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="验证码">
                  <Row gutter={8}>
                    <Col span={10}>
                      {getFieldDecorator('emailCaptcha', { rules: [{ required: true, message: '请输入验证码' }] })(
                        <Input />
                      )}
                    </Col>
                    <Col span={14}>
                      <Button
                        disabled={this.state.emailCount}
                        className={styles.getCaptcha}
                        onClick={this.onGetEmailCaptcha}
                      >
                        {this.state.emailCount ? `${this.state.emailCount} s` : '发送验证码邮件'}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item {...formItemLayoutWithoutLabel}>
                  <Button type="primary" htmlType="submit" loading={this.state.submitPhoneChangeLoading}>确认更换</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="手机更换"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Form onSubmit={this.submitMobileChange}>
                <Form.Item {...formItemLayout} label="手机" style={{ marginTop: 20 }}>
                  {getFieldDecorator('mobile', { rules: [{ required: true, message: '请输入手机号' }, { pattern: REGEX.PHONE, message: '手机号格式错误！' }],
                  })(
                    <Input addonBefore={mobilePrefixSelector} />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="验证码">
                  <Row gutter={8}>
                    <Col span={10}>
                      {getFieldDecorator('mobileCaptcha', { rules: [{ required: true, message: '请输入验证码' }] })(
                        <Input />
                      )}
                    </Col>
                    <Col span={14}>
                      <Button
                        disabled={this.state.mobileCount}
                        className={styles.getCaptcha}
                        onClick={this.onGetMobileCaptcha}
                      >
                        {this.state.mobileCount ? `${this.state.mobileCount} s` : '获取验证码'}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item {...formItemLayoutWithoutLabel}>
                  <Button type="primary" htmlType="submit" loading={this.state.submitPhoneChangeLoading}>确认更换</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="密码更换"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Form onSubmit={this.submitPasswordChange}>
                <Form.Item {...formItemLayout} label="原始密码" style={{ marginTop: 20 }}>
                  {getFieldDecorator('oldPassword', { rules: [{ required: true, message: '请输入原始密码' }],
                  })(
                    <Input type="password" />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="新密码">
                  {getFieldDecorator('newPassword', { rules: [{ required: true, message: '请输入新密码' }, { validator: this.checkConfirmPassword }],
                  })(
                    <Input type="password" />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="确认密码">
                  {getFieldDecorator('confirmPassword', { rules: [{ required: true, message: '请输入确认密码' }, { validator: this.checkConfirmPassword }],
                  })(
                    <Input type="password" />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayoutWithoutLabel}>
                  <Button type="primary" htmlType="submit" loading={this.state.submitPhoneChangeLoading}>确认更换</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        <UploadPictureModal title="上传头像" visible={this.state.uploadAvatarModalVisible} onOk={this.okUploadAvatarModal} onCancel={this.cancelUploadAvatarModal} params={{ id: currentUser.id, token: sessionStorage.getItem('token'), url: `${PROXY_SERVER}/api/user/avatar` }} invalidate={this.invalidateAvatar} />
      </PageHeaderLayout>
    );
  }
}
