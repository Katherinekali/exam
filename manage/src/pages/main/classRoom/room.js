import React,{useState,useEffect} from "react"
import { Modal, Button,Table,Input,message,Form,Popconfirm} from 'antd';
import {connect} from "dva"
import "../question/question.css"

function Room(props){
    useEffect(()=>{
        props.getRoom()
    },[])
    const [dataSource,setDataSource]=useState([])//获取到列表数据
    const handleDelete = key => {
        //删除数据
        props.delData({room_id:key})
    };
    const columns = [
        {
          title: '教室号',
          dataIndex: 'room_text',
          key: 'roomNumber',
        },
        {
          title: '操作',
          dataIndex:'action',
          key: 'action',
          render: (text, record) =>
          props.roomData.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.room_id)}>
              <span>删除</span>
            </Popconfirm>
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
        setDataSource(props.roomData)
    },[props.roomData])

    //显示弹框信息
    useEffect(()=>{
        console.log(props,"3445")
        if(props.room_msg===1){
            message.success("成功")  
            //注意：在删除成功或者添加成功后要重新调用数据，重新获取数据
            props.getRoom()
            props.upstate()
         }else if(props.room_msg===0){
            message.error("error") 
            props.upstate()
         }else{
             return
         }
    },[props.room_msg])
    
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
            <h2>教室管理</h2>
            <div className="question_content">
            <Button type="primary" icon="plus" onClick={()=>{addFn()}}>
                添加教室
            </Button>
            <div className="questions_table" >
            {
               dataSource&&<Table columns={columns} rowKey="room_id" dataSource={dataSource}  pagination={false}>
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
        ...state.room
    }
}
let mapDispatchToProps=dispatch=>{
    return {
        getRoom:()=>{
            dispatch({
                type:"room/getRoom",
            })
        },
        addRoom:(payload)=>{
            dispatch({
                type:"room/addRoom",
                payload
            })
        },
        delData:(payload)=>{
            dispatch({
                type:"room/delRoom",
                payload
            })

        },
        upstate:()=>{
            dispatch({
                type:"room/updateState",
                
            })

        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Room))
