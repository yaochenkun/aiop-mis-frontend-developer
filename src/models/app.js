import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as app from '../services/app';
import * as ability from '../services/ability';
import { PAGE_SIZE } from './../common/config';

export default {

  namespace: 'app',

  state: {
    submitting: false,
    loading: false,
    appTableData: { list: [], pagination: { pageSize: PAGE_SIZE, total: 0 } },
    curApp: {},
    curAbilityUnderAppList: [],

    // Creation
    abilityCheckboxData: [],

    // Profile
    enhanceAbilityModalVisible: false,
    curAbilityUnderApp: {},

    // Monitor
    myAppsData: [],
    myAbilitiesData: [],
    abilityInvokeLogStatisticData: [],
  },

  effects: {
    *add({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(app.addApp, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put(routerRedux.push('/app/app-manage'));
    },
    *occupyAbility({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(app.occupyAbility, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'listAbilityUnderApp', payload: { id: payload.appId } });
    },
    *list({ payload }, { call, put }) {
      yield put({ type: 'changeLoading', payload: true });
      const response = yield call(app.listApp, payload);
      yield put({ type: 'changeLoading', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeAppTableData', payload: { ...response.content, pageNow: payload.pageNow } });
    },
    *listMyApps(_, { call, put }) {
      const response = yield call(app.listAllApp);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeMyAppsData', payload: response.content });
    },
    *listMyAbilities(_, { call, put }) {
      const response = yield call(ability.listAllAbility);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeMyAbilitiesData', payload: response.content });
    },
    *listAllAbility(_, { call, put }) {
      const response = yield call(ability.listAllAbility);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeAbilityCheckboxData', payload: response.content });
    },
    *listAbilityUnderApp({ payload }, { call, put }) {
      const response = yield call(app.listAbilityUnderApp, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeCurAbilityUnderAppList', payload: response.content });
    },
    *listAbilityInvokeLogStatistic({ payload }, { call, put }) {
      const response = yield call(ability.listAbilityInvokeLogStatistic, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeAbilityInvokeLogStatisticData', payload: response.content });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(app.deleteApp, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'list', payload: { pageSize: PAGE_SIZE, pageNow: 1 } }); // 刷新表格
    },
    *cancelAbility({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(app.cancelAbility, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'listAbilityUnderApp', payload: { id: payload.appId } });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(app.getApp, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeCurApp', payload: response.content });
    },
    *updateStatus({ payload }, { call, put }) {
      const response = yield call(app.updateAppStatus, payload);
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'changeCurAppStatus', payload: payload.status });
    },
    *updateAbilityLimit({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(app.updateAbilityLimit, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      message.success(response.reason);
      yield put({ type: 'changeEnhanceAbilityModalVisible', payload: false }); // 关闭对话框
      yield put({ type: 'listAbilityUnderApp', payload: { id: payload.appId } });
    },
  },

  reducers: {
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    changeAppTableData(state, { payload }) {
      return { ...state, appTableData: { list: payload.data, pagination: { ...state.appTableData.pagination, current: payload.pageNow, total: payload.rowTotal } } };
    },
    changeCurApp(state, { payload }) {
      return { ...state, curApp: payload };
    },
    changeCurAbilityUnderAppList(state, { payload }) {
      return { ...state, curAbilityUnderAppList: payload };
    },
    changeCurAppStatus(state, { payload }) {
      return { ...state, curApp: { ...state.curApp, status: payload } };
    },
    changeEnhanceAbilityModalVisible(state, { payload }) {
      return { ...state, enhanceAbilityModalVisible: payload };
    },
    changeCurAbilityUnderApp(state, { payload }) {
      return { ...state, curAbilityUnderApp: payload };
    },
    changeAbilityCheckboxData(state, { payload }) {
      return { ...state, abilityCheckboxData: payload };
    },
    changeMyAppsData(state, { payload }) {
      return { ...state, myAppsData: payload };
    },
    changeMyAbilitiesData(state, { payload }) {
      return { ...state, myAbilitiesData: payload };
    },
    changeAbilityInvokeLogStatisticData(state, { payload }) {
      return { ...state, abilityInvokeLogStatisticData: payload };
    },
  },
};
