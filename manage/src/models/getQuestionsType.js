import {getQuestionsType, addQuestionsType} from "../services/index"
export default {
    namespace:'test',
    state: {
        questionsType:[],
        message:"",
    },
    subscriptions: {
        setup({  }) {  // eslint-disable-line
       
       
        },
    },
    effects: {
        *getType({ }, {put}) {  // eslint-disable-line
            let data=yield getQuestionsType()
            if(data.code){
                yield put({
                    type:"questionsType",
                    payload:data.data
                })
            }
      },
        *addType({ payload }, {  put }){
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
       
    },
  };