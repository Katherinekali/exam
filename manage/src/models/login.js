import {login,userInfor,getUserInfo,upLoad,updateUser} from "../services/index"
import {setToken,getToken} from "../utils/index"
import {routerRedux} from "dva/router"
export default {
  //命名空间：
  namespace: 'login',
  //模块状态：
  state: {
      isLogin:-1,
      userInfo:{},
      mes:-1
  },
  //订阅：
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line  在这里监听url状况----利用redux做路由跳转
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
        if(getToken()){
          dispatch({
            type:"getUserInfo"
          })
        }
        
      });
    },
  },
  //异步方法：
  effects: {
    *login({ payload,type }, { call, put }) {  // eslint-disable-line
          let data=yield call(login,payload)   //返回值data就是登录状态，成功或者失败
          console.log(data)
          if(data.code===1){
            setToken(data.token)
            let user=yield call(userInfor)
            localStorage.setItem("userInfor",JSON.stringify(user))
          }
          //相当于dispatch修改action
          yield put({
              type:"updataLogin",
              payload:data.code
          })
    },
    *getUserInfo(action,{call,put,select}){
      let userInfo=yield select(state=>state.login.userInfo)
      if(Object.keys(userInfo).length){
        return 
      }
      let data=yield getUserInfo()
      console.log(data,"=================")
      yield put({
        type:"updateUserInfo",
        payload:data.data
      })
    },
    *load({payload},{call,put,select}){
      console.log(payload)
      let data=yield upLoad(payload)
      if(data.code===1){
        let userInfo=yield select(state=>state.login.userInfo)
        if(Object.keys(userInfo).length){
          yield put({
            type:"updateUser",
            payload:{user_id:userInfo.user_id,avatar:data.data[0].path}
          })
        }
      }
    },
    *updateUser({payload},{call,put}){
      let data=yield updateUser(payload)
      console.log(data)
      let data1=yield getUserInfo()
      console.log(data,"=================")
      yield put({
        type:"updateUserInfo",
        payload:data1.data
      })
      yield put({
        type:"MesInfo",
        payload:data.code
      })
    }
  },
  //同步方法：只能在这里修改state
  reducers: {
    updataLogin(state, action) {
          return {...state,isLogin:action.payload}
    },
    updateUserInfo(state,action){
      return {...state,userInfo:action.payload}
    },
    MesInfo(state,action){
      return {...state,mes:action.payload}

    },
    change(state,action){
      return {...state,mes:-1}

    }
   
  },
};