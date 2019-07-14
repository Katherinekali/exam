import React,{useEffect,useState} from 'react'
import {connect} from "dva";
import UserInfo from "../../../components/UserInfo"
import styles from "./addUser.scss"

 function addUser(props){
    useEffect(()=>{
        props.getUserID()
        props.getApiPort()
        props.getView()

    },[])
    console.log(props.identity)
    let userData=[{
        "title":"添加用户",
        "content":[{
        }]
    },{
        "title":"添加身份",
        "content":[{
            "type":"input",
            "title":"请输入身份名称"
        }]
    },{
        "title":"添加api接口权限",
        "content":[{
            "type":"input",
            "title":"请输入api接口权限名称"
        },{
            "type":"input",
            "title":"请输入api接口权限url"
        },{
            "type":"input",
            "title":"请输入api接口权限方法"
        }]
    },{
        "title":"添加视图接口权限",
        "content":[{
            "type":"select",
            "title":"请选择已有视图",
            "content":props.viewAuthority
            
        }]
    },{
        "title":"给视图设置api权限",
        "content":[{
            "type":"select",
            "title":"请选择身份id",
            "content":props.identity
        },{
            "type":"select",
            "title":"请选择api接口权限",
            "content":props.portAuthorition

        }]
    },{
        "title":"给身份设置视图权限",
        "content":[{
            "type":"select",
            "title":"请选择身份id",
            "content":props.identity
        },{
            "type":"select",
            "title":"请选择视图权限id",
            "content":props.viewAuthority
        }]
    }]
    
    return (
        <div>
            <h2>添加用户</h2>
            <div className={styles.addUser_wrapper}>
                {
                    userData.map((item,index)=>{
                        return <UserInfo key={index} item={item} className={styles.addUser_content}></UserInfo>
                    })
                }
                
            </div>
        </div>
    )
}
let mapStateToProps=state=>{
    return {
        ...state.userInfo

       
    }
  }
  let mapDispatchToProps=dispatch=>{
    return {
        getUserID(){
            dispatch({
                type:"userInfo/getUserId"

            })
        },
        getApiPort(){
            dispatch({
                type:"userInfo/getApiPort"

            })

        },
        getView(){
            dispatch({
                type:"userInfo/getView"

            })

        }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(addUser)