import {getQuestionsType, addQuestionsType,getExamType,getSubject,getQuestions} from "../services/index"
export default {
    namespace:'test',
    state: {
        questionsType:[],
        message:"",
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
       
       
        },
    },
    effects: {
        *getType({ payload,type }, { call, put }) {  // eslint-disable-line
            let data=yield getQuestionsType()
            if(data.code){
                yield put({
                    type:"questionsType",
                    payload:data.data
                })
            }
      },
        *addType({ payload,type }, { call, put }){
            let data=yield addQuestionsType(payload)
            if(data.code){
                yield put({
                  type:"addInfo",
                  payload:data.msg
                })
            }
        },
    },
    reducers: {
        questionsType(state,action){
          return {...state,questionsType:action.payload}
        },
        addInfo(state,action){
          return {...state,message:action.payload}
        },
        // get_exam(state,action){
        //     return {...state,exam:action.payload}
        // },
        // get_subject(state,action){
        //     return {...state,subject:action.payload}
        // },
        // get_questions(state,action){
        //     return {...state,questions:action.payload}
        // }
    },
  };