import { CheckAll, Alllessons, Allexamtype, QuestionsType, Conditionquery } from "../services/index";
export default {
  //命名空间
  namespace: "checkTheItem",
  //模块状态
  state: {
    list: [],
    allthelessons: [],//所有课程
    allexamtype: [],//考试类型
    questionsType: [], //题目类型
    conditionquerys: [],//条件查询
    detailData:{}
  },
  //订阅
  
  /**
   *异步操作
   */
  effects: {
    //所有试题
    *All({ payload, type }, { call, put }) {
      console.log(type)
      let data = yield call(CheckAll, payload);
      // console.log("11111", data.data);
      yield put({
        type: "upDataLogin",
        payload: data.data
      });
    },
    //所有课程
    *Lessons({ payload, type }, { call, put }) {
      let lessons = yield call(Alllessons, payload);
      yield put({
        type: "AllTheLessons",
        payload: lessons.data
      })

    },
    //考试类型
    *examtype({ payload, type }, { call, put }) {
      let allexamtype = yield call(Allexamtype, payload);
      yield put({
        type: "allexamType",
        payload: allexamtype.data
      });
    },
    //题目类型
    *questionsType({ payload, type }, { call, put }) {
      let getquestionsType = yield call(QuestionsType, payload);
      // console.log(getquestionsType.data)
      yield put({
        type: "allquestionsTypes",
        payload: getquestionsType.data
      })
    },
    //条件查询
    *conditionquery({ payload, type }, { call, put }) {
      let res = yield call(Conditionquery, payload);
      //console.log(res)
      yield put({
        type: "upDataLogin",
        payload: res.data
      })
    }
  },
  //同操作
  reducers: {
    upDataLogin(state, action) {
      //console.log(action);
      return { ...state, list: action.payload };
    },
    //所有课程
    AllTheLessons(state, action) {
      return { ...state, allthelessons: action.payload }
    },
    //考试类型
    allexamType(state, action) {
      return { ...state, allexamtype: action.payload }
    },
    //题目类型
    allquestionsTypes(state, action) {
      return { ...state, questionsType: action.payload }
    },
    //详情试题信息
    detail(state,action){
      return {...state,detailData:action.payload}
    }
  }
};
