import React from "react"
import { Form, Input,Tag,Select,Button } from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"
const { Option } = Select;
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

    }
    const { getFieldDecorator } = props.form;
    let {item}=props
    console.log(item)
    return (
    <div className={styles.addUser_content}>
        <Tag>{item.title}</Tag>
        <Form onSubmit={()=>{handleSubmit}} className="login-form">
          {item.content.map((val,index)=>{
           return  val.type==="input"?<Form.Item key={index}>
           {getFieldDecorator('username', {
               rules: [{ required: true, message: 'Please input your username!' }],
           })(
               <Input
               style={{ width: "80%" }}
               placeholder="Username"
               />,
           )}
           </Form.Item>:
           <Form.Item key={index}>
             <Select defaultValue={val.title} style={{ width: "80%" }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
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
export default connect()(Form.create()(UserInfo))