import React from 'react';
import { connect } from 'dva';
import { Route,Redirect,Switch} from 'dva/router';
import styles from "./main.css"
import {Spin } from 'antd';
//引入组件
import Header from "../../components/header/header"
import Sidebar from "../../components/sidebar/sidebar"
function IndexPage(props) {
  // if(!props.myView.length){return null;}
  return (
    <div className={styles.layout}>
        <Header></Header>
      <div className={styles.layout_content}>
        <Sidebar></Sidebar>
        <div className={styles.content}>
          <div className={styles.layout_main}>   
            <Switch>
              <Redirect  exact from="/main" to="/main/addquestion"></Redirect> 
              {/* 配置用户拥有的路由 */}
              {
                props.myView.map(item=>{
                  return item.children.map(value=>{
                    return <Route path={value.path} component={value.component} key={value.path}></Route>
                  })
                })
              }
              {/* 配置用户禁止访问的路由 */}
              {
                props.forbiddenView.map(item=>{
                  return <Redirect  from={item.path} to="/403" key={item.path}></Redirect>
                })
              }
              {/* <Redirect exact to="/404"/> */}
            </Switch>
          </div>
          {props.global ? <div className={styles.loading}><Spin /></div> : null}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    ...state.checkTheItem,
    global: state.loading.global,
    myView:state.login.myView,
    forbiddenView:state.login.forbiddenView
  };
};
export default connect(mapStateToProps)(IndexPage);
