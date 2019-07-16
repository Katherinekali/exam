import { Addgrade, Assignedgrade, Undistributedgrade, Removegrade, Updategrade } from "../../services/index";
export default {
    namespace: "grade",
    //模块状态
    state: {
        addgrade: [],//添加班级
        getgrade: [],//已分配教室的班级
        getundistributedgrade: [],//未分配教室的班级
        getremovegrade: [],//删除班级
        getupdategrade: []//更新班级
    },
    /**
     *异步操作
     */
    effects: {
        //添加班级
        // * addgrade({ payload, type }, { call, put }) {
        //     let data = yield call(Addgrade, payload);
        //     if (data.code == 1) {
        //         yield put({
        //             type: "Addgrade",
        //             payload: data.data
        //         })
        //     }
        // },
        //已分配教室的班级
        *assignedroom({ payload, type }, { call, put }) {
            console.log(type, "========")
            let data = yield call(Assignedgrade);
            console.log(data)
            // console.log(data)
            if (data.code == 1) {
                yield put({
                    type: "Assignedgrades",
                    payload: data.data
                })
            }
        },
        //未分配教室的班级
        *undistributedgrade({ payload, type }, { call, put }) {
            let data = yield call(Undistributedgrade, payload);
            if (data.code == 1) {
                yield put({
                    type: "Undistributedgrade",
                    payload: data.data
                })
            }
        },
        //删除班级
        // * removegrade({ payload, type }, { call, put }) {
        //     let data = yield call(Removegrade, payload);
        //     if (data.code == 1) {
        //         yield put({
        //             type: "Removegrade",
        //             payload: data.data
        //         })
        //     }
        // },
        //更新班级
        // * updategrade({ payload, type }, { call, put }) {
        //     let data = yield call(Updategrade, payload);
        //     if (data.code == 1) {
        //         yield put({
        //             type: "Updategrade",
        //             payload: data.data
        //         })
        //     }
        // }
    },
    reducers: {
        //添加班级
        // Addgrade(state, action) {
        //     return {
        //         ...state, addgrade: action.payload

        //     }
        // },
        //已分配教室的班级
        Assignedgrades(state, action) {
            return { ...state, getgrade: action.payload }
        },
        //未分配教室的班级
        Undistributedgrade(state, action) {
            return { ...state, getundistributedgrade: action.payload }
        },
        //删除的班级
        // Removegrade(state, action) {
        //     return {
        //         ...state, getremovegrade: action.payload
        //     }
        // },
        //更新班级
        // Updategrade(state, action) {
        //     return {
        //         ...state, getupdategrade: action.payload
        //     }
        // }
    }
}