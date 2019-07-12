import request from '../utils/request';
//获取所有的考试类型
export function examType() {
  return request.get('/exam/examType');
}
//获取所有的课程
export function subject() {
    return request.get('/exam/subject');
}
//获取所有的试题
export function questionsType() {
    return request.get('/exam/getQuestionsType');
}

//添加试题:
export function addquestions(params){
  // console.log("axios---",params)
  return request.post('/exam/questions',params).catch((err)=>{
    return err
  });
}
export function editquestions(params){
  // console.log("axios---",params)
  // console.log(params)
  return request.put('/exam/questions/update',params).catch((err)=>{
    return err
  });
}
