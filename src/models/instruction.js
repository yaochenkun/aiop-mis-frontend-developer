import { message } from 'antd';
import * as instruction from '../services/instruction';

export default {
  namespace: 'instruction',

  state: {
    submitting: false,
    result: '',
  },

  effects: {
    *invokeWordSeg({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeWordSeg, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeWordPos({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeWordPos, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeWordNer({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeWordNer, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeDependencyParse({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeDependencyParse, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeTextKeywords({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeTextKeywords, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeTextSummaries({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeTextSummaries, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeTextPhrases({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeTextPhrases, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeWord2Vec({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeWord2Vec, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeWord2Pinyin({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeWord2Pinyin, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeSimplified2Traditional({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeSimplified2Traditional, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeTraditional2Simplified({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeTraditional2Simplified, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeWordSim({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeWordSim, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeDocumentSim({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeDocumentSim, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeNearestWords({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeNearestWords, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      console.log(response);
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeTextSuggester({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeTextSuggester, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeMotionClassify({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeMotionClassify, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeCategoryClassify({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeCategoryClassify, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
    *invokeFaceSim({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true });
      const response = yield call(instruction.invokeFaceSim, payload);
      yield put({ type: 'changeSubmitting', payload: false });
      if (response.error_code !== undefined) message.error(response.error_msg);
      else message.success('调用成功');
      yield put({ type: 'changeResult', payload: response }); // 更新当前调用结果
    },
  },

  reducers: {
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    changeResult(state, { payload }) {
      return { ...state, result: payload };
    },
  },
};
