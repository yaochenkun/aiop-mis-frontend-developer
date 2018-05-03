import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [

  // 导航栏页面
  {
    // for admin
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '概览',
        icon: 'dashboard',
        path: 'dashboard',
        component: dynamicWrapper(app, ['dashboard', 'user'], () => import('../routes/Dashboard/Dashboard')),
      },
      {
        name: '个人中心',
        icon: 'home',
        path: 'me',
        component: dynamicWrapper(app, ['me'], () => import('../routes/Me/Me')),
      },
      {
        name: '应用管理',
        icon: 'appstore-o',
        path: 'app',
        children: [
          {
            name: '创建应用',
            path: 'app-creation',
            component: dynamicWrapper(app, ['app'], () => import('../routes/App/Creation')),
          },
          {
            name: '应用列表',
            path: 'app-manage',
            component: dynamicWrapper(app, ['app'], () => import('../routes/App/Manage')),
          },
          {
            name: '监控图表',
            path: 'app-monitor',
            component: dynamicWrapper(app, ['app'], () => import('../routes/App/Monitor')),
          },
          {
            name: '应用列表',
            path: 'app-profile',
            isHide: true,
            children: [{
              name: '应用详情',
              path: ':id',
              component: dynamicWrapper(app, ['app'], () => import('../routes/App/Profile')),
            }],
          },
        ],
      },
      {
        name: '技术文档',
        icon: 'book',
        path: 'instruction',
        component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction')),
        children: [
          {
            path: 'summary',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/Summary')),
          },
          {
            path: 'ability-list',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/AbilityList')),
          },
          {
            path: 'access-token',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/AccessToken')),
          },
          {
            path: 'use-case',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/UseCase')),
          },
          {
            path: 'error-code',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/ErrorCode')),
          },
          {
            path: 'word-seg',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/WordSeg')),
          },
          {
            path: 'word-pos',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/WordPos')),
          },
          {
            path: 'word-ner',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/WordNer')),
          },
          {
            path: 'dependency-parse',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/DependencyParse')),
          },
          {
            path: 'text-keywords',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/TextKeywords')),
          },
          {
            path: 'text-summaries',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/TextSummaries')),
          },
          {
            path: 'text-phrases',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/TextPhrases')),
          },
          {
            path: 'word-2-vec',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/Word2Vec')),
          },
          {
            path: 'word-2-pinyin',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/Word2Pinyin')),
          },
          {
            path: 'simplified-2-traditional',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/Simplified2Traditional')),
          },
          {
            path: 'traditional-2-simplified',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/Traditional2Simplified')),
          },
          {
            path: 'word-sim',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/WordSim')),
          },
          {
            path: 'document-sim',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/DocumentSim')),
          },
          {
            path: 'nearest-words',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/NearestWords')),
          },
          {
            path: 'text-suggester',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/TextSuggester')),
          },
          {
            path: 'motion-classify',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/MotionClassify')),
          },
          {
            path: 'category-classify',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/CategoryClassify')),
          },
          {
            path: 'face-sim',
            component: dynamicWrapper(app, ['instruction'], () => import('../routes/Instruction/FaceSim')),
          },
        ],
      },
      {
        name: '站内搜索',
        icon: 'search',
        path: 'search',
        component: dynamicWrapper(app, ['search'], () => import('../routes/Search/Search')),
      },
      {
        path: 'exception',
        children: [
          {
            path: '403',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
          },
          {
            path: '404',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
          },
          {
            path: '500',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
          },
        ],
      },
    ],
  },

  // 首页（登录、注册、注册成功、找回密码）
  {
    component: dynamicWrapper(app, [], () => import('../layouts/IndexLayout')),
    path: '/',
    layout: 'IndexLayout',
    children: [
      {
        path: 'index',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/Index/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/Index/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/Index/RegisterResult')),
          },
          {
            name: '忘记密码',
            path: 'retrieve-password',
            component: dynamicWrapper(app, ['retrieve'], () => import('../routes/Index/RetrievePassword')),
            children: [
              {
                path: 'verify',
                component: dynamicWrapper(app, ['retrieve'], () => import('../routes/Index/RetrievePassword/VerifyStep1')),
              },
              {
                path: 'reset',
                component: dynamicWrapper(app, ['retrieve'], () => import('../routes/Index/RetrievePassword/ResetStep2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(app, ['retrieve'], () => import('../routes/Index/RetrievePassword/ResultStep3')),
              },
            ],
          },
        ],
      },
    ],
  },
];
