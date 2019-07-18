import request from "../utils/request";
//展示用户数据
export function User() {
    return request.get("/user/user")
}
//展示身份数据
export function UserIdentit() {
    return request.get("/user/identity")
}
//展示身份和api权限关系
export function UserIdentityApiAuthorityRelation() {
    return request.get("/user/identity_api_authority_relation")
}
//展示api接口权限数据
export function UserApiAuthority() {
    return request.get("/user/api_authority")
}
//获取视图接口权限数据
export function UserViewAuthority() {
    return request.get("/user/view_authority")
}
//展示身份和视图权限关系
export function UserIdentityViewAuthorityRelation() {
    return request.get("/user/identity_view_authority_relation")
}
