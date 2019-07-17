import React,{useState,useEffect} from "react";
import { connect } from "dva";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import styles from "../addExam.scss";
function AddExam(props) {
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    useEffect(()=>{
      props.getExamType()
      props.getSubject()
    },[])
    
    let handleSubmit = e => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data={
          subject_id:values.subject_id,
          exam_id:values.exam_id,
          title:values.examName,
          number:values.number*1,
          start_time:values.start_time*1,
          end_time:values.end_time*1,
          }
          props.createExam(data)
        }
      });
    };
    useEffect(()=>{
      if(props.returnData.code===1){
        props.history.push("/main/exam/edit")
      }
    },[props.returnData])  
  return (
    <div>
      <h2>添加考试</h2>
      <div className={styles.question_content}>
        <Form  onSubmit={handleSubmit}>
            <div>
              <Form.Item  label="试卷的名称">
                  {getFieldDecorator('examName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入试卷名称',
                      },
                    ],
                  })(<Input style={{width:300}}/>)}
                </Form.Item>
                <Form.Item  label="选择考试类型">
                  {getFieldDecorator('exam_id',{
                    rules: [
                      {
                        required: true,
                        message: '请选择考试类型',
                      },
                    ],
                  })(
                        <Select
                            style={{ width: 200 }}
                            placeholder={props.examType[0]&&props.examType[0].exam_name}
                        >
                         {props.examType.map(item=>{
                             return  <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                           })}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item  label="选择课程">
                  {getFieldDecorator('subject_id',{
                    rules: [
                      {
                        required: true,
                        message: '请选择课程',
                      },
                    ],
                  })(
                        <Select
                            style={{ width: 200 }}
                            placeholder={props.subject[0]&&props.subject[0].subject_text}
                        >
                         {
                           props.subject.map(item=>{
                             return  <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                           })
                         }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item  label="设置题量">
                  {getFieldDecorator('number',{ 
                    rules: [
                      {
                        required: true,
                        message: '请设置题量',
                      },
                    ],
                  })(
                    <InputNumber min={3} max={10} />
                    )}
                </Form.Item>
                <Form.Item label="选择日期">
                      <Form.Item
                        style={{ display: 'inline-block'}}
                      > {getFieldDecorator('start_time',{
                        rules: [
                          {
                            required: true,
                            message: '请输入开始时间',
                          },
                        ],
                      })(
                        <DatePicker placeholder="开始时间" showTime format="YYYY-MM-DD HH:mm:ss" locale={locale} />)}
                      </Form.Item>
                      <span style={{display:"inline-block",width:30,"textAlign":"center"}}>-</span>
                    <Form.Item style={{ display: 'inline-block' }}>
                    {getFieldDecorator('end_time',{
                        rules: [
                          {
                            required: true,
                            message: '请输入开始时间',
                          },
                        ],
                      })(
                      <DatePicker placeholder="结束时间" showTime format="YYYY-MM-DD HH:mm:ss" locale={locale} />)}
                    </Form.Item>
                </Form.Item>
                <Form.Item
                  >
                    <Button type="primary" htmlType="submit">
                      创建试卷
                    </Button>
                  </Form.Item>
            </div>
        </Form>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
      examType: state.exam.examTypes,
      subject: state.exam.subjects,
      returnData:state.exam.returnData
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
      createExam(payload){
        dispatch({
          type:"exam/createExam",
          payload,
        })
      },
      reset(){
          dispatch({
              type:"exam/reset"
          })
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)( Form.create()(AddExam));
