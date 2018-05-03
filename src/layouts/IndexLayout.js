import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './IndexLayout.less';


const copyright = <div>Copyright <Icon type="copyright" /> 2017 北京邮电大学交换与智能控制中心出品</div>;

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
    let title = 'NLP能力开放平台';
    getRouteData('IndexLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - NLP能力开放平台`;
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
                <span className={styles.title}>自然语言处理能力开放平台</span>
              </Link>
            </div>
            <div className={styles.desc}>提供分词、实体标注、词向量表示、文本分类、情感分析等多项NLP技术</div>
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
