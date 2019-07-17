import {examType,subject,addExam,deleteQuestion,getExamList,detailData} from "../services/index"
export default {
  //命名空间：
  namespace: 'exam',
  //模块状态：
  state: {
     examTypes:[],
     subjects:[],
     returnData:{},
     examList:[],
     detailData:[]
  },
  //异步方法：
  effects: {
    *getExamType({}, { call, put }) {  
          let data=yield call(examType) 
          if(data.code===1){
            yield put({
              type:"examTypeData",
              payload:data.data
            })  
          }
    },
    *getSubject({}, { call, put }) {  
        let data=yield call(subject) 
        if(data.code===1){
          yield put({
            type:"subjectData",
            payload:data.data
          })  
        } 
    },
    *createExam({payload}, { call, put }) {    //创建试卷----成功后返回创建试卷的题
      let data=yield call(addExam,payload)
      sessionStorage.setItem("createExam",JSON.stringify(data.data))
      if(data.code===1){
        yield put({
          type:"returnExam",
          payload:data
        })  
      } 
  },
  *deleteQuestion({payload}, { call }) {   //删除试题----没有接口
    let data=yield call(deleteQuestion,payload)
    console.log(data)
    // if(data.code===1){
    //   yield put({
    //     type:"returnExam",
    //     payload:data
    //   })  
    // } 
  }, 
  *getExamList({payload}, { call, put }) {  //获取试题列表
    let data=yield call(getExamList,payload)
    // console.log(data)
    // sessionStorage.setItem("examList",JSON.stringify(data.exam))
    if(data.code===1){
      yield put({
        type:"examListData",
        payload:data
      })  
    } 
  },
  *getDetail({payload}, { call,put }) {  //跳详情：----无接口
    let data=yield call(detailData,payload)
    if(data.code===1){
      yield put({
        type:"detailData",
        payload:data.data.questions
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
    // reset(state,action){
    //   return {...state,returnData:{}}
    // },
    examListData(state,action){
      return {...state,examList:action.payload}
    },
    detailData(state,action){
      return {...state,detailData:action.payload}
    },
  },
};