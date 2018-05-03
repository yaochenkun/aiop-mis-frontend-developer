import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MyAbilitiesTable from './MyAbilitiesTable';
import { FILE_SERVER } from './../../common/config';

import styles from './style.less';

@connect(state => ({
  user: state.user,
  dashboard: state.dashboard,
}))
export default class Dashboard extends PureComponent {
  componentDidMount() {
    // 拉取该用户所有应用的调用总量
    this.props.dispatch({ type: 'dashboard/countMyAbilityInvokeLogTotal' });

    // 拉取调用量排名
    this.props.dispatch({ type: 'dashboard/indexMyAbilityInvokeLogRanking' });

    // 拉取用户总数
    this.props.dispatch({ type: 'user/countDevelopers' });

    // 拉取当前用户的所有应用（与分页一样，默认拉取前PAGE_SIZE个应用）
    this.props.dispatch({ type: 'dashboard/listMyApps' });

    // 拉取当前用户的所有能力
    this.props.dispatch({ type: 'dashboard/listMyAbilities', payload: { id: 1 } });
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
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {item.updatedAt}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      user: { currentUser },
      user,
      dashboard,
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={FILE_SERVER + currentUser.avatarFile} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>您好，<strong>{currentUser.username}</strong></div>
          <div>{currentUser.role}<Divider type="vertical" />{currentUser.email}<Divider type="vertical" />{currentUser.mobile}</div>
        </div>
      </div>
    );

    const pageHeaderExtra = (
      <div className={styles.pageHeaderExtra}>
        <div>
          <p>应用数</p>
          <p>{dashboard.myAppsData.length}</p>
        </div>
        <div>
          <p>调用总量</p>
          <p>{dashboard.myAbilityInvokeLogTotalCount}</p>
        </div>
        <div>
          <p>调用排名</p>
          <p>{dashboard.myAbilityInvokeLogRankingIndex}<span> / {user.userCount}</span></p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        extraContent={pageHeaderExtra}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="我的应用"
              bordered={false}
              extra={<Link to="/app/app-manage">更多详情</Link>}
              loading={dashboard.myAppsLoading}
              bodyStyle={{ padding: 0 }}
            >
              {
                dashboard.myAppsData.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Avatar size="small" src={FILE_SERVER + item.logoFile} />
                            <Link to={`/app/app-profile/${item.id}`}>{item.name}</Link>
                          </div>
                        )}
                        description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <a>{item.status}</a>
                        {item.updateDate && (
                          <span className={styles.datetime} title={item.updateDate}>
                            {moment(item.updateDate).format('YYYY-MM-DD')}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))
              }
            </Card>
            <Card
              bodyStyle={{ padding: 20 }}
              bordered={false}
              className={styles.activeCard}
              title="我的能力"
              extra={<Link to={{ pathname: '/app/app-monitor', query: { abilityId: -1 } }}>更多详情</Link>}
              loading={dashboard.myAbilitiesLoading}
            >
              <MyAbilitiesTable data={dashboard.myAbilitiesData} dispatch={this.props.dispatch} />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="我的动态"
            >
              <List size="large">
                <div className={styles.activitiesList}>
                  {this.renderActivities()}
                </div>
              </List>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
