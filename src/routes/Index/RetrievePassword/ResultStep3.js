import React from 'react';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

export default ({ dispatch }) => {
  const onFinish = () => {
    dispatch(routerRedux.push('/index/login'));
  };

  const actions = (
    <div>
      <Button type="primary" onClick={onFinish}>
        马上登录
      </Button>
    </div>
  );
  return (
    <Result
      type="success"
      title="密码重置成功"
      actions={actions}
      className={styles.result}
    />
  );
};
