import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Steps, Form } from 'antd';
import VerifyStep1 from './VerifyStep1';
import ResetStep2 from './ResetStep2';
import ResultStep3 from './ResultStep3';
import styles from './style.less';

const { Step } = Steps;

@connect(state => ({
  retrieve: state.retrieve,
}))
@Form.create()
export default class Index extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'verify': return 0;
      case 'reset': return 1;
      case 'result': return 2;
      default: return 0;
    }
  }
  getCurrentComponent() {
    const componentMap = {
      0: VerifyStep1,
      1: ResetStep2,
      2: ResultStep3,
    };
    return componentMap[this.getCurrentStep()];
  }
  render() {
    const { form, dispatch } = this.props;
    const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 9 } };
    const CurrentComponent = this.getCurrentComponent();
    return (
      <Card className={styles.card} bordered={false}>
        <div>
          <Steps current={this.getCurrentStep()} className={styles.steps} style={{ margin: '40px auto' }}>
            <Step title="验证手机号" />
            <Step title="设置新密码" />
            <Step title="重置完成" />
          </Steps>
          <CurrentComponent
            formItemLayout={formItemLayout}
            form={form}
            dispatch={dispatch}
          />
        </div>
      </Card>
    );
  }
}
