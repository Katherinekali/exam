import {examType,subject,questionsType,addquestions} from "../services/index"
export default {
  //命名空间：
  namespace: 'question',
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
    *examType({}, { call, put }) {  // eslint-disable-line 考试类型
          let data=yield call(examType)  
          if(data.code===1){
            sessionStorage.setItem("examType",JSON.stringify(data.data))
            yield put({
              type:"examTypeData",
              payload:data.data
            })  
          }
          
    },
    *subject({ payload}, { call, put }) {  // eslint-disable-line课程类型
          let data=yield call(subject,payload)   
          if(data.code===1){
            sessionStorage.setItem("subjectType",JSON.stringify(data.data))
            yield put({
              type:"subjectData",
              payload:data.data
            })  
          }
    },
    *questionType({ payload}, { call, put }) {  // eslint-disable-line题目类型
          let data=yield call(questionsType,payload)   
          if(data.code===1){
            sessionStorage.setItem("questionType",JSON.stringify(data.data))
            yield put({
              type:"questionTypeData",
              payload:data.data
            })  
          }
    },
    *addQuestion({ payload}, { call, put }) {  // eslint-disable-line添加试题
        let data=yield call(addquestions,payload) 
        console.log(data)
        if(data.code){
          yield put({
            type:"addRequest",
            payload:data.code
          }) 
        }else{
          yield put({
            type:"addRequest",
            payload:data
          }) 
        }
  }
  },
  //同步方法：只能在这里修改state
  reducers: {
    examTypeData(state, action) {
          return {...state,examType:action.payload}
    },
    subjectData(state, action) {
        return {...state,subject:action.payload}
    },
    questionTypeData(state, action) {
        return {...state,questionType:action.payload}
    },
    addRequest(state,action){
      return {...state,addState:action.payload}
    }
  },
};