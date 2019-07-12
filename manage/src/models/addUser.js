import {examType,} from "../services/index"
export default {
  //命名空间：
  namespace: 'question',
  //模块状态：
  state: {
     
  },
  //订阅：
  subscriptions: {
    setup({ dispatch, history }) {  //   
      
    },
  },
  //异步方法：
  effects: {
    *examType({}, { call, put }) {  //  考试类型
          let data=yield call(examType)  
          if(data.code===1){
            sessionStorage.setItem("examType",JSON.stringify(data.data))
            yield put({
              type:"examTypeData",
              payload:data.data
            })  
          }
          
    },       
},
  //同步方法：只能在这里修改state
  reducers: {
    examTypeData(state, action) {
          return {...state,examType:action.payload}
    }
  },
};