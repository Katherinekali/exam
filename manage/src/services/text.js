import request from '../utils/request';
export function getQuestionsType(){
    return request.get("/exam/getQuestionsType")
}
export function addQuestionsType(params){
    return request.get(`/exam/insertQuestionsType?text=${params.text}&&sort=${params.sort}`)
}
// export function getExamType(){
//     return request.get("/exam/examType")
// }
// export function getSubject(){
//     return request.get("/exam/subject")
// }
// export function getQuestions(){
//     return request.get("/exam/questions/new")
// }
// export function searchQes(params){
//     return request.get("/exam/questions/condition",{params:params})
// }