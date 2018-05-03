import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as oauth from '../services/oauth';

export default {
  namespace: 'retrieve',

  state: {
    curUserId: -1,
  },

  effects: {
    *verifyRetrieveCaptcha({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(oauth.verifyRetrieveCaptcha, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeCurUserId', payload: response.content.userId });
      yield put(routerRedux.push('/index/retrieve-password/reset')); // 跳转到下一步页面
    },
    *sendCaptcha({ payload }, { call }) {
      const response = yield call(oauth.sendRetrieveCaptcha, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
    },
    *changePassword({ payload }, { call, put, select }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const userId = yield select(state => state.retrieve.curUserId);
      const response = yield call(oauth.changePassword, { ...payload, userId });
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put(routerRedux.push('/index/retrieve-password/result')); // 跳转到下一步页面
    },
  },

  reducers: {
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    changeCurUserId(state, { payload }) {
      return {
        ...state,
        curUserId: payload,
      };
    },
  },
};
