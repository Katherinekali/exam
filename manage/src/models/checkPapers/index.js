//批卷部分
import {Assignedgrade} from "../../services/classRoom/grade"
import {getTestPaper,getStudentPaper,correct_Test_Paper} from "../../services/index" // eslint-disable-line
export default {
namespace: 'checkPaper',
state: {
   AllClassroom:[], //所有班级信息
   TestPape:[],//试卷列表
   markStudent:{}
},
effects: {
    *getAll(a={}, { call, put }) {
        let data = yield call(Assignedgrade);
        if (data.code === 1) {
            yield put({
                type: "allData",
                payload: data.data
            })
        }
    },
    *getTestInfo({payload}, { call, put }) {
        let data = yield call(getTestPaper,payload);
        if (data.code === 1) {
            yield put({
                type: "testData",
                payload: data.exam
            })
        }
    },
    //获取学生试卷信息
    *getStudentInfo({payload}, { call,put}) { // eslint-disable-line
        console.log(payload)
        let data = yield call(getStudentPaper,payload);
        console.log(data,"etStudentInfo2")
        if (data.code === 1) {
            yield put({
                type: "studentData",
                payload: data.data
            })
        }
    },
    *correctTestPaper({ payload }, { call, put }){
        let data = yield call(correct_Test_Paper, payload)
        console.log(data,"========")
        if(data.code===1){
          yield put({
            type:'getGrade',
            payload: { Grade: data.data }
          })
        }
  
      }
},

reducers: {
    //所有班级信息
    allData(state, action) {
        return { ...state,AllClassroom:action.payload };
    },
    testData(state, action){
        return { ...state,TestPape:action.payload };
    },
    studentData(state, action){
        return { ...state,markStudent:action.payload };

    },
    getGrade(state, action){
        return {...state}

    }

}
}