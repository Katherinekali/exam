import React from "react"
import { Form, Input,Tag,Select,Button } from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"

function UserInfo(props){
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };
    const handleChange=()=>{

    }
    const handleReset=()=>{
      props.form.resetFields()
    }
    const { getFieldDecorator } = props.form;
    let {item}=props
    return (
    <div className={styles.addUser_content}>
        <Tag>{item.title}</Tag>
        <Form onSubmit={()=>{handleSubmit}} className="login-form" >
          {item.content.map((val,index)=>{
           return  val.type==="input"?<Form.Item key={index} style={{marginBottom:10}}>
           {getFieldDecorator(val.title, {
                initialValue:val.title,
                rules: [{ required: true, message: 'Please input your username!' }],
           })(
               <Input
               key={index}
               style={{ width: "80%" }}
               />,
           )}
           </Form.Item>:
           <Form.Item key={index} style={{marginBottom:10}}>
             <Select defaultValue={val.title} style={{ width: "80%" }} onChange={handleChange}>
               {
                //  val&&val.content.map((v,k)=>{
                //   <Option value="jack">Jack</Option>
                //  })
               }
            </Select>
          </Form.Item> 
          })}
        </Form>
          {
            <div>
            <Button type="primary" htmlType="submit">
            增加
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
     
  }
}
let mapDispatchToProps=dispatch=>{
  return {
    
     
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(UserInfo))