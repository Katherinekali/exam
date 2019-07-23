import request from "../../utils/request";
//获取用户信息
export function getUserInfor(){
  return request.get("/user/userInfo")
}

//更新用户信息
export function upDateUserInfo(params){
  return request.put("/user/user",params)
}

//根据上传的图片获取头像的url路径----
export function getAvatar(params){
  return request.post("http://123.206.55.50:11000/upload",params)
}

//根获取视图权限数据-----也就是获取进入路由的权限
export function getViewAuthority(){
  return request.get("/user/view_authority")
}