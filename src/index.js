import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';
const app = dva({
history: createHistory(),
})
// import { browserHistory } from 'dva/router'

// const app = dva({
//   history: browserHistory
// })

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
