import { message } from 'antd';
import * as app from '../services/app';
import * as ability from '../services/ability';

export default {

  namespace: 'dashboard',

  state: {
    myAppsLoading: false,
    myAbilitiesLoading: false,
    myMomentsLoading: false,

    myAppsData: [],
    myAbilitiesData: [],
    myAbilityInvokeLogTotalCount: 0,
    myAbilityInvokeLogRankingIndex: 0,
  },

  effects: {
    *listMyApps(_, { call, put }) {
      yield put({ type: 'myAppsLoading', payload: true });
      const response = yield call(app.listAllApp);
      yield put({ type: 'myAppsLoading', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeMyAppsData', payload: response.content });
    },
    *listMyAbilities({ payload }, { call, put }) {
      yield put({ type: 'myAbilitiesLoading', payload: true });
      const response = yield call(ability.listMyAbilities, payload);
      yield put({ type: 'myAbilitiesLoading', payload: false });
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeMyAbilitiesData', payload: response.content });
    },
    *countMyAbilityInvokeLogTotal(_, { call, put }) {
      const response = yield call(ability.countMyAbilityInvokeLogTotal);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeMyAbilityInvokeLogTotalCount', payload: response.content });
    },
    *indexMyAbilityInvokeLogRanking(_, { call, put }) {
      const response = yield call(ability.indexMyAbilityInvokeLogRanking);
      if (response.code === 'error') { message.error(response.reason); return; }
      yield put({ type: 'changeMyAbilityInvokeLogRankingIndex', payload: response.content });
    },
  },

  reducers: {
    changeMyAppsLoading(state, { payload }) {
      return { ...state, myAppsLoading: payload };
    },
    changeMyAbilitiesLoading(state, { payload }) {
      return { ...state, myAbilitiesLoading: payload };
    },
    changeMyMomentsLoading(state, { payload }) {
      return { ...state, myMomentsLoading: payload };
    },
    changeMyAppsData(state, { payload }) {
      return { ...state, myAppsData: payload };
    },
    changeMyAbilitiesData(state, { payload }) {
      return { ...state, myAbilitiesData: payload };
    },
    changeMyAbilityInvokeLogTotalCount(state, { payload }) {
      return { ...state, myAbilityInvokeLogTotalCount: payload };
    },
    changeMyAbilityInvokeLogRankingIndex(state, { payload }) {
      return { ...state, myAbilityInvokeLogRankingIndex: payload };
    },
  },
};
