import React, { useState, useEffect } from "react"
import { Modal, Button, Table, Input, message, Form } from 'antd';
import { connect } from "dva";
import { injectIntl } from 'react-intl';
import "../question/question.css"
const { Column } = Table;
function Room(props) {
    const [flag, setFlag] = useState(false);
    // const [data,setData]=useState("")
    const { getFieldDecorator } = props.form;

    const addFn = () => {
        setFlag(true)
    }
    const hideModal = () => {
        setFlag(false)
    }

    //获取初始教室数据
    useEffect(()=>{
        // setDataSource(props.roomData)
    },[props.roomData])

    //显示弹框信息
    useEffect(()=>{
        if(props.room_msg===1){
            message.success("添加成功")  
            props.addRoom()
         }else if(props.room_msg===0){
            message.error("添加失败") 
         }else{
             return
         }
    },[props.room_msg])
    
    //添加room信息
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // setFlag(false)
                // props.addType({text:values.info,sort:(props.questionsType.length+1).toString()})
            } else {
                message.error("error")
            }
        });
    };
    useEffect(() => {
        props.getRoom()
        console.log(props)
        // if(props.message===1){
        //    message.success("添加成功")  
        //    props.addType()
        // }else if(props.message===-1){
        //   return 
        // }
    }, [])
    useEffect(() => {
        // if(props.message===1){
        //    message.success("添加成功")  
        //    props.addType()
        // }else if(props.message===-1){
        //   return 
        // }
    }, [props.roomData])
    return (
        <div>
            <h2>{props.intl.formatMessage({ id: 'classroom.room' })}</h2>
            <div className="question_content">
                <Button type="primary" icon="plus" onClick={() => { addFn() }}>
                    添加教室
            </Button>
                <div className="questions_table" >

                    {
                        props.roomData && <Table rowKey="questions_type_id" dataSource={props.roomData} pagination={false}>
                            <Column title="类型ID" dataIndex="room_text" />
                            <Column title="操作" dataIndex="删除" />
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
                            rules: [{ required: true, message: 'Please input your questionsType!' }],
                        })(
                            <Input placeholder="questionsType" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

}
let mapStateToProps = state => {
    return {
        ...state.room
    }
}
let mapDispatchToProps = dispatch => {
    return {
        getRoom: () => {
            dispatch({
                type: "room/getRoom",
            })
        },
        addRoom: (payload) => {
            dispatch({
                type: "room/addRoom",
                payload
            })
        }
    }

}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Room)))
