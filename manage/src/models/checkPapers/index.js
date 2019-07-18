//批卷部分
import {Assignedgrade} from "../../services/classRoom/grade"
import {getTestPaper,getStudentPaper} from "../../services/index"
export default {
namespace: 'checkPaper',
state: {
   AllClassroom:[], //所有班级信息
   TestPape:[] //试卷列表
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
        console.log(payload,'11111')
        let data = yield call(getTestPaper,payload);
        console.log(data,"getTestInfo")
        if (data.code === 1) {
            yield put({
                type: "testData",
                payload: data.exam
            })
        }
    },
    //获取学生试卷信息
    *getStudentInfo({payload}, a={ }) {
        console.log(payload)
        // let data = yield call(getStudentPaper,payload);
        // console.log(data,"etStudentInfo2")
        // if (data.code === 1) {
        //     yield put({
        //         type: "testData",
        //         payload: data.exam
        //     })
        // }
    },
},

reducers: {
    //所有班级信息
    allData(state, action) {
        return { ...state,AllClassroom:action.payload };
    },
    testData(state, action){
        return { ...state,TestPape:action.payload };

    }

}
}


