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
    Radio,
    Table, Divider, Tag
  } from "antd";
import styles from "./addExam.scss"
function ExamList (props) {
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    let [size,setSize]=useState("all")
    useEffect(()=>{
        props.getExamType()
        props.getSubject()
        props.getExamList()
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
    let handleSizeChange=(e)=>{
        setSize(e.target.value)
    }
    let [title,setTitle]=useState("")
    useEffect(()=>{
        if(props.examList){
            props.examList.forEach(item=>{
                console.log(item)
            })
        }
       
    },[props.examList])
 
    const columns = [
        {
            title: '试卷信息',
            dataIndex:"title",
            render: (text) => (
                console.log(text)
            ),
            rowSelection:{}
        },
        {
            title: '班级',
            dataIndex: 'grade_name',
            render: (text) => (
                <div>
                    <p>考试班级</p>
                   {
                       text.map((item,index)=>{
                           return <span style={{marginRight:4}} key={index}>{item}</span>     
                       })
                   }
                </div>
            )
          },
        {
            title: '创建人',
            dataIndex: 'user_name',
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
        },
        {
            title: '操作',
            dataIndex: '',
            render: () => <a href="javascript:;">详情</a>,
        },
      ];
    
   
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
                <div className={styles.list_top}>
                    <h4>试卷列表</h4>
                    <div>
                        <Radio.Group value={size} onChange={handleSizeChange}>
                            <Radio.Button value="all">全部</Radio.Button>
                            <Radio.Button value="doing">进行中</Radio.Button>
                            <Radio.Button value="done">已完成</Radio.Button>
                        </Radio.Group>    
                    </div>
                </div>
                <div>
                    <Table columns={columns} dataSource={props.examList&&props.examList} pagination={false}/>       
                </div>         
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state.exam.examList)
    return {
        examType: state.exam.examTypes,
        subject: state.exam.subjects,
        examList:state.exam.examList.exam,
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
        getExamList(payload) {
            dispatch({
                type: "exam/getExamList",
                payload,
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