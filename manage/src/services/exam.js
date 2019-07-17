import request from '../utils/request';
//创建试卷
export function addExam(params) {
  return request.post('/exam/exam',params);
}

//删除试卷的某道题
export function deleteQuestion(params) {
  return request.delete(`/exam/exam/${params}`);
}

//查询所有的试卷-------按条件查找
export function getExamList(params) {
  return request.get('/exam/exam/',{params});
}
//跳详情
export function detailData(params) {
  return request.get('/exam/exam/'+params);
}