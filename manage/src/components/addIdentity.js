import React,{useEffect} from "react"
import { Form, Input,Tag,Button} from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"
function AddIdentity(props){
  useEffect(() => {
    if(props.AddidentityMes===1){
      // message.success("添加成功")
    }
    return () => {
     
    };
  }, [props.AddidentityMes])
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            props.addIdentity({identity_text:values.identity})

          }
        });
    };
    const handleReset=()=>{
      props.form.resetFields()
    }
    const { getFieldDecorator } = props.form;
    return (
    <div className={styles.addUser_content}>
        <Tag style={{padding:"0 15px",border:"1px solid blue",background:"#fff",lineHeight:"32px",color:"blue",fontSize:"14px"}}>添加身份</Tag>
        <Form  className="login-form" >
        <Form.Item  style={{marginBottom:10}}>
           {getFieldDecorator('identity', {
                rules: [{ required: true, message: '请输入身份名称!' }],
           })(
               <Input
               style={{ width: "80%" }}
               placeholder="请输入身份名称"
               />,
           )}
        </Form.Item>  
        </Form>
          {
            <div>
            <Button type="primary" htmlType="submit" onClick={handleSubmit} >
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
    addIdentity(payload){
      dispatch({
        type:"userInfo/addIdentity",
        payload
      })

    }
    
     
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddIdentity))