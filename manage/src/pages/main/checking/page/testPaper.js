import React,{useState,useEffect} from "react"
import {Table,message,Form,
    Select,
    Button,
   } from 'antd';
import {
    
  } from "antd";
import {connect} from "dva"
import "../../question/question.css"
import styles from "../../exam/addExam.scss"
function ClassMate(props){
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    const [info,setInfo]=useState({})
    const [page,setPage]=useState(0)
    useEffect(()=>{
        if(props.location.state){//判断当前有参数
            let data=JSON.parse(sessionStorage.getItem('paperInfo'))
            setInfo(data)
            props.getTestInfo({grade_id:data.id}) 
        }
    },[])
    const [dataSource,setDataSource]=useState([])//获取到列表数据
    const changePage=(current)=>{
        setPage(current)
    };
    const handle = key => {
        console.log(key)
        // console.log(props)
         let {history}=props;
        // //注意的问题  跳转页面过去要使得页面刷新传过去的id和班级都存在
        sessionStorage.setItem('studentInfo',JSON.stringify({id:key.exam_student_id,name:key.student_name}));// 存入到sessionStorage中
        history.push({pathname:`/main/page/detail/${key.exam_student_id}`,state:{id:key.exam_student_id,name:key.student_name}})
    };
    const changePageSize=()=>{

    }
    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize:10,
        current: page,
        // total: props.TestPape.length,
        onShowSizeChange: (current,pageSize) =>changePageSize(pageSize,current),
        onChange: (current) =>changePage(current),
      };
    
    const columns = [
        {
          title: '班级',
          dataIndex: 'grade_name',
          key: 'grade',
          render: (text, record) =>
          props.TestPape.length >= 1 ? (
              <span>{info&&info.grade}</span>
          ) : null,
        },
        {
            title: '姓名',
            dataIndex: 'student_name',
            key: 'name',
       
        },
        {
            title: '阅卷状态',
            dataIndex: 'status',
            key: 'checkPaper_state',
         
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'subject_name',
          
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
         
        },
        {
            title: '成材率',
            dataIndex: 'score',
            key: 'score',
            
         
        },
        {
          title: '操作',
          dataIndex:'action',
          key: 'action',
          render: (text, record) =>
          props.TestPape.length >= 1 ? (
            <span style={{color:"blue"}} onClick={()=>{handle(record)}}>批卷</span>
              //<a style={{color:"blue"}} href={`/#/main/page/detail/${record.grade_id}`}>批卷</a>
          ) : null,
        },
      ];
    //获取初始教室数据
    useEffect(()=>{
        console.log(props.TestPape)
        setDataSource(props.TestPape)
    },[props.TestPape])
    //搜索数据
    const getSearch = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            props.getTestInfo({grade_id:values.grade_id})
          }else{
            message.error("error")
          }
        });
    };
    return (
        <div>
            <h2>试卷列表</h2>
            <div className="question_content">
            <div className={styles.question_content}>
                <Form layout="inline">
                    <Form.Item  label="状态">
                    {getFieldDecorator('exam_id',)(
                            <Select style={{ width: 150 }}>
                            { props.examType&&props.examType.map(item=>{
                                return  <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                            })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item  label="班级">
                    {getFieldDecorator('grade_id')(
                            <Select style={{ width: 150 }}>
                            {
                            props.AllClassroom&&props.AllClassroom.map(item=>{
                                return  <Option value={item.grade_id} key={item.grade_id}>{item.grade_name}</Option>
                            })
                            }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" icon="search" onClick={()=>{getSearch()}}>
                       查询
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="questions_table" >
            {
               dataSource&&<Table columns={columns} rowKey="grade" dataSource={dataSource}  pagination={paginationProps}>
             </Table>
            }
            </div>
            </div>
        </div>
    )

}
let mapStateToProps=state=>{
    return {
        TestPape:state.checkPaper.TestPape,
        AllClassroom:state.checkPaper.AllClassroom
    }
}
let mapDispatchToProps=dispatch=>{
    return {
        //获取所有信息
        getTestInfo:(payload)=>{
            dispatch({
                type:"checkPaper/getTestInfo",
                payload
            })
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ClassMate))