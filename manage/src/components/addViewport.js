import React,{useState,useEffect} from "react"
import { Form,Tag,Select,Button } from 'antd';
import { connect } from "dva";
import styles from "./userinfo.scss"
const { Option } = Select;
function AddViewport(props){
  useEffect(() => {
    if(props.viewAuthor===1){
      // message.success("添加成功")
    }
    return () => {
     
    };
  }, [props.viewAuthor])
    let [viewPort,setViewPort]=useState("")
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            let data=props.viewAuthority.filter(item=>item.view_authority_id===viewPort)
            props.addviewAuthority({view_authority_text:data[0].view_authority_text,view_id:data[0].view_authority_id})
          }
        });
    };
    const handleReset=()=>{
      props.form.resetFields()
    }
    const { getFieldDecorator } = props.form;
    return (
    <div className={styles.addUser_content}>
        <Tag style={{padding:"0 15px",border:"1px solid blue",background:"#fff",lineHeight:"32px",color:"blue",fontSize:"14px"}}>添加视图接口权限</Tag>
        <Form  className="login-form" >
           <Form.Item  style={{marginBottom:10}}>
           {getFieldDecorator("api", {
                    rules: [{ required: true, message: '请输入身份id!' }],
              })(
                <Select initialValue="" placeholder="添加视图接口权限" style={{ width: "60%" }} onChange={(e)=>{setViewPort(e)}}>
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
    addviewAuthority(payload){
      dispatch({
        type:"userInfo/addviewAuthority",
        payload
      })

    }
    
     
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddViewport))