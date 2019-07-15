import request from '../utils/request';
//创建试卷
export function addExam(params) {
  return request.post('/exam/exam',params);
}

//删除试卷的某道题
export function deleteQuestion(params) {
  return request.delete('/exam/exam/'+params);
}