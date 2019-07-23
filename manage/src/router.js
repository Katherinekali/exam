import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Main from './pages/main/main';
import { connect } from 'dva';
// 引入国际化
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US.js';

//国际化-----展示中文
import Login from "./pages/login/loginPage"
// import { LocaleProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');



// 配置国际化字典
const localMap = {
  en: enUS,
  zh: zhCN
}
addLocaleData([...en, ...zh]);


const mapStateToProps = state => {
  return {
    locale: state.global.locale
  }
}



let RouterView = connect(mapStateToProps)((props) => {
  return (
    <IntlProvider locale={props.locale} messages={localMap[props.locale]}>
      <Router history={props.history}>
        <Switch>
            <Redirect to="/main/addquestion" from="/" exact></Redirect>
            <Route path="/main"  component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/404" render={props=>{
              return <div style={{width:"100%",height:"100%"}}><img style={{width:"100%",height:"100%"}} alt="" src="http://p4.g.680.com/2018-10/25/20181025151640636631.png"/></div>
            }}></Route>
            <Route path="/403" render={props=>{
              return <div style={{width:"100%",height:"100%"}}><img style={{width:"100%",height:"100%"}} alt="" src="http://s6.sinaimg.cn/bmiddle/003Qfs1Xgy6JxwDVpf775&690"/></div>
            }}></Route>
          </Switch>
      </Router>
    </IntlProvider>
  );
})

function RouterConfig({ history }) {
  return <RouterView history={history} />
}

export default RouterConfig;
