import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as oauth from '../services/oauth';

export default {
  namespace: 'register',

  state: {
    curUser: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(oauth.submitRegister, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeCurUser', payload }); // 更新成功注册的用户信息
      // todo: 请求发送账户信息邮件
      yield put(routerRedux.push('/index/register-result')); // 自动跳转到注册结果页面
    },
    *sendCaptcha({ payload }, { call }) {
      const response = yield call(oauth.sendRegisterCaptcha, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
    },
  },

  reducers: {
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    changeCurUser(state, { payload }) {
      return { ...state, curUser: payload };
    },
  },
};
