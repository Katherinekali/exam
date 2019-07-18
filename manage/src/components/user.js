import React,{Fragment,useState} from "react"
import { Form, Input,Select,Button } from 'antd';
import { connect } from "dva";
import "./userinfo.css"
const { Option } = Select;
function AddIdentityView(props){
    let {type}=props
    let [identity,updateIdentity]=useState("")
    let [userName,updateUsername]=useState("")
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            type==="更新"?props.updateUserInfo({user_name:values.username,user_pwd:values.password,identity_id:identity,user_id:userName})
            :
            props.addUserInfo({user_name:values.username,user_pwd:values.password,identity_id:identity})
          }
        });
    };
    const handleReset=()=>{
      props.form.resetFields()
    }
    const { getFieldDecorator } = props.form;
    return (
    <Fragment>
        <Form  className="login-form" >
           {type==="更新"?<Form.Item  style={{marginBottom:10}}>
           {getFieldDecorator("Name1", {
                    rules: [{ required: true, message: '请输入api接口权限名称!' }],
              })(
              <Select placeholder="请选择身份id" style={{ width: "60%" }} onChange={(e)=>{updateUsername(e)}}>
                {
                   props.userIdentity&&props.userIdentity.map((v,k)=>{
                    return  <Option key={k} value={v.user_id}>{v.user_name}</Option>
                   })
                 }
              </Select>  
          )} 
          </Form.Item>:null}
          <Form.Item>
            {getFieldDecorator('username', 
                { 
                    validateTrigger:"onBlur",
                    rules: [ { required: true, message: 'Please input your username!' },],         
                })(
                <Input
                style={{width: "80%" }}
                placeholder="请输入用户名"
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
                  style={{width: "80%" }}
                  type="password"
                  placeholder="请输入密码"
                  />,
              )}
          </Form.Item>
          <Form.Item style={{marginBottom:10}}>
          {getFieldDecorator("Name", {
                    rules: [{ required: true, message: '请输入api接口权限名称!' }],
              })(
              <Select  placeholder="请选择身份id" style={{ width: "60%" }} onChange={(e)=>{updateIdentity(e)}}>
                {
                   props.identity&&props.identity.map((v,k)=>{
                    return  <Option key={k} value={v.identity_id}>{v.identity_text}</Option>
                   })
                 }
              </Select>
          )} 
          </Form.Item> 
        </Form>
          {
            <div>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              确定
              </Button>
             <Button style={{ marginLeft: 8 }} onClick={handleReset}>
             清除
            </Button>
            </div>
          }
    </Fragment>)
}
let mapStateToProps=state=>{
  return {
    ...state.userInfo
     
  }
}
let mapDispatchToProps=dispatch=>{
  return {
    addUserInfo(payload){
      dispatch({
        type:"userInfo/addUserInfo",
        payload
      })
    },
    updateUserInfo(payload){
      dispatch({
        type:"userInfo/updateUserInfo",
        payload
      })
    } 
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddIdentityView))