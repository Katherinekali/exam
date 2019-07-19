import React, {useState,useEffect } from 'react'
import {connect} from "dva"
import { Drawer, Button,Modal} from 'antd';
import style from "../addExam.scss"
import styles from "../addExam.scss"
import { injectIntl } from 'react-intl';
import ReactMarkdown from "react-markdown";
//添加新题的组件
import NewQuestion from "../../../../components/addQuestion/addQuestionToexam"
function examEdit (props) {
    let examInfor=JSON.parse(sessionStorage.getItem("createExam"))
    let [exam]=useState(examInfor)
    let [questions,setQuestions]=useState(examInfor.questions)
    let [visible,setvisible]=useState(false)
   
    let showDrawer = () => {
        setvisible(true)
    };
    let onClose = () => {
        setvisible(false)
    };
    let deleteQuestion = (id) => {
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
            //从本地存储中删除：
            let exam =JSON.parse(sessionStorage.getItem("createExam"))
            let newQuestions=exam.questions.filter(item=>item.questions_id!==id)
            setQuestions(newQuestions)
            exam.questions=newQuestions
            sessionStorage.setItem("createExam",JSON.stringify(exam))
          },
        });
      }
    //更新试卷
    let goToExamList=()=>{
        let exam =JSON.parse(sessionStorage.getItem("createExam"))
        let ids=exam.questions.map(item=>{
            return item.questions_id
        })
        let update={
            exam_exam_id:exam.exam_exam_id,
            ids:ids
        }
        props.upDate(update)
    }
    useEffect(() => {
       if(props.upstate===1){
        props.history.push("/main/examlist")
        props.reset()
       }
    }, [props.upstate])
    let changeVisible=(flag)=>{
        setvisible(flag)
        let examInfor=JSON.parse(sessionStorage.getItem("createExam"))
        setQuestions(examInfor.questions)
    }
    // let changeQuestion=()=>{
    //     console.log(1)
    // }
    return (
        <div>
            <h2>创建试卷</h2>
            <div className={style.question_content}>
                    <>
                        <Button  onClick={showDrawer}>
                        添加新题
                        </Button>
                    <Drawer
                        title="所有题目"
                        width={720}
                        fontSize={24}
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        >
                        <NewQuestion change={changeVisible}>
                        </NewQuestion>
                        </Drawer>
                    </>
                    <div style={{padding:40,textAlign:"center"}}>
                        <div>
                            <div>
                                <h2>{exam.title}</h2>
                                <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
                            </div>
                            {
                                questions.map((item,index)=>{
                                    return <div className={styles.list} key={index}>
                                                <div className={styles.title}>
                                                    <h4>{index+1}：{item.title}</h4>
                                                    <span style={{color:'blue'}} onClick={()=>{deleteQuestion(item.questions_id)}}>删除</span>
                                                </div>
                                                <div>
                                                    <ReactMarkdown source={item.questions_stem}  className={styles.question_list}/>
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
       upstate:state.exam.upDate
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete(payload) {
            dispatch({
                type: "exam/deleteQuestion",
                payload,
            })
        },
        upDate(payload){
            dispatch({
                type:"exam/upDateQuestion",
                payload,
            })
        },
        reset() {
            dispatch({
                type: "exam/reset"
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(examEdit)
