import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false,
  },

  effects: {
    *fetchNotices(_, { put }) {
      yield put({ type: 'changeNoticeLoading', payload: true });
      const data = [{
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '您的短文本相似度能力需要续费',
        datetime: '2017-08-09',
        type: '通知',
      }, {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '近期平台将进行升级与维护公告',
        datetime: '2017-08-08',
        type: '通知',
      }, {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '新增能力情感倾向分析（五分类）',
        datetime: '2017-08-07',
        read: true,
        type: '通知',
      }, {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '原有中文分词能力内部算法调整',
        datetime: '2017-08-07',
        type: '通知',
      }, {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '您的白金开发者会员还有1周到期',
        datetime: '2017-08-07',
        type: '通知',
      }, {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        title: '人工客服0019 回复了您',
        description: '不好意思，由于平台最近在维护升级，给您造成的不便还请谅解。',
        datetime: '2017-08-07',
        type: '消息',
      }, {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        title: '人工客服0023 回复了您',
        description: '目前本平台暂时无法提供自动问答能力，我们会争取在今年内提供。',
        datetime: '2017-08-07',
        type: '消息',
      }, {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        title: '机器人客服0002 回复了您',
        description: '请问有什么问题需要我来帮助吗？我是本平台创造的机器人客服~',
        datetime: '2017-08-07',
        type: '消息',
      }, {
        id: '000000009',
        title: '提升文本分类的配额上限',
        description: '该能力的配额需要在 2017-11-12 20:00 前提升',
        extra: '未开始',
        status: 'todo',
        type: '待办',
      }, {
        id: '000000010',
        title: '开发者会员账号即将到期',
        description: '到期时间为 2017-12-06，务必在该日期前完成续费',
        extra: '马上到期',
        status: 'urgent',
        type: '待办',
      }, {
        id: '000000011',
        title: '新增自动问答能力',
        description: '平台已接入自动问答能力，需在 2018-01-09 前同步更新至平台管理系统',
        extra: '已耗时 8 天',
        status: 'doing',
        type: '待办',
      }, {
        id: '000000012',
        title: '应用的能力调用异常处理',
        description: '从2017-11-08起应用的能力调用出现异常，需在 2017-12-08 前联系客服解决',
        extra: '进行中',
        status: 'processing',
        type: '待办',
      }];
      yield put({ type: 'saveNotices', payload: data });
      yield put({ type: 'user/changeNotifyCount', payload: data.length });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({ type: 'saveClearedNotices', payload });
      const count = yield select(state => state.global.notices.length);
      yield put({ type: 'user/changeNotifyCount', payload: count });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return { ...state, collapsed: payload };
    },
    saveNotices(state, { payload }) {
      return { ...state, notices: payload, fetchingNotices: false };
    },
    saveClearedNotices(state, { payload }) {
      return { ...state, notices: state.notices.filter(item => item.type !== payload) };
    },
    changeNoticeLoading(state, { payload }) {
      return { ...state, fetchingNotices: payload };
    },
    transferLoginSession(state) {
      sessionStorage.setItem('token', localStorage.getItem('token'));
      sessionStorage.setItem('userId', localStorage.getItem('userId'));
      sessionStorage.setItem('expiredTime', localStorage.getItem('expiredTime'));
      return state;
    },
    clearLoginSession(state) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('expiredTime');
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

  subscriptions: {
    setup({ dispatch, history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }

        // 不拦截首页的所有页面：登录页、注册页、找回密码
        if (pathname.split('/')[1] === 'index') return;

        // 1.登录拦截判断
        // 判断localStorage中是否有token(自动登录)
        let token = localStorage.getItem('token');
        let expiredTime = localStorage.getItem('expiredTime');
        if (token !== null) {
          if (new Date().getTime() < expiredTime) {
            dispatch({ type: 'transferLoginSession' }); // 有效，可以自动登录
            return; // 放行
          } else {
            dispatch({ type: 'clearLoginLocal' }); // 时效已过，清除
          }
        }

        // 判断sessionStorage中是否有token
        token = sessionStorage.getItem('token');
        if (token === null) {
          message.error('请先登录');
          dispatch(routerRedux.push('/index/login'));
          return;
        }

        // 判断token时效性
        expiredTime = sessionStorage.getItem('expiredTime'); // 获取过期时间戳
        if (new Date().getTime() > expiredTime) {
          dispatch({ type: 'clearLoginSession' });
          message.error('已过期请重新登录');
          dispatch(routerRedux.push('/index/login'));
        }

        // 2.页面角色权限拦截判断
        // ...
      });
    },
  },
};
