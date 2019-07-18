import request from '../utils/request';

export function login(params) {
  return request.post('/user/login',params);
}
export function userInfor(){
  return request.get('/user/userInfo')
}