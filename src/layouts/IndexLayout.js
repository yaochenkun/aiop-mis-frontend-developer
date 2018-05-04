import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './IndexLayout.less';


const copyright = <div>Copyright <Icon type="copyright" /> 2018 北京邮电大学交换与智能控制中心出品</div>;

class IndexLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { getRouteData, location } = this.props;
    const { pathname } = location;
    let title = '感观工厂';
    getRouteData('IndexLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - 感观工厂`;
      }
    });
    return title;
  }
  render() {
    const { getRouteData } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo} src="/logo.png" />
                <span className={styles.title}>感&nbsp;观&nbsp;工&nbsp;厂</span>
              </Link>
            </div>
            <div className={styles.desc}>人工智能能力开放平台</div>
          </div>
          {
            getRouteData('IndexLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          <GlobalFooter className={styles.footer} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default IndexLayout;
