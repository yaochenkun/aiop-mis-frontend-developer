import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Input, Select, Popover, Checkbox, Divider, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './style.less';

const { Option } = Select;


const fieldLabels = {
  name: '应用名称',
  type: '应用类别',
  platform: '开发平台',
  description: '应用描述',
};

@connect(state => ({
  collapsed: state.global.collapsed,
  app: state.app,
}))
@Form.create()
export default class AdvancedForm extends PureComponent {
  componentDidMount = () => {
    this.props.dispatch({ type: 'app/listAllAbility' });
  }
  render() {
    const { app, form, dispatch } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const handleSubmit = () => {
      validateFieldsAndScroll((error) => {
        if (!error) showSubmitConfirm();
      });
    };
    const showSubmitConfirm = () => {
      Modal.confirm({
        title: '请再次核对应用信息填写是否正确?',
        content: '应用创建成功后信息将无法修改',
        onOk() {
          validateFieldsAndScroll((error, values) => {
            if (!error) {
              dispatch({ type: 'app/add', payload: values });
            }
          });
        },
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };

    // 组装多选按钮
    const basicAbilityCheckboxes = app.abilityCheckboxData.filter(data => data.type === '基础算法').map(data => <Col span={8} style={{ marginBottom: 10 }} key={data.id}>{getFieldDecorator(data.enName, { valuePropName: 'checked', initialValue: true })(<Checkbox>{data.zhName}</Checkbox>)}</Col>);
    const modelAbilityCheckboxes = app.abilityCheckboxData.filter(data => data.type === '模型算法').map(data => <Col span={8} style={{ marginBottom: 10 }} key={data.id}>{getFieldDecorator(data.enName, { valuePropName: 'checked', initialValue: true })(<Checkbox>{data.zhName}</Checkbox>)}</Col>);
    return (
      <PageHeaderLayout
        title="创建应用"
        content="填写您想创建的应用基本信息，并为应用选择需要的能力。"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="应用信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={8}>
              <Col lg={8} md={14} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator('name', { rules: [{ required: true, message: '请填写应用名称' }] })(
                    <Input placeholder="请输入应用名称" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', { rules: [{ required: true, message: '请选择应用类别' }] })(
                    <Select placeholder="请选择应用类别">
                      <Option value="游戏娱乐">游戏娱乐</Option>
                      <Option value="工具应用">工具应用</Option>
                      <Option value="交通出行">交通出行</Option>
                      <Option value="学习办公">学习办公</Option>
                      <Option value="智能硬件">智能硬件</Option>
                      <Option value="聊天社交">聊天社交</Option>
                      <Option value="其它">其它</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.platform}>
                  {getFieldDecorator('platform', { rules: [{ required: true, message: '请选择开发平台' }] })(
                    <Select placeholder="请选择开发平台">
                      <Option value="Web">Web</Option>
                      <Option value="iOS">iOS</Option>
                      <Option value="Android">Android</Option>
                      <Option value="WP">WP</Option>
                      <Option value="Windows">Windows</Option>
                      <Option value="Linux">Linux</Option>
                      <Option value="其它">其它</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={12} sm={24}>
                <Form.Item label={fieldLabels.description}>
                  {getFieldDecorator('description', { rules: [{ required: true, message: '请填写应用描述' }] })(
                    <Input.TextArea placeholder="简单描述一下您使用NLP服务的应用场景，如开发一款新闻推荐软件，需要进行文本分类，请控制在500字以内" rows={5} style={{ resize: 'none' }} />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="选择能力" className={styles.card} bordered={false}>
          <Row>
            <Col span={12} style={{ borderRight: '1px solid #E9E9E9', paddingRight: 10 }}>
              <Divider>基础算法</Divider>
              <Row style={{ marginBottom: 10 }}>
                {basicAbilityCheckboxes}
              </Row>
            </Col>
            <Col span={12} style={{ paddingLeft: 10 }}>
              <Divider>模型算法</Divider>
              <Row style={{ marginBottom: 10 }}>
                {modelAbilityCheckboxes}
              </Row>
            </Col>
          </Row>
        </Card>
        <FooterToolbar>
          {getErrorInfo()}
          <Button type="primary" onClick={handleSubmit} loading={app.submitting}>
            确认创建
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
