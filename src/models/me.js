import { message } from 'antd';
import * as user from '../services/user';
import * as oauth from '../services/oauth';

export default {

  namespace: 'me',

  state: {
    passwordSubmitting: false,
    mobileSubmitting: false,
    emailSubmitting: false,
  },

  effects: {
    *updatePassword({ payload }, { call, put }) {
      yield put({ type: 'changePasswordSubmitting', payload: true });
      const response = yield call(user.updatePassword, payload);
      yield put({ type: 'changePasswordSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
    },
    *updateMobile({ payload }, { call, put }) {
      yield put({ type: 'changeMobileSubmitting', payload: true });
      const response = yield call(user.updateMobile, payload);
      yield put({ type: 'changeMobileSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'user/fetchCurrentUser' }); // 强制查一下当前用户，更新上方的信息
    },
    *updateEmail({ payload }, { call, put }) {
      yield put({ type: 'changeEmailSubmitting', payload: true });
      const response = yield call(user.updateEmail, payload);
      yield put({ type: 'changeEmailSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'user/fetchCurrentUser' }); // 强制查一下当前用户，更新上方的信息
    },
    *sendModifyMobileCaptcha({ payload }, { call }) {
      const response = yield call(oauth.sendModifyMobileCaptcha, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
    },
    *sendModifyEmailCaptcha({ payload }, { call }) {
      const response = yield call(oauth.sendModifyEmailCaptcha, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
    },
  },

  reducers: {
    changePasswordSubmitting(state, { payload }) {
      return { ...state, passwordSubmitting: payload };
    },
    changeMobileSubmitting(state, { payload }) {
      return { ...state, mobileSubmitting: payload };
    },
    changeEmailSubmitting(state, { payload }) {
      return { ...state, emailSubmitting: payload };
    },
  },
};
