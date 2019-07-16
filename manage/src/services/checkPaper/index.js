import request from "../../utils/request";
//获取学生试卷列表   GET  /exam/student
export function getTestPaper(params) {
    return request.get("/exam/student",{params});
}