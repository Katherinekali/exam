import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import Main from './pages/main/main';
import Login from "./pages/login/loginPage"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main"  component={Main} />
        <Route path="/login"  component={Login} />
        <Redirect from ="/" to="/login"></Redirect>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
