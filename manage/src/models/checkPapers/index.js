//批卷部分
import { Assignedgrade } from "../../services/classRoom/grade"
import { getTestPaper } from "../../services/index"
export default {
    namespace: 'checkPaper',
    state: {
        AllClassroom: [], //所有班级信息
        TestPape: [] //试卷列表
    },
    effects: {
        *getAll({ payload }, { call, put }) {
            let data = yield call(Assignedgrade);
            if (data.code === 1) {
                yield put({
                    type: "allData",
                    payload: data.data
                })
            }
        },
        *getTestInfo({ payload }, { call, put }) {
            let data = yield call(getTestPaper, payload);
            console.log(data, 1222)
            if (data.code === 1) {
                yield put({
                    type: "testData",
                    payload: data.exam
                })
            }
        },
    },

    reducers: {
        //所有班级信息
        allData(state, action) {
            return { ...state, AllClassroom: action.payload };
        },
        //所有试卷列表
        testData(state, action) {
            return { ...state, TestPape: action.payload };
        },
    },

};


