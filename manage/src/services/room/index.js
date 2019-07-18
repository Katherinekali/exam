import request from '../../utils/request';
//获取用户身份id
export function getRoom() {
  return request.get("/manger/room");
}
export function AddRoom(params) {
  return request.post("/manger/room",params);
}
export function DelRoom(data) {
  //params和data的区别
  //params会解析到地址栏参数上面 
  return request.delete("/manger/room/delete",{data});
  //return request.delete(`/manger/room/delete?room_id=${params.room_id}`);
}