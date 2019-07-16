import { getIdentity,getApi,getView,getUserIdentity,addUser,updateUser,addIdentity,addApiEdit,setApiEdit,setViewEdit,addViewEdit} from "../../services/addUser"
export default {
    namespace: 'userInfo',
    state: {
        identity:[],//身份id
        portAuthorition:[],//接口权限,
        viewAuthority:[],//视图权限
        userIdentity:[],//用户
        AddidentityMes:-1,
        ApiInfo:-1,
        identityApi:-1,
        viewPort:-1,
        viewAuthor:-1//视图权限
    },
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
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
      *getApiPort({}, {put }){
          let data=yield getApi()
          yield put({
            type:"authorition",
            payload:data.data
        })

      },
      *getView({}, {put}){
        let data=yield getView()
        yield put({
          type:"viewAuthorition",
          payload:data.data
      })

      },
      *getAllUser({}, { put }){
        let data=yield getUserIdentity()
        console.log(data,"user")
        yield put({
          type:"getUser",
          payload:data.data
      })

    },
    *addUserInfo({ payload }, {put }){
      console.log(payload)
      let data=yield addUser(payload)
      // console.log(data,"adduser")
    //   yield put({
    //     type:"getUser",
    //     payload:data.data
    // })

    },  
    *updateUserInfo({ payload }, {put }){
      let data=yield updateUser(payload)
      // console.log(data,"updateUser")
    //   yield put({
    //     type:"getUser",
    //     payload:data.data
    // })

    },
    *addIdentity({ payload }, { put }){
      let data=yield addIdentity(payload)
          yield put({
          type:"identityInfo",
          payload:data.code
        })
    },
    *addApiAuthority({ payload }, { put }){
      let data=yield addApiEdit(payload)
          yield put({
          type:"apiInfo",
          payload:data.code
        })
    },
    *setApi({ payload }, { put }){
      let data=yield setApiEdit(payload)
          yield put({
          type:"setApiInfo",
          payload:data.code
        })
        
    },
    *setViewPort({ payload }, { call, put }){
      let data=yield setViewEdit(payload)
          yield put({
          type:"setViewPort",
          payload:data.code
        })
       
       
    },
    *addviewAuthority({ payload }, { call, put }){
      let data=yield addViewEdit(payload)
          yield put({
          type:"ViewAuthority",
          payload:data.code
        })
    },
  
    },
    reducers: {
    getIdentity(state, action) {
        return { ...state, identity:action.payload };
    },
    authorition(state, action){
        return { ...state, portAuthorition:action.payload };
    },
    viewAuthorition(state, action){
        return { ...state, viewAuthority:action.payload};
    },
    getUser(state, action){
      return { ...state, userIdentity:action.payload};
    },
    identityInfo(state, action){
      return { ...state, AddidentityMes:action.payload};
    },
    apiInfo(state, action){
      return { ...state, ApiInfo:action.payload};
    },
    setApiInfo(state, action){
      return { ...state, identityApi:action.payload};
    },
    setViewPort(state, action){
      return { ...state, viewPort:action.payload};
    },
    ViewAuthority(state, action){
      return { ...state, viewAuthor:action.payload};
    }

    },
    
  
  };