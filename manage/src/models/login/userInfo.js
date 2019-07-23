import { upDateUserInfo,getAvatar } from "../../services/index"
export default {
  //命名空间：
  namespace: 'user',
  //模块状态：
  state: {
    returnInfo:{},  //更新后的返回信息
    avatar:{}
  },
  //异步方法：
  effects: {
    *upDateUserInfo({payload}, { call, put }) {  //  更新用户信息：
      let data = yield call(upDateUserInfo,payload)
      if (data.code === 1) {
        yield put({
          type: 'getUpdateUser',
          payload: data
        })
      }
    },
    *upDateAvatar({payload}, { call, put }) {    // 更新用户头像：
      let data = yield call(getAvatar,payload)
      if (data.code === 1) {
        yield put({
          type: 'AvatarData',
          payload: data.data[0]
        })
      }
    },
  },
  //同步方法：只能在这里修改state
  reducers: {
    getUpdateUser(state, action) {
      return { ...state, returnInfo: action.payload }
    },
    AvatarData(state, action) {
      return { ...state, avatar: action.payload }
    }
  },
};