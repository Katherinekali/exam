import request from '../../utils/request';
//登录接口
export function login(params) {
  return request.post('/user/login',params);
}
