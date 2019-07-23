import React ,{useEffect}from 'react'
import "./loginPage.scss"
import {Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {connect} from "dva"
function Login (props){
//注意：只有当第二个参数里的值发生改变的时候，才执行第一个参数里面的代码    
    useEffect(()=>{
        if(props.isLogin===1){
            message.info('登陆成功');
            let path="/main";
            if(props.location.search){
                path=decodeURIComponent(props.location.search.split('=')[1])
            }
            props.history.push(path);
            // props.history.push("/main")
        }else if(props.isLogin===0){
            message.info('用户名或密码输入有误，请重新输入');
        }
    },[props.isLogin])
    let handleSubmit=(e)=>{
        e.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
            props.login({'user_name':values.username,'user_pwd':values.password}) 
          }
        });
    }
    let {getFieldDecorator}=props.form
    return (
        <div className="login_page">
            <div className="login">
               <Form  className="login-form" onSubmit={handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('username', 
                            { 
                                validateTrigger:"onBlur",
                                rules: [ { required: true, message: 'Please input your username!' },],         
                            })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', 
                            {   
                                validateTrigger:"onBlur",
                                rules: [
                                        { required: true, message: 'Please input your password!' },
                                        { pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: 'Please input your current password!' }
                                        ],
                            })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>记住密码</Checkbox>
                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
      );
}
const mapStateToProps=(state)=>{
    return {
        ...state.login
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        login(payload){
            dispatch({
                type:"login/login",
                payload,
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create({name: 'normal_login'})(Login))
