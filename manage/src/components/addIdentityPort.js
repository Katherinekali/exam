import React,{useState} from "react"
import { Form,Tag,Select,Button } from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"
const { Option } = Select;
function AddIdentityPort(props){
  let [identity,setIdentity]=useState("")
  let [api,setApi]=useState("")
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            props.setViewPort({identity_id:identity,view_authority_id:api})
          }
        });
    };
    const handleReset=()=>{
      props.form.resetFields()
    }
    const { getFieldDecorator } = props.form;
    return (
    <div className={styles.addUser_content}>
        <Tag style={{padding:"0 15px",border:"1px solid blue",background:"#fff",lineHeight:"32px",color:"blue",fontSize:"14px"}}>给身份设置视图权限</Tag>
        <Form  className="login-form" >
           <Form.Item  style={{marginBottom:10}}>
              {getFieldDecorator("Name", {
                    rules: [{ required: true, message: '请输入api接口权限名称!' }],
              })(
              <Select placeholder="请选择身份id" style={{ width: "60%" }} onChange={(e)=>{setIdentity(e)}}>
                {
                    props.identity&&props.identity.map((v,k)=>{
                    return  <Option key={k} value={v.identity_id}>{v.identity_text}</Option>
                    })
                  }
              </Select>   
              )} 
          </Form.Item>
          <Form.Item  style={{marginBottom:10}}>
            {getFieldDecorator("Name1", {
                      rules: [{ required: true, message: '请输入api接口权限名称!' }],
                })(
                <Select placeholder="请选择视图权限id" style={{ width: "60%" }} onChange={(e)=>{setApi(e)}}>
                  {
                      props.viewAuthority&&props.viewAuthority.map((v,k)=>{
                      return  <Option key={k} value={v.view_authority_id}>{v.view_authority_text}</Option>
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
        
    </div>)
}
let mapStateToProps=state=>{
  return {
    ...state.userInfo
     
  }
}
let mapDispatchToProps=dispatch=>{
  return {
    setViewPort(payload){
      dispatch({
        type:"userInfo/setViewPort",
        payload
      })
    }

    
     
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddIdentityPort))