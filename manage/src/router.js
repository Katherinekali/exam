import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import Main from './pages/main/main';
//国际化-----展示中文
import Login from "./pages/login/loginPage"
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route path="/main"  component={Main} />
          <Route path="/login"  component={Login} />
          <Redirect from ="/" to="/login"></Redirect>
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
