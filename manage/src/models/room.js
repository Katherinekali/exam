//教室管理
import {getRoom} from "../services/index"
export default {

    namespace: 'room',
  
    state: {
        roomData:[]
    },
  
  
    effects: {
      *getRoom({ payload }, { call, put }) {  // eslint-disable-line
        let data=yield call(getRoom) 
        console.log(data)
        yield put({
            type:"mangerRoom",
            payload:data.data
          }) 
       

      },
    },
  
    reducers: {
    mangerRoom(state, action) {
        
        return { ...state, roomData:action.payload };
      },
    },
  
  };