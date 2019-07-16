import request from "../../utils/request";
//添加班级
// export function Addgrade(params) {
//     return request.post("/manger/grade", params)
// }
//已分配教室的班级
export function Assignedgrade() {
    return request.get("/manger/grade")
}
//未分配教室的班级
export function Undistributedgrade() {
    return request.get("/manger/grade/new")
}
//删除班级
export function Removegrade(params) {
    return request.delete("/manger/grade/delete", params)
}
//更新班级
export function Updategrade(params) {
    return request.put("/manger/grade/update", params)
}