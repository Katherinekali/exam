import React,{useState,useEffect} from "react";
import { connect } from "dva";
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    DatePicker,
    Icon,
  } from "antd";
import styles from "./addExam.scss"
function ExamList (props) {
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    useEffect(()=>{
        props.getExamType()
        props.getSubject()
      },[])
      let handleSubmit =() => {
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let data={
            subject_id:values.subject_id,
            exam_id:values.exam_id,
            }
            console.log(data)
            // props.createExam(data)
          }
        });
      };
    let getSearch=()=>{
        handleSubmit()
    }
    return (
        <div>
            <h2>书卷列表</h2>
            <div className={styles.question_content}>
                <Form layout="inline">
                    <Form.Item  label="考试类型">
                    {getFieldDecorator('exam_id',)(
                            <Select style={{ width: 150 }}>
                            { props.examType&&props.examType.map(item=>{
                                return  <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                            })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item  label="课程">
                    {getFieldDecorator('subject_id')(
                            <Select style={{ width: 150 }}>
                            {
                            props.subject&&props.subject.map(item=>{
                                return  <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                            })
                            }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" icon="search" onClick={getSearch}>
                       查询
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={styles.question_content}>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        examType: state.exam.examTypes,
        subject: state.exam.subjects,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        getExamType() {
            dispatch({
                type: "exam/getExamType",
            })
        },
        getSubject() {
            dispatch({
                type: "exam/getSubject",
            })
        },
        // createExam(payload){
        //   dispatch({
        //     type:"exam/createExam",
        //     payload,
        //   })
        // },
        // reset(){
        //     dispatch({
        //         type:"exam/reset"
        //     })
        // }
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ExamList))