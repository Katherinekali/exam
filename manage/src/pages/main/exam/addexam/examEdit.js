import React, { useEffect,useState } from 'react'
import {connect} from "dva"
import style from "../addExam.scss"
import { Drawer, Button,Modal } from 'antd';
function examEdit (props) {
    let examInfor=JSON.parse(sessionStorage.getItem("createExam"))
    let [exam,setExam]=useState(examInfor)
    let [visible,setvisible]=useState(false)
    let [childrenDrawer,setchildrenDrawer]=useState(false)
    let showDrawer = () => {
        setvisible(true)
      };
    let onClose = () => {
        setvisible(false)
      };
    let deleteQuestion=(id)=>{
        showDeleteConfirm(id)
    }
    const { confirm } = Modal;      
      function showDeleteConfirm(id) {
        confirm({
          title: '确认提示',
          content: '是否要删除',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            props.delete(id)
          },
         
        });
      }
    let goToExamList=()=>{
        props.history.push("/main/examlist")
    }
    return (
        <div>
            <h2>创建试卷</h2>
            <div className={style.question_content}>
                    <div>
                        <Button  onClick={showDrawer}>
                        添加新题
                        </Button>
                        <Drawer
                        title="所有题目"
                        width={520}
                        fontSize={24}
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        >
                        <div>
                            {
                                exam.questions.map((item,index)=>{
                                    return <p key={index}>{index+1}：{item.title}</p>
                                })
                            } 
                        </div>
                        </Drawer>
                    </div>
                    <div style={{padding:40,textAlign:"center"}}>
                        <div>
                            <div>
                                <h2>{exam.title}</h2>
                                <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
                            </div>
                            {
                                exam.questions.map((item,index)=>{
                                    return <div className={style.list} key={item.questions_id}>
                                                <div className={style.title}>
                                                    <h4>{index+1}：{item.title}</h4>
                                                    <span style={{color:'blue'}} onClick={()=>{deleteQuestion(item.questions_id)}}>删除</span>
                                                </div>
                                                <div>
                                                {item.questions_stem}
                                                </div>
                                            </div>
                                })
                            }
                    </div>
                    <div><Button type="primary" onClick={goToExamList}>创建试卷</Button></div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
       
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        delete(payload){
            dispatch({
                type:"exam/deleteQuestion",
                payload,
            })
        }
    }
  }
export default connect (mapStateToProps, mapDispatchToProps)(examEdit)