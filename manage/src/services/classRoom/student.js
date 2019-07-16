import request from "../../utils/request";
//获取没有分班学生列表
export function hasNoClassStudent() {
    return request.get("/manger/student/new")
}
//获取已经分班学生列表
export function hasCLassStudent() {
    return request.get("/manger/student")
}
//获取所有的教室号 34304
export function classRoom() {
    return request.get("/manger/room")
}
//获取所有的班级名称 1612B----已经分配教室的班级
export function className () {
    return request.get("/manger/grade")
}
//删除学生接口
export function deleteStudent(params) {
    return request.delete("/manger/student", {params:{id:params}})
}