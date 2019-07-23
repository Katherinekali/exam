import React,{useState,useEffect} from "react"
import { Modal,Table,Input,message,Form} from 'antd';
import {connect} from "dva"
import "../../question/question.css"
function ClassList(props) {
    const [page, setPage] = useState(1)
    useEffect(() => {
        props.getAll()
    },[])
    const [dataSource,setDataSource]=useState([])//获取到列表数据

    //点击批卷执行的动作
    const handle = key => {
        console.log(key)
        console.log(props)
        let {history}=props;
        //注意的问题  跳转页面过去要使得页面刷新传过去的id和班级都存在
        sessionStorage.setItem('paperInfo',JSON.stringify({id:key.grade_id,grade:key.grade_name}));// 存入到sessionStorage中
        history.push({pathname:'/main/testPaper',state:{id:key.grade_id,grade:key.grade_name}})
    };
    const changePage = (current) => {
        setPage(current)

    };
    const changePageSize=()=>{

    }
    const paginationProps = {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize:10,
        current: page,
        total: props.AllClassroom.length,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    };

    const columns = [
        {
          title: '班级名',
          dataIndex: 'grade_name',
          key: 'grade',
        },
        {
            title: '课程名称',
            dataIndex: 'subject_text',
            key: 'subject',
        },
        {
            title: '阅卷状态',
            dataIndex: 'room_text',
            key: 'checkPaper_state',
        },
        {
            title: '课程名称',
            dataIndex: 'subject_text',
            key: 'subject_name',
        },
        {
            title: '成材率',
            dataIndex: 'room_text',
            key: 'success',
        },
        {
          title: '操作',
          dataIndex:'action',
          key: 'action',
          render: (text, record) =>
          props.AllClassroom.length >= 1 ? (
              <span style={{color:"blue"}} onClick={()=>{handle(record)}}>批卷</span>
          ) : null,
        },
    ];
    const [flag, setFlag] = useState(false);
    const { getFieldDecorator } = props.form;

    //设置弹框
    // const addFn=()=>{
    //     setFlag(true)
    // }
    const hideModal=()=>{
        setFlag(false)
    }

    //获取初始教室数据
    useEffect(() => {
        // console.log(props.AllClassroom)
        setDataSource(props.AllClassroom)
    }, [props.AllClassroom])

    //显示弹框信息
    useEffect(() => {
        if (props.room_msg === 1) {
            message.success("添加成功")
            props.addRoom()
        } else if (props.room_msg === 0) {
            message.error("添加失败")
        } else {
            return
        }
    }, [props.room_msg])

    //添加room信息
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                setFlag(false)
                props.addRoom({ room_text: values.info })
            } else {
                message.error("error")
            }
        });
    };
    return (
        <div>
            <h2>待批班级</h2>
            <div className="question_content">
                <div className="questions_table" >
                    {
                        dataSource && <Table columns={columns} rowKey="room_id" dataSource={dataSource} pagination={paginationProps}>
                        </Table>
                    }
                </div>
            </div>
            <Modal
                title="创建新类型"
                visible={flag}
                onOk={() => { handleSubmit() }}//点击确认除了要关闭弹框还要发送请求，把内容添加到后台
                onCancel={() => { hideModal() }}
                okText="确认"
                cancelText="取消"
            >
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('info', {
                            rules: [{ required: true, message: '请输入教室信息!' }],
                        })(
                            <Input placeholder="请输入教室信息" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

}
let mapStateToProps = state => {
    return {
        AllClassroom: state.checkPaper.AllClassroom

    }
}
let mapDispatchToProps = dispatch => {
    return {
        //获取所有信息
        getAll: () => {
            dispatch({
                type: "checkPaper/getAll",
            })
        },
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ClassList))
