import request from '../utils/request';
//获取用户的身份 id {管理员，出题者，浏览者....}：
export function getIdentity() {
    return request.get('/user/identity');
}
//获取所有的用户 {liuyu  dingshaoshan  chenmanjie-------}：
export function getUserIdentity() {
    return request.get('/user/user');
}
//获取视图权限数据 {登录---主页面---添加试题---试题分类--等}：
export function getView() {
    return request.get('/user/view_authority');
}
//获取api接口权限数据 {}：
export function getApi() {
    return request.get('/user/api_authority');
}

//添加用户信息：新用户-
export function addUser(params) {
  return request.post('/user',params);
}
//更新用户信息：
export function updateUser(params) {
    return request.put('/user/identity',params);
}
//添加新的身份：返回身份的id
export function addIdentity(params) {
    return request.get('/user/identity/edit',{params});
}
//添加api接口权限:返回新添加权限的id: api_authority_id
export function addApiEdit(params) {
    return request.get('/user/authorityApi/edit',{params});
}
//添加视图权限：
export function addViewEdit(params) {
    return request.get('/user/authorityView/edit',{params});
}
//给身份设定api接口权限 传参{identity_id:"",api_authority_id:""}
export function setApiEdit(params) {
    return request.post('/user/setIdentityApi',{params});
}
//给身份设定视图权限
export function setViewEdit(params) {
    return request.post('/user/setIdentityView',{params});
}