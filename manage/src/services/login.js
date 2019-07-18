import request from '../utils/request';

export function login(params) {
  return request.post('/user/login',params);
}
export function userInfor(){
  return request.get('/user/userInfo')
}
export function upLoad(params){
  return request.post("http://123.206.55.50:11000/upload",params)
}
export function updateUser(params){
  return request.put("/user/user",params)
}