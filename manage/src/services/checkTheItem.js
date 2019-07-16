import request from "../utils/request";
//所有课程
export function Alllessons(){
  return request.get("/exam/subject")
}
//考试类型
export function Allexamtype() {
  return request.get("/exam/examType")
}
//题目类型
export function QuestionsType() {
  return request.get("/exam/getQuestionsType")
}
//所有试题
export function CheckAll() {
  return request.get("/exam/questions/new");
}
//按条件查找试题
export function Conditionquery (params){
  return request.get("/exam/questions/condition",{
    params:params
  });
} 
