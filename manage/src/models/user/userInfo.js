import {getUserID,getApiPort,getView} from "../../services/index"
export default {
    namespace: 'userInfo',
    state: {
        identity:[],//身份id
        portAuthorition:[],//接口权限,
        viewAuthority:[],//视图权限
    },
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
    effects: {
        //获取用户id
      *getUserId({ payload }, { call, put }) {  // eslint-disable-line
        let data=yield getUserID()
        console.log(data)
        yield put({
            type:"getIdentity",
            payload:data.data
        })
      },
      *getApiPort({ payload }, { call, put }){
          let data=yield getApiPort()
          yield put({
            type:"authorition",
            payload:data.data
        })

      },
      *getView({ payload }, { call, put }){
        let data=yield getView()
        console.log(data)
        yield put({
          type:"viewAuthorition",
          payload:data.data
      })

    }
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

    },
    
  
  };