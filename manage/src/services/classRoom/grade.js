import request from "../../utils/request";
//添加班级
export function Addgrade(params) {
    return request.post("/manger/grade", params)
}
export function Allrooms() {
    return request.get("/manger/room")
}
//已分配教室的班级
export function Assignedgrade() {
    return request.get("/manger/grade")
}
//未分配教室的班级
export function Undistributedgrade() {
    return request.get("/manger/grade/new")
}
//删除班级
export function Removegrade(data) {
    return request.delete("/manger/grade/delete", { data })
}
//更新班级
export function Updategrade(params) {
    // params.grade_name = '';
    console.log('params...', params)
    return request.put("/manger/grade/update", params)
}