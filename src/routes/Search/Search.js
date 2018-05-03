import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Card, Form } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchList from './SearchList';
import { PAGE_SIZE } from '../../common/config';

@connect(state => ({
  search: state.search,
}))
@Form.create()
export default class Search extends Component {
  state = {
    formValues: { keyword: this.props.location.query ? this.props.location.query.keyword : '' }, // 表单的筛选值
  };

  // 1.初始进入
  componentDidMount = () => {
    this.fetchTableData(1, this.state.formValues);
  }

  // 2.点击翻页
  handleListChange = (pageNow) => {
    this.fetchTableData(pageNow, this.state.formValues);
  }

  // 4.点击查询
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.fetchTableData(1, values);
    });
  }

  // ok:正式请求列表数据
  fetchTableData = (pageNow, formValues) => {
    this.setState({ formValues });
    const params = { pageSize: PAGE_SIZE, pageNow, ...formValues };
    this.props.dispatch({ type: 'search/list', payload: params });
  }

  render() {
    const { search, form } = this.props;
    const { getFieldDecorator } = form;
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Form>
          {getFieldDecorator('keyword', { initialValue: this.props.location.query ? this.props.location.query.keyword : '' })(
            <Input.Search
              placeholder="请输入关键词"
              enterButton="搜索"
              size="large"
              onSearch={this.handleSearch}
              style={{ width: 522, marginBottom: 20 }}
            />
          )}
        </Form>
      </div>
    );

    return (
      <PageHeaderLayout
        title="站内搜索"
        content={mainSearch}
      >
        <Card bordered={false}>
          <SearchList loading={search.loading} data={search.searchResultData} onChange={this.handleListChange} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
