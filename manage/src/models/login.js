import { login, userInfor, getUserInfo, Upuser, getBaseurl } from "../services/index"
import { setToken, getToken } from "../utils/index"
import { routerRedux } from "dva/router"
export default {
  //命名空间：
  namespace: 'login',
  //模块状态：
  state: {
    isLogin: -1,
    userInfo: {},
    upuser: {},
    imgUrl: ""

  },
  //订阅：
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line  在这里监听url状况----利用redux做路由跳转
      return history.listen(({ pathname }) => {
        // 1.判断去的页面是否是登陆页面-----如果不是登录页面
        if (pathname.indexOf('/login') === -1) {
          //  判断是否有登陆态----------如果没有登陆的状态，则跳转到登录页面
          if (!getToken()) {
            dispatch(routerRedux.replace({
              pathname: `/login`,
              search: `?redirect=${encodeURIComponent(pathname)}` //把输入的页面url进行编码，登录之后再通过这个编码，找到你要去的页面
            }))
          }
        } else { //如果去的页面是登录页面，判断有没有登陆过，如果登陆过，则直接跳到首页
          if (getToken()) {
            dispatch(routerRedux.replace({
              pathname: `/main`,
            }))
          }
        }
        if (getToken()) {
          // 获取用户信息
          dispatch({
            type: 'getUserInfo'
          })
        } else {
          return
        }
      });
    },
  },
  //异步方法：
  effects: {
    *login({ payload, type }, { call, put }) {  // eslint-disable-line
      let data = yield call(login, payload)   //返回值data就是登录状态，成功或者失败
      // console.log(data)
      if (data.code === 1) {
        setToken(data.token)
        let user = yield call(userInfor)
        localStorage.setItem("userInfor", JSON.stringify(user))
      }
      //相当于dispatch修改action
      yield put({
        type: "updataLogin",
        payload: data.code
      })
    },
    *getUserInfo(action, { call, put, select }) {   //获取用户信息
      let userInfo = yield select(state => state.login.userInfo);
      if (Object.keys(userInfo).length) {  //判断有没有获取到用户信息，获取到的是一个对象转成数组,去判断
        return;
      }
      console.log('userInfo...', userInfo);
      let data = yield getUserInfo();
      // console.log('data...', data);
      yield put({
        type: 'updateUserInfo',
        payload: data.data
      })

    },
    //更新用户信息
    *getUserC({ payload, type }, { call, put }) {
      console.log(type, '//////////////////')
      let data = yield call(Upuser, payload);
      console.log(data)
      yield put({
        type: "upusers",
        payload: data
      })
    },
    //获取图片资源地址
    *url({ payload, type }, { call, put }) {
      // console.log(type, "111111111")
      let data = yield call(getBaseurl, payload);
      // console.log(data.data[0].path)
      yield put({
        type: "baseUrl",
        payload: data.data[0].path
      })
    }
  },
  //同步方法：只能在这里修改state
  reducers: {
    updataLogin(state, action) {
      return { ...state, isLogin: action.payload }
    },
    updateUserInfo(state, action) {
      return { ...state, userInfo: action.payload };
    },
    upusers(state, action) {
      return { ...state, upuser: action.payload }
    },
    baseUrl(state, action) {
      return { ...state, imgUrl: action.payload }

    }
  },
};