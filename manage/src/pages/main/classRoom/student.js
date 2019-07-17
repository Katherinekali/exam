import React, { useState, useEffect } from 'react'
import { connect } from "dva";
import "antd/dist/antd.css";
import { Form, Button, Table,Input,Select,message,} from "antd";
const { Option } = Select;
function StudentMange(props) {
    useEffect(()=>{
        props.getClassName()
        props.getClassRoom()
        props.getHasStudent()
        props.getHasNoStudent()
    },[])
   let [inputVal,setInputVal]=useState("")
   let [classRoom,setclassRoom]=useState("")
   let [className,setclassName]=useState("")
    let deleteStudent=(id)=>{
        props.deleteStudent(id)
    }
    //分页器：
    let  pagination={
        defaultPageSize:6,
        showQuickJumper:true,
        showSizeChanger:true,
    }
    useEffect(()=>{
        if(props.deleteState===1){
            message.success('删除成功');
            props.record()
            props.getHasStudent()
            props.getHasNoStudent()
        }
    },[props.deleteState])
    //点击重置：
    let reset=()=>{
        props.form.resetFields();
    }
    let  handleSubmit =() => {
        props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            console.log("获取到数据，但是没有接口查找",values)
          }
        });
      };
    let search=()=>{
        handleSubmit()
    }
    const { getFieldDecorator } = props.form;
    const { Column} = Table;
	return (
		<div>
			<h2>学生管理</h2>
			<div>
            <Form layout="inline">
                    <Form.Item>
                        {getFieldDecorator('name')(
                           <Input placeholder="输入学生姓名"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('classRoom')(
                                <Select style={{ width: 150 }} placeholder="请选择教室号">
                                    { props.classRoom.map(item=>{
                                        return  <Option value={item.room_id} key={item.room_id}>{item.room_text}</Option>
                                    })}
                                </Select>
                            )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('className')(
                                <Select style={{ width: 150 }}  placeholder="班级名">
                                    {props.className.map(item=>{
                                            return  <Option value={item.grade_id} key={item.grade_id}>{item.grade_name}</Option>
                                        })}
                                </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" style={{width:120}} onClick={search}>
                       搜索
                    </Button>
                    <Button type="primary" style={{width:120,marginLeft:20}} onClick={reset}>
                        重置
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{background:"#fff",marginTop:20}}>
                <Table 
                        dataSource={props.students} 
                        rowKey="student_id"  
                        pagination={pagination}
                >
                    <Column title="姓名" dataIndex="student_name" key="student_name" />
                    <Column title="学号" dataIndex="student_id" key="student_id" />
                    <Column title="班级" dataIndex="grade_name" key="grade_name" />
                    <Column title="教室" dataIndex="room_text" key="room_text" />
                    <Column title="密码" dataIndex="student_pwd" key="student_pwd" />
                    <Column  
                        title="操作" 
                        dataIndex="student_id" 
                        key="1"
                        render={(text) => (
                                    <span onClick={()=>{deleteStudent(text)}}>删除</span>
                                )}
                     />
                </Table>                   
            </div>
		</div>
	)
}
const mapStateToProps = state => {
	return {
        className:state.student.className,
        classRoom:state.student.classRoom,
        deleteState:state.student.deleteState,
        students:state.student.students
	}
};
const mapDispatchToProps = dispatch => {
	return {
		//所有班级号
		getClassRoom: () => {
			dispatch({
				type: "student/getClassRoom",
			})
		},
		//所有班级名称
		getClassName: () => {
			dispatch({
				type: "student/getClassName",
			})
        },
        //所有有班级的学生
		getHasStudent: () => {
			dispatch({
				type: "student/getHasRoomstudents",
			})
        },
        //所有没有班级的学生
		getHasNoStudent: () => {
			dispatch({
				type: "student/getNoRoomstudents",
			})
        },
         //所有没有班级的学生
		deleteStudent: (payload) => {
			dispatch({
                type: "student/deleteStudent",
                payload,
			})
        },
        //删除学生之后状态恢复
		record: () => {
			dispatch({
                type: "student/record",
                payload:-1,
			})
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(StudentMange))

