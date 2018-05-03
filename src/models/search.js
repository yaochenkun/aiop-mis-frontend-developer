import { message } from 'antd';
import * as search from '../services/search';
import { PAGE_SIZE } from './../common/config';

export default {

  namespace: 'search',

  state: {
    loading: false,
    searchResultData: { list: [], pagination: { pageSize: PAGE_SIZE, total: 0, showTotal: total => `共 ${total} 条记录` } },
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({ type: 'changeLoading', payload: true });
      const response = yield call(search.listSearchResult, payload);
      yield put({ type: 'changeLoading', payload: false });
      if (response.code === 'error') { message.error(response.reason); }
      yield put({ type: 'changeSearchResultData', payload: { ...response.content, pageNow: payload.pageNow } });
    },
  },

  reducers: {
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    changeSearchResultData(state, { payload }) {
      return { ...state, searchResultData: { list: payload.data, pagination: { ...state.searchResultData.pagination, current: payload.pageNow, total: payload.rowTotal } } };
    },
  },
};
