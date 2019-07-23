import request from '../utils/request';

export function login(params) {
  return request.post('/user/login', params);
}
export function userInfor() {
  return request.get('/user/userInfo')
}
export function Upuser(params) {
  return request.put("/user/user", params)
}
export function getBaseurl(data) {
  console.log(data)
  return request.post("http://123.206.55.50:11000/upload", data)
}