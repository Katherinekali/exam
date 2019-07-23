import { getIdentity,getApi,getView,getUserIdentity,addUser,updateUser,addIdentity,addApiEdit,setApiEdit,setViewEdit,addViewEdit} from "../../services/addUser"
export default {
    namespace: 'userInfo',
    state: {
        identity:[],//身份id
        portAuthorition:[],//接口权限,
        viewAuthority:[],//视图权限
        userIdentity:[],//用户
        msg:-1 //返回用户信息
    },
    subscriptions: {
      setup({  }) {  // eslint-disable-line
      },
    },
    effects: {
    //获取用户id
    *getUserId({  }, {put }) {  // eslint-disable-line
      let data=yield  getIdentity()
      yield put({
          type:"getIdentity",
          payload:data.data
      })
    },
    //获取所有接口
    *getApiPort({}, {put }){
        let data=yield getApi()
        yield put({
          type:"authorition",
          payload:data.data
      })

    },
    //获取所有视图
    *getView({}, {put}){
      let data=yield getView()
      yield put({
        type:"viewAuthorition",
        payload:data.data
    })

    },
    //获得所有用户信息
    *getAllUser({}, { put }){
      let data=yield getUserIdentity()
      console.log(data,"user")
      yield put({
        type:"getUser",
        payload:data.data
    })
    },
    //添加用户信息
    *addUserInfo({ payload }, {put }){
      console.log(payload)
      let data=yield addUser(payload)
      // console.log(data,"adduser")
      yield put({
        type:"msgInfo",
        payload:data.code
      })
    }, 
    //更新用户信息 
    *updateUserInfo({ payload }, {put }){
      let data=yield updateUser(payload)
      yield put({
        type:"msgInfo",
        payload:data.code
      })
    },
    //添加身份
    *addIdentity({ payload }, { put }){
      let data=yield addIdentity(payload)
      yield put({
        type:"msgInfo",
        payload:data.code
      })
    },
    //添加api接口权限
    *addApiAuthority({ payload }, { put }){
      let data=yield addApiEdit(payload)
      yield put({
        type:"msgInfo",
        payload:data.code
      })
    },
    //添加视图接口
    *setApi({ payload }, { put }){
      let data=yield setApiEdit(payload)
      console.log(data,"3332")
      yield put({
        type:"msgInfo",
        payload:data.code
      })
        
    },
    //设置视图接口
    *setViewPort({ payload }, { call, put }){
      let data=yield setViewEdit(payload)
      console.log(data,"2222")
      yield put({
        type:"msgInfo",
        payload:data.code
      }) 
    },
    //设置视图权限
    *addviewAuthority({ payload }, { call, put }){
      let data=yield addViewEdit(payload)
      console.log(data,"1111")
      yield put({
        type:"msgInfo",
        payload:data.code
      })
    },
  
    },
    reducers: {
    getIdentity(state, action) {
      return { ...state, identity: action.payload };
    },
    authorition(state, action) {
      return { ...state, portAuthorition: action.payload };
    },
    viewAuthorition(state, action) {
      return { ...state, viewAuthority: action.payload };
    },
    getUser(state, action){
      return { ...state, userIdentity:action.payload};
    },
    msgInfo(state, action){
      return { ...state, msg:action.payload};
    },
    change(state){
      return { ...state, msg:-1};
    }

  },


};