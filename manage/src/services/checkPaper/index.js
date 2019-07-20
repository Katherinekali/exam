import request from "../../utils/request";
//获取学生试卷列表   GET  /exam/student
export function getTestPaper(params) {
    return request.get("/exam/student",{params});
}
export function getStudentPaper(payload) {
    console.log(payload,"22222222222222222222222")
    return request.get("/exam/student/"+payload);
}