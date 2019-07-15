import { User, UserIdentit, UserIdentityApiAuthorityRelation, UserApiAuthority, UserViewAuthority, UserIdentityViewAuthorityRelation } from "../services/index";
export default {
    //命名空间
    namespace: "showUser",
    //模块状态
    state: {
        user: [], //用户数据
        userIdentit: [], //展示身份数据
        userIdentityApiAuthorityRelation: [],  //展示身份和api权限关系
        userApiAuthority: [],// 展示api接口权限数据
        userViewAuthority: [],//获取视图接口权限数据
        userIdentityViewAuthorityRelation: []//展示身份和视图权限关系
    },
    /**
     *异步操作
     */
    effects: {
        //用户数据
        *user({ payload, type }, { call, put }) {
            let data = yield call(User, payload)
            if (data.code == 1) {
                yield put({
                    type: "User",
                    payload: data.data
                });
            }
        },
        //展示身份数据
        *userIdentit({ payload, type }, { call, put }) {
            let data = yield call(UserIdentit, payload)
            if (data.code == 1) {
                yield put({
                    type: "UserIdentit",
                    payload: data.data
                });
            }
        },
        //展示身份和api权限关系
        *userIdentityApiAuthorityRelation({ payload, type }, { call, put }) {
            let data = yield call(UserIdentityApiAuthorityRelation, payload)
            if (data.code == 1) {
                yield put({
                    type: "UserIdentityApiAuthorityRelation",
                    payload: data.data
                });
            }
        },
        //展示api接口权限数据
        *userApiAuthority({ payload, type }, { call, put }) {
            let data = yield call(UserApiAuthority, payload);
            if (data.code == 1) {
                yield put({
                    type: "UserApiAuthority",
                    payload: data.data
                });
            }
        },
        //获取视图接口权限数据
        *userViewAuthority({ payload, type }, { call, put }) {
            let data = yield call(UserViewAuthority, payload);
            if (data.code == 1) {
                yield put({
                    type: "UserViewAuthority",
                    payload: data.data
                });
            }
        },
        //展示身份和视图权限关系
        *userIdentityViewAuthorityRelation({ payload, type }, { call, put }) {
            let data = yield call(UserIdentityViewAuthorityRelation, payload);
            if (data.code == 1) {
                yield put({
                    type: "UserIdentityViewAuthorityRelation",
                    payload: data.data
                });
            }
        },
    },
    //同操作
    reducers: {
        //用户数据
        User(state, action) {
            return { ...state, user: action.payload };
        },
        //展示身份数据
        UserIdentit(state, action) {
            return { ...state, userIdentit: action.payload };
        },
        // //展示身份和api权限关系
        UserIdentityApiAuthorityRelation(state, action) {
            return { ...state, userIdentityApiAuthorityRelation: action.payload };
        },
        // 展示api接口权限数据
        UserApiAuthority(state, action) {
            return { ...state, userApiAuthority: action.payload };
        },
        //获取视图接口权限数据
        UserViewAuthority(state, action) {
            return { ...state, userViewAuthority: action.payload };
        },
        //展示身份和视图权限关系
        UserIdentityViewAuthorityRelation(state, action) {
            return { ...state, userIdentityViewAuthorityRelation: action.payload };
        }
    }
};
