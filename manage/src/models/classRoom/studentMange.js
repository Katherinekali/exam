import {className,classRoom,deleteStudent,hasCLassStudent,hasNoClassStudent} from "../../services/index";
export default {
    namespace: "student",
    //模块状态
    state: {
       classRoom:[],        //班级
       className:[],        //班级名称
       studentsHasRoom:[],  //所有的已经分班的学生
       studentsHasNoRoom:[], //所有的没有分班的学生
       students:[],         //分班的学生和没有分班的学生合并在一起
       deleteState:-1,      //删除学生的状态
    },
    /**
     *异步操作
     */
    effects: {
        *getClassName({payload=null}, { call, put }) {
            let data = yield call(className);
            if (data.code === 1) {
                yield put({
                    type: "classNames",
                    payload: data.data
                })
            }
        },
        *getClassRoom({payload=null}, { call, put }) {
            let data = yield call(classRoom);
            if (data.code === 1) {
                yield put({
                    type: "classRooms",
                    payload: data.data
                })
            }
        },
        *getHasRoomstudents({payload=null}, { call, put }) {
            let data = yield call(hasCLassStudent);
            if (data.code === 1) {
                yield put({
                    type: "studentHasRoom",
                    payload: data.data
                })
            }
        },
        *getNoRoomstudents({payload=null}, { call, put }) {
            let data = yield call(hasNoClassStudent);
            if (data.code === 1) {
                yield put({
                    type: "studentHasNoRoom",
                    payload: data.data
                })
            }
        },
        *deleteStudent({payload}, { call, put }) {
            let data = yield call(deleteStudent,payload);
            if (data.code === 1) {
                yield put({
                    type: "deleteState",
                    payload: data.code
                })
            }
        },
    },
    reducers: {
        classNames(state, action) {
            return { ...state, className: action.payload }
        }, 
        classRooms(state, action) {
            return { ...state, classRoom: action.payload }
        }, 
        deleteState(state, action) {
            return { ...state, deleteState: action.payload }
        },
        studentHasRoom(state, action) {
            return { ...state, students:state.students.concat(action.payload) }
        }, 
        studentHasNoRoom(state, action) {
            return { ...state, students:state.students.concat(action.payload) }
        },
        record(state,action){
            return {...state,deleteState: action.payload}
        }  
    }
}