import request from '../utils/request';
export function getQuestionsType(){
    return request.get("/exam/getQuestionsType")
}
export function addQuestionsType(params){
    return request.get(`/exam/insertQuestionsType?text=${params.text}&&sort=${params.sort}`)
}
