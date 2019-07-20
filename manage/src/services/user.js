import request from '../utils/request';
export function getUserInfo(){
    return request.get("/user/userInfo")
}
export function getUserAuthorition(){
    return request.get("/user/view_authority")
}