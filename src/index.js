import browserHistory from 'history/createBrowserHistory';
import { routerRedux } from 'dva/router';
import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import './g2';
import './rollbar';
import './index.less';
import router from './router';

// 1. Initialize
const app = dva({
  history: browserHistory(),
  onError(err, dispatch) {
    dispatch(routerRedux.push(`/exception/${err.response.status}`));
  },
});

// 2. Plugins
// app.use(createLoading());

// 3. Register global model
app.model(require('./models/global'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
