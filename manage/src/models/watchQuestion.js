import {} from "../services/index"
export default {
  //命名空间：
  namespace: 'watch',
  //模块状态：
  state: {
      examType:[],
      subject:[],
      questionType:[],
      addState:-1,
  },
  //订阅：
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line  
      
    },
  },
  //异步方法：
  effects: {
    *allType({}, { call, put }) {  // eslint-disable-line 考试类型
        //   let data=yield call(examType)  
        //   if(data.code===1){
        //     yield put({
        //       type:"examTypeData",
        //       payload:data.data
        //     })  
        //   }
          
    }
  },
  //同步方法：只能在这里修改state
  reducers: {
    examTypeData(state, action) {
          return {...state,examType:action.payload}
    },
    
  },
};