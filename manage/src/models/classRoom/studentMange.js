import {} from "../../services/index";
export default {
    namespace: "grade",
    //模块状态
    state: {
       
    },
    /**
     *异步操作
     */
    effects: {
       
        *assignedroom({ payload, type }, { call, put }) {
            let data = yield call(Assignedgrade);
            // console.log(data)
            if (data.code === 1) {
                yield put({
                    type: "Assignedgrades",
                    payload: data.data
                })
            }
        },
    },
    reducers: {
        Assignedgrades(state, action) {
            return { ...state, getgrade: action.payload }
        }, 
    }
}