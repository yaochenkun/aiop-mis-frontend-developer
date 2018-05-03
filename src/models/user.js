import { message } from 'antd';
import * as user from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    currentUser: {},
    userCount: 0,
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({ type: 'changeLoading', payload: true });
      const response = yield call(user.getUser);
      yield put({ type: 'save', payload: response });
      yield put({ type: 'changeLoading', payload: false });
    },
    *fetchCurrentUser(_, { call, put }) {
      const userId = sessionStorage.getItem('userId');
      const response = yield call(user.getUser, userId);
      yield put({ type: 'saveCurrentUser', payload: response.content });
    },
    *countDevelopers(_, { call, put }) {
      const response = yield call(user.countDevelopers);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeUserCount', payload: response.content });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
    changeLoading(state, action) {
      return { ...state, loading: action.payload };
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },
    changeNotifyCount(state, action) {
      return { ...state, currentUser: { ...state.currentUser, notifyCount: action.payload } };
    },
    changeUserCount(state, { payload }) {
      return { ...state, userCount: payload };
    },
  },
};
