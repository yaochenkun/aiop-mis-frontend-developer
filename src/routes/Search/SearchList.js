import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import Ellipsis from '../../components/Ellipsis';

export default class SearchList extends PureComponent {
  // 翻页
  handleListChange = (pageNow) => {
    this.props.onChange(pageNow);
  }

  render() {
    const { data, loading } = this.props;
    return (
      <List
        itemLayout="vertical"
        loading={loading}
        dataSource={data.list}
        pagination={{ ...data.pagination, onChange: pageNow => this.handleListChange(pageNow) }}
        renderItem={record => (
          <List.Item>
            <List.Item.Meta
              title={<a href={record.link}><span dangerouslySetInnerHTML={{ __html: record.title }} /></a>}
              description={<Link to={record.link}>{record.link}</Link>}
            />
            <Ellipsis lines={3}><span dangerouslySetInnerHTML={{ __html: record.content }} /></Ellipsis>
          </List.Item>
          )}
      />
    );
  }
}
