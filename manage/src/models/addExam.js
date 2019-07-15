import {examType,subject,addExam,deleteQuestion,getExamList} from "../services/index"
export default {
  //命名空间：
  namespace: 'exam',
  //模块状态：
  state: {
     examTypes:[],
     subjects:[],
     returnData:{},
     examList:[]
  },
  //异步方法：
  effects: {
    *getExamType({}, { call, put }) {  //  考试类型
          let data=yield call(examType) 
          if(data.code===1){
            yield put({
              type:"examTypeData",
              payload:data.data
            })  
          }
    },
    *getSubject({}, { call, put }) {  //  考试类型
        let data=yield call(subject) 
        if(data.code===1){
          yield put({
            type:"subjectData",
            payload:data.data
          })  
        } 
    },
    *createExam({payload}, { call, put }) {  //  考试类型
      let data=yield call(addExam,payload)
      sessionStorage.setItem("createExam",JSON.stringify(data.data))
      if(data.code===1){
        yield put({
          type:"returnExam",
          payload:data
        })  
      } 
  },
  *deleteQuestion({payload}, { call, put }) {  //  考试类型
    let data=yield call(deleteQuestion,payload)
    console.log(data)
    // if(data.code===1){
    //   yield put({
    //     type:"returnExam",
    //     payload:data
    //   })  
    // } 
  }, 
  *getExamList({payload}, { call, put }) {  //  考试类型
    let data=yield call(getExamList,payload)
    if(data.code===1){
      yield put({
        type:"examListData",
        payload:data
      })  
    } 
},                 
},
  //同步方法：只能在这里修改state
  reducers: {
    examTypeData(state, action) {
          return {...state,examTypes:action.payload}
    },
    subjectData(state, action) {
        return {...state,subjects:action.payload}
    },
    returnExam(state,action){
      return {...state,returnData:action.payload}
    },
    reset(state,action){
      return {...state,returnData:{}}
    },
    examListData(state,action){
      return {...state,examList:action.payload}
    }
  },
};