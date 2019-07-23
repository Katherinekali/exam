import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
//引入模块
import Main from './pages/main/main';
import Login from "./pages/login/loginPage"
import Forbidden from "./pages/message/forbidden"
import Unreal from "./pages/message/unreal"
import {connect} from 'dva'
// 引入国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from '../src/language/zh_US';
import enUS from '../src/language/en-US';
// 配置国际化字典
const localMap = {
  en: enUS,
  zh: zhCN
}
addLocaleData([...en, ...zh]);
// antd-------UI-----国际化-----弹框-分页等展示中文
// import {LocaleProvider} from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
//<LocaleProvider locale={zh_CN}>--------</LocaleProvider>
const mapStateToProps = state=>{
  return {
    locale: state.global.locale
  }
}
let RouterView = connect(mapStateToProps)((props)=>{
    return (
      <IntlProvider locale={props.locale} messages={localMap[props.locale]}>
        <Router history={props.history}>
          <Switch>
            <Route path="/main"  component={Main}/>
            <Route path="/login"  component={Login}/>
            <Route path="/403"  component={Forbidden}/>
            <Route path="/404"  component={Unreal}/>
            <Redirect exact from ="/" to="/main"/>
          </Switch>
        </Router>
      </IntlProvider>
    );
})     
function RouterConfig({ history }) {
  return <RouterView history={history} />
}
export default RouterConfig;
