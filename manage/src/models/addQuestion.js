import {examType,subject,questionsType,addquestions,editquestions} from "../services/index"
export default {
  //命名空间：
  namespace: 'question',
  //模块状态：
  state: {
      examType:[],
      subject:[],
      questionType:[],
      addState:-1,
      addTime:"",
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
    *subject({ payload}, { call, put }) {  // 课程类型
          let data=yield call(subject,payload)   
          if(data.code===1){
            sessionStorage.setItem("subjectType",JSON.stringify(data.data))
            yield put({
              type:"subjectData",
              payload:data.data
            })  
          }
    },
    *questionType({ payload}, { call, put }) {  // 题目类型
          let data=yield call(questionsType,payload)   
          if(data.code===1){
            sessionStorage.setItem("questionType",JSON.stringify(data.data))
            yield put({
              type:"questionTypeData",
              payload:data.data
            })  
          }
    },
    *addQuestion({ payload,edit,search}, { call, put }) {  // eslint-disable-line添加试题
      console.log(edit)
      if(edit==="修改"){
          payload.questions_id=search
          // delete payload.user_id
          // console.log(payload)
        let data=yield call(editquestions,payload) 
        console.log(data)

      }else{
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
      return {...state,addState:action.payload,addTime:new Date()*1}
    }
  },
};