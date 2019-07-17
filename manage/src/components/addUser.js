import React from "react"
import { Form,Tabs} from 'antd';
import { connect } from "dva";
import User from "./user"
import styles from "./userinfo.css"
const { TabPane } = Tabs;
function AddUser(props){
    return (
    <div className={styles.addUser_content}>
        <Tabs defaultActiveKey="1"  type="card" >
            <TabPane tab="添加用户" key="1">
              <User type={"添加"}></User>
            </TabPane>
            <TabPane tab="更新用户" key="2">
              <User type={"更新"}></User>
            </TabPane>
        </Tabs>
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
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddUser))