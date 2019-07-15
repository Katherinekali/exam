import React,{useEffect} from "react"
import { Form, Input,Tag,Select,Button,message } from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"
const { Option } = Select;
function AddapiPort(props){
  useEffect(() => {
    if(props.ApiInfo===1){
      // message.success("添加成功")
    }
    return () => {
     
    };
  }, [props.ApiInfo])
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            props.addApiAuthority({api_authority_text:values.Name,api_authority_url:values.Url,api_authority_method:values.Method})
          }
        });
    };
    const handleChange=()=>{

    }
    const handleReset=()=>{
      props.form.resetFields()
    }
    const { getFieldDecorator } = props.form;
    return (
    <div className={styles.addUser_content}>
        <Tag style={{padding:"0 15px",border:"1px solid blue",background:"#fff",lineHeight:"32px",color:"blue",fontSize:"14px"}}>添加api接口权限</Tag>
        <Form  className="login-form" >
         <Form.Item  style={{marginBottom:10}}>
           {getFieldDecorator("Name", {
                rules: [{ required: true, message: '请输入api接口权限名称!' }],
           })(
               <Input
               style={{ width: "80%" }}
               placeholder="请输入api接口权限名称"
               />,
           )}
           </Form.Item>
           <Form.Item  style={{marginBottom:10}}>
           {getFieldDecorator("Url", {
                rules: [{ required: true, message: '请输入api接口权限url!' }],
           })(
               <Input
               placeholder="请输入api接口权限url"
               style={{ width: "80%" }}
               />,
           )}
           </Form.Item>
           <Form.Item  style={{marginBottom:10}}>
           {getFieldDecorator("Method", {
                rules: [{ required: true, message: '请输入api接口权限方法!' }],
           })(
               <Input
               placeholder="请输入api接口权限方法"
               style={{ width: "80%" }}
               />,
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
    addApiAuthority(payload){
      console.log(payload)
      dispatch({
        type:"userInfo/addApiAuthority",
        payload
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddapiPort))