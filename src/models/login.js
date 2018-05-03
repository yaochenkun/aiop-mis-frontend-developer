import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as oauth from '../services/oauth';

export default {
  namespace: 'login',

  state: {
    // status: undefined,
  },

  effects: {
    *verifyAccountLogin({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(oauth.verifyAccountLogin, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'saveLoginSession', payload: response }); // 将登录状态存入sessionStorage
      if (payload.remember === true) yield put({ type: 'saveLoginLocal', payload: response }); // 将登录状态存入localStorage
      yield put(routerRedux.push('/dashboard'));
    },
    *verifyMobileLogin({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(oauth.verifyMobileLogin, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'saveLoginSession', payload: response }); // 将登录状态存入全局变量表
      if (payload.remember === true) yield put({ type: 'saveLoginLocal', payload: response }); // 将登录状态存入localStorage
      yield put(routerRedux.push('/dashboard'));
    },
    *logout(_, { put }) {
      yield put({ type: 'clearLoginSession' }); // 清空登录状态
      yield put({ type: 'clearLoginLocal' }); // 清空登录状态
      yield put(routerRedux.push('/index/login'));
    },
    *sendCaptcha({ payload }, { call }) {
      const response = yield call(oauth.sendLoginCaptcha, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
    },
  },

  reducers: {
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    saveLoginSession(state, { payload }) {
      sessionStorage.setItem('token', payload.content.token);
      sessionStorage.setItem('userId', payload.content.id);
      sessionStorage.setItem('expiredTime', payload.content.duration);
      return state;
    },
    clearLoginSession(state) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('expiredTime');
      return state;
    },
    saveLoginLocal(state, { payload }) {
      localStorage.setItem('remember', true);
      localStorage.setItem('token', payload.content.token);
      localStorage.setItem('userId', payload.content.id);
      localStorage.setItem('expiredTime', payload.content.duration);
      return state;
    },
    clearLoginLocal(state) {
      localStorage.removeItem('remember');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expiredTime');
      return state;
    },
  },

};
