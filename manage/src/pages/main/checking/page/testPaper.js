import React,{useState,useEffect} from "react"
import { Modal, Button,Table,Input,message,Form,Popconfirm} from 'antd';
import {connect} from "dva"
import "../../question/question.css"
function ClassMate(props){
    const [page,setPage]=useState(1)
    useEffect(()=>{
        props.getAll()
    },[])
    const [dataSource,setDataSource]=useState([])//获取到列表数据
    const handleDelete = key => {
        //删除数据
        // props.getAll({room_id:key})
    };
    const changePage=(current)=>{
        setPage(current)

    };
    const changePageSize=(current, pageSize)=>{

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
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '姓名',
            dataIndex: 'student_name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '阅卷状态',
            dataIndex: 'room_text',
            key: 'checkPaper_state',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'subject_name',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '成材率',
            dataIndex: 'room_text',
            key: 'room_text',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: '操作',
          dataIndex:'action',
          key: 'action',
          render: (text, record) =>
          props.TestPape.length >= 1 ? (
              <a href={`/#/main/page/testPaper?grade_id=${record.grade_id}`}>批卷</a>
          ) : null,
        },
      ];
    const [flag, setFlag] = useState(false);
    const { getFieldDecorator } =props.form;

    //设置弹框
    const addFn=()=>{
        setFlag(true)
    }
    const hideModal=()=>{
        setFlag(false)
    }

    //获取初始教室数据
    useEffect(()=>{
        setDataSource(props.TestPape)
    },[props.TestPape])

    // //显示弹框信息
    // useEffect(()=>{
    //     console.log(props,"3445")
    //     if(props.room_msg===1){
    //         message.success("添加成功")  
    //         props.addRoom()
    //      }else if(props.room_msg===0){
    //         message.error("添加失败") 
    //      }else{
    //          return
    //      }
    // },[props.room_msg])
    
    //添加room信息
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            setFlag(false)
            props.addRoom({room_text:values.info})
          }else{
            message.error("error")
          }
        });
    };
    return (
        <div>
            <h2>试卷列表</h2>
            <div className="question_content">
            <div className="questions_table" >
            {
               dataSource&&<Table columns={columns} rowKey="grade" dataSource={dataSource}  pagination={paginationProps}>
             </Table>
            }
            </div>
            </div>
            <Modal
            title="创建新类型"
            visible={flag}
            onOk={()=>{handleSubmit()}}//点击确认除了要关闭弹框还要发送请求，把内容添加到后台
            onCancel={()=>{hideModal()}}
            okText="确认"
            cancelText="取消"
            >
            <Form className="login-form">
                <Form.Item>
                {getFieldDecorator('info', {
                    rules: [{ required: true, message: '请输入教室信息!' }],
                })(
                    <Input placeholder="请输入教室信息"/>
                )}
                </Form.Item>
            </Form>
            </Modal> 
        </div>
    )

}
let mapStateToProps=state=>{
    return {
        TestPape:state.checkPaper.TestPape
        
    }
}
let mapDispatchToProps=dispatch=>{
    return {
        //获取所有信息
        getAll:()=>{
            dispatch({
                type:"checkPaper/getTestInfo",
            })
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ClassMate))