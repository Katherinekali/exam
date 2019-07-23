import React,{useEffect} from 'react'
import {message} from 'antd';
import {connect} from "dva";
import AddUser from "../../../components/addUser"
import AddIdentity from "../../../components/addIdentity"
import Addapiport from "../../../components/addApiport"
import AddViewport from "../../../components/addViewport"
import AddIdentityView from "../../../components/addIdentityView"
import AddIdentityPort from "../../../components/addIdentityPort"
import styles from "./addUser.scss"

function addUser(props) {
    useEffect(() => {
        props.getUserID()
        props.getApiPort()
        props.getView()
        props.AllUser()
    },[])
    useEffect(()=>{
        if(props.msg===1){
            message.success("成功")
        }else if(props.msg===0){
            message.error("失败")
        }
        props.change()
    },[props.msg])
    return (
        <div>
            <h2>添加用户</h2>
            <div className={styles.addUser_wrapper}>
                <AddUser></AddUser>
                <AddIdentity></AddIdentity>
                <Addapiport></Addapiport>
                <AddViewport></AddViewport>
                <AddIdentityView></AddIdentityView>
                <AddIdentityPort></AddIdentityPort>
            </div>
        </div>
    )
}
let mapStateToProps = state => {
    return {
        ...state.userInfo
    }
}
let mapDispatchToProps = dispatch => {
    return {
        getUserID() {
            dispatch({
                type:"userInfo/getUserId"
            })
        },
        getApiPort() {
            dispatch({
                type:"userInfo/getApiPort"
            })
        },
        getView() {
            dispatch({
                type:"userInfo/getView"
            })
        },
        AllUser(){
            dispatch({
                type:"userInfo/getAllUser"
            })
        },
        change(){
            dispatch({
                type:"userInfo/change"
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(addUser)