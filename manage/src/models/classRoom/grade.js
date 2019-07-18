import { Addgrade, Assignedgrade, Undistributedgrade, Removegrade, Updategrade, Allrooms } from "../../services/index";
export default {
    namespace: "grade",
    //模块状态
    state: {
        addgrade: {},//添加班级
        getgrade: [],//已分配教室的班级
        getundistributedgrade: [],//未分配教室的班级
        deletegrade: {},//删除班级
        renewalgrade: [],//更新班级 
        getrooms: []//全部教室

    },
    /**
     *异步操作
     */
    effects: {
        //添加班级
        *addgrade({ payload, type }, { call, put }) {
            let data = yield call(Addgrade, payload);
            if (data.code === 1) {
                yield put({
                    type: "Addgrade",
                    payload: data
                })
            }
        },
        //全部班级
        *room({ payload, type }, { call, put }) {
            let data = yield call(Allrooms);
            if (data.code === 1) {
                yield put({
                    type: "Allroom",
                    payload: data.data
                })
            }
        },
        //已分配教室的班级
        *assignedroom({ }, { call, put }) {
            let data = yield call(Assignedgrade);
            if (data.code === 1) {
                yield put({
                    type: "Assignedgrades",
                    payload: data.data
                })
            }
        },
        //未分配教室的班级
        *undistributedgrade({ payload}, { call, put }) {
            let data = yield call(Undistributedgrade, payload);
            if (data.code === 1) {
                yield put({
                    type: "Undistributedgrade",
                    payload: data.data
                })
            }
        },
        //删除班级
        *removegrades({ payload, type }, { call, put }) {
            let data = yield call(Removegrade, payload);
            if (data.code === 1) {
                yield put({
                    type: "Removegrade",
                    payload: data
                })
            }
        },
        //更新班级
        *updategrades({ payload, type }, { call, put }) {
            // console.log(payload, 'Updategrade')
            let data = yield call(Updategrade, payload);
            console.log("mmmmmmmmm......", data)
            if (data.code == 1) {
                yield put({
                    type: "Updategrades",
                    payload: data
                })
            }
        }
    },
    reducers: {
        //添加班级
        Addgrade(state, action) {
            return {
                ...state, addgrade: action.payload
            }
        },
        Allroom(state, action) {
            return {
                ...state, getrooms: action.payload
            }
        },
        //已分配教室的班级
        Assignedgrades(state, action) {
            return { ...state, getgrade: action.payload }
        },
        //未分配教室的班级
        Undistributedgrade(state, action) {
            return { ...state, getundistributedgrade: action.payload }
        },
        //删除的班级
        Removegrade(state, action) {
            return {
                ...state, deletegrade: action.payload
            }
        },
        //更新班级
        Updategrades(state, action) {
            return {
                ...state, renewalgrade: action.payload
            }
        }
    }
}