import React,{useEffect,useState} from "react"
import { connect } from "dva";
import styles from "./addQuextion.scss"
import {Tag, Select, Button, Form,Table } from 'antd';
const { Option } = Select;
const { CheckableTag } = Tag;
const { Column} = Table;
function AddNewQuestionToExam(props){
  const { getFieldDecorator } = props.form;
  useEffect(()=>{
    props.getExamType()
    props.getSubject()
    props.getQuestionType()
    props.getQuestion();
  },[])
  //选中项
  let [selectedTags,setSelectedTags]=useState([])
  let [selectedId,setSelectedId]=useState("")
  //点击all
  let [all,setAll]=useState(false)
  let [flag,setFlag]=useState(false)
  //单选项
  let  handleChange=(tag, checked)=> {
    const nextSelectedTags = checked ? [tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags)
    setSelectedId(tag.subject_id)
  }
  //选择所有的项：
  let changeAll = checked => {
    setAll(checked)
    setFlag(checked)
    props.getQuestion();
  };

  // 查询  获取select选中的值
  let handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
       values.subject_id?values.subject_id="":values.subject_id=selectedId
      props.getQuestion(values)
      }
    });
  };
  let searchQuestion=()=>{
    handleSubmit()
  }
  let changeQuestion=(item,type)=>{
    let exam =JSON.parse(sessionStorage.getItem("createExam"))
    let index=exam.questions.findIndex(v=>v.questions_id===item.questions_id)
    if(index===-1){
      exam.questions.push(item)
    }
    sessionStorage.setItem("createExam",JSON.stringify(exam))
    props.change(false)
  }
  return (
  <div>
      <div>
          <div>
              <h4 style={{display:"inline"}}>Categories</h4>
              <CheckableTag checked={all} onChange={changeAll}> All </CheckableTag>
              {props.subject.map(item => (
                <CheckableTag
                  key={item.subject_id}
                  checked={selectedTags.indexOf(item) > -1}
                  onChange={checked => handleChange(item, checked)}
                  className={flag?"ant-tag-checkable-checked":""}
                >
                  {item.subject_text}
                </CheckableTag>
              ))}
          </div>
          <div style={{marginTop:10}}>
                <Form  layout="inline">
                  <div className={styles.selected}>
                      <Form.Item label="考试类型">
                          {getFieldDecorator("exam_id", {
                            initialValue: undefined
                          })(<Select style={{ width: 180 }}>
                            {props.examType.map((item) => {
                              return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                            })}
                          </Select>
                          )}
                      </Form.Item>
                      <Form.Item  label="题目类型">
                          {getFieldDecorator("questions_type_id", {
                            initialValue: undefined
                          })(<Select style={{ width: 180 }}>
                            {props.questionType.map((v) => {
                              return <Option value={v.questions_type_id} key={v.questions_type_id}>{v.questions_type_text}</Option>
                            })}
                          </Select>)
                          }
                      </Form.Item>
                      <Form.Item>
                          <Button type="primary" htmlType="submit" icon="search" onClick={searchQuestion}>
                              查询
                          </Button>
                      </Form.Item>
                  </div>
              </Form>     
          </div>
      </div>
      <div style={{marginTop:10}}>
        <Table 
        dataSource={props.questionList} 
        rowKey="questions_id"  
        >
        <Column 
          title="" 
          dataIndex="exam_id" 
          key="exam_id" 
          render={(text,item)=>(
            <div>
              <h4>{item.title}</h4>
              <div>
                  <Tag color="blue">{item.questions_type_text}</Tag>
                  <Tag color="geekblue">{item.subject_text}</Tag>
                  <Tag color="orange">{item.exam_name}</Tag>
              </div>
            </div>
          )}
          />
           <Column 
              title="" 
              render={(text,item)=>(
                <div className={styles.btn}>
                  {/* {props.children} */}
                    <span className="add" onClick={()=>changeQuestion(item,"add")}>添加</span>
                    <span className="detail" onClick={()=>changeQuestion(item,"detail")}>详情</span>
                </div>
              )}
          />
        </Table>                        
      </div>
  </div>)
}
let mapStateToProps=state=>{
  return {
    examType: state.question.examType,
    subject: state.question.subject,
    questionType: state.question.questionType,
    questionList:state.checkTheItem.list
  }
}
let mapDispatchToProps=dispatch=>{
  return {
          getExamType() {
            dispatch({
                type: "question/examType",
                payload: ""
            })
        },
        getSubject() {
            dispatch({
                type: "question/subject",
                payload: ""
            })
        },
        getQuestionType() {
            dispatch({
                type: "question/questionType",
                payload: ""
            })
        },
      getQuestion: payload => { //条件查询 
        dispatch({
          type: "checkTheItem/conditionquery",
          payload,
        })
      },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddNewQuestionToExam))
