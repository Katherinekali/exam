import React,{useEffect,useState} from "react"
import { Form, Input,Tag,Select,Button,message } from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"
const { Option } = Select;
function AddIdentityView(props){
  useEffect(() => {
    if(props.identityApi===1){
      // message.success("添加成功")
    }
    return () => {
     
    };
  }, [props.identityApi])
  let [identity,setIdentity]=useState("")
  let [api,setApi]=useState("")
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            props.setApi({identity_id:identity,api_authority_id:api})
          }
        });
    };
    const handleReset=()=>{
      props.form.resetFields()
    }
    return (
    <div className={styles.addUser_content}>
        <Tag style={{padding:"0 15px",border:"1px solid blue",background:"#fff",lineHeight:"32px",color:"blue",fontSize:"14px"}}>给身份设置api权限</Tag>
        <Form  className="login-form" >
           <Form.Item  style={{marginBottom:10}}>
             <Select placeholder="请选择身份id" style={{ width: "60%" }} onChange={(e)=>{setIdentity(e)}}>
              {
                 props.identity&&props.identity.map((v,k)=>{
                  return  <Option key={k} value={v.identity_id}>{v.identity_text}</Option>
                 })
               }
            </Select>
          </Form.Item> 
          <Form.Item style={{marginBottom:10}}>
             <Select placeholder="请选择api接口权限" style={{ width: "60%" }} onChange={(e)=>{setApi(e)}}>
              {
                 props.portAuthorition&&props.portAuthorition.map((v,k)=>{
                  return  <Option key={k} value={v.api_authority_id}>{v.api_authority_text}</Option>
                 })
               }
            </Select>
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
        
    </div>)
}
let mapStateToProps=state=>{
  return {
    ...state.userInfo
     
  }
}
let mapDispatchToProps=dispatch=>{
  return {
    setApi(payload){
      dispatch({
        type:"userInfo/setApi",
        payload
      })
    }
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddIdentityView))