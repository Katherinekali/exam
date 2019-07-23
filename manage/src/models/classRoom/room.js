//教室管理
import {getRoom,AddRoom,DelRoom} from "../../services/index"
export default {
    namespace: 'room',
    state: {
        roomData:[],//获取的所有教室数据
        room_msg:-1 //数据添加后返回给用户的提示信息
    },
    effects: {
      //获得教室信息
      *getRoom({ payload }, { call, put }) {  // eslint-disable-line
        let data=yield call(getRoom) 
        yield put({
            type:"mangerRoom",
            payload:data.data
          }) 
      },
      //获得教室信息
      *addRoom({ payload }, { call, put }) {  // eslint-disable-line
        if(payload){
          let data=yield call(AddRoom,payload) 
          //把值返回去
          console.log(data)
          yield put({
              type:"roomMsg",
              payload:data.code
            })

        }else{
          yield put({
            type:"roomMsg",
            payload:-1
          })

        }
       
      },
      *delRoom({ payload }, { call, put }) {  // eslint-disable-line
        // let data=yield call(DelRoom,payload) 
        //把值返回去
        // yield put({
        //     type:"Room_Msg",
        //     payload:data.code
        //   })
      },


    },
    reducers: {
    mangerRoom(state, action) {
        return { ...state, roomData:action.payload };
      },
    roomMsg(state, action){
      return { ...state, room_msg:action.payload };//返回前面信息
    }
    },
    
  
  };