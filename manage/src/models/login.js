import {login,getUserInfor,getViewAuthority} from "../services/index"
import {setToken,getToken} from "../utils/index"
import {routerRedux} from "dva/router"
import allAuthority from "../routers/config"
export default {
  //命名空间：
  namespace: 'login',
  //模块状态：
  state: {
      isLogin:-1,
      userInfo: {},
      myView: [],   //授权的视图
      forbiddenView: []//禁止的视图
  },
  //订阅：
  subscriptions: {
    setup({ dispatch, history }) {  //   在这里监听url状况----利用redux做路由跳转
      return history.listen(({ pathname }) => {
        // 1.判断去的页面是否是登陆页面-----如果不是登录页面
        if (pathname.indexOf('/login') === -1) {
          //  判断是否有登陆态----------如果没有登陆的状态，则跳转到登录页面
          if (!getToken()){                     
            dispatch(routerRedux.replace({
              pathname: `/login`,
              search: `?redirect=${encodeURIComponent(pathname)}` //把输入的页面url进行编码，登录之后再通过这个编码，找到你要去的页面
            }))
          }
        }else{ //如果去的页面是登录页面，判断有没有登陆过，如果登陆过，则直接跳到首页
          if (getToken()){
             dispatch(routerRedux.replace({
              pathname: `/main`,
            }))
          }
        }
        if(getToken()){    //每次跳路由的时候都进行获取用户信息---如果已经获取过了则不再获取否则会获取-----
           // -------获取用户信息------
           dispatch({
            type: 'getUserInfo'
          })
        }
      });
    },
  },
  //异步方法：
  effects: {
    *login({ payload }, { call, put }) {     //登录
          let data=yield call(login,payload)   // 返回值data就是登录状态，成功或者失败
          if(data.code===1){
            // 1----登录成功----设置cookie
            setToken(data.token)
          }
          // 2--调用reducer改变登录状态------相当用于dispatch修改action
          yield put({
              type:"updataLogin",
              payload:data.code
          })
    },
    *getUserInfo(action, {call, put, select}){   //  3----获取用户信息-----
      //1---判断是否获取过用户信息
      let userInfo = yield select(state=>state.login.userInfo);  
      if (Object.keys(userInfo).length){
        return;
      }
      //2---如果没有获取过，再进行获取用户信息
      let data = yield getUserInfor();       
      yield put({
        type: 'userInfo',
        payload: data
      })
      //3---获取用户的权限信息
      let  authority=yield getViewAuthority()  //所有的用户权限
      yield put({
        type: 'updateViewAuthority',
        payload: authority.data
      })
    },
  },
  //同步方法：只能在这里修改state
  reducers: {
    updataLogin(state, action) {  //登录
          return {...state,isLogin:action.payload}
    },
    userInfo(state, action){  //获取到用户的信息
      return { ...state, userInfo: action.payload };
    },
    reset(state){  //重置用户信息
      return { ...state, userInfo:{} };
    },
    updateViewAuthority(state,action){//把配置的路由表进行分类
      let myView=[];
      let forbiddenView=[];
      //遍历配置的路由表---如果路由表里的子项与用户的权限匹配----如果不匹配
      allAuthority.routes.forEach(item=>{
        let obj={
          name:item.name,
          children:[]
        }
        item.children.forEach(value=>{
            if(action.payload.findIndex(v=>v.view_id===value.view_id)===-1){
              forbiddenView.push(value)
            }else{
              obj.children.push(value)
            }
        })
        myView.push(obj)
      })
      return {...state,myView,forbiddenView}
    }
  },
};