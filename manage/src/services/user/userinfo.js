import request from '../../utils/request';
//获取用户身份id
export function getUserID() {
  return request.get("/user/identity");
}
export function getApiPort() {
    return request.get("/user/api_authority");
}
export function getView() {
    return request.get("/user/view_authority");
}