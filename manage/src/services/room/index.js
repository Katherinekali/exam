import request from '../../utils/request';
//获取用户身份id
export function getRoom() {
  return request.get("/manger/room");
}