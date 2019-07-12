import request from '../utils/request';
//获取用户的身份id{管理员，出题者，浏览者....}：
export function getIdentity() {
    return request.get('/user/identity');
}
// //获取所有的用户id{liuyu  dingshaoshan  chenmanjie-------}：
export function getUserIdentity() {
    return request.get('/user/user');
}
//添加用户信息：新用户-
export function addUser(params) {
  return request.post('/user',params);
}
//更新用户信息：
export function getIdentity() {
    return request.get('/user/identity');
}
//更新用户信息：
export function getIdentity() {
    return request.get('/user/identity');
}