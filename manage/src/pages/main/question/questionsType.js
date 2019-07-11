import React,{useState,useEffect} from "react"
import { Modal, Button,Table,Input,message} from 'antd';
import {connect} from "dva"
import "./questionsType.css"
const { Column} = Table;
function QuestionsType(props){
    console.log(props)
    const [flag, setFlag] = useState(false);
    const [val,setVal]=useState("请输入试卷类型")
    const addFn=()=>{
        setFlag(true)
    }
    const hideModal=()=>{
        setFlag(false)
    }
    const addModal=()=>{
        setFlag(false)
        props.addType({text:val,sort:(props.questionsType.length+1).toString()})
    }
    const paginationProps = {
        // showSizeChanger: true,
        // showQuickJumper: false,
        // showTotal: () => `共${totals}条`,
        pageSize: 5
        // current: page.pageNum,
        // total: page.total,
        // onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
        // onChange: (current) => this.changePage(current),
      }
    useEffect(()=>{
        props.getType()
        if(props.message==="数据插入"){
           message.success("添加成功")
        }
    },[props.message])
    return (
        <div className="questions_wrapper">
            <h2>试题分类</h2>
            <div className="question_content">
            <Button type="primary" icon="plus" onClick={()=>{addFn()}}>
                添加类型
            </Button>
            <div className="questions_table">
            {
               props.questionsType&&<Table rowKey="questions_type_id" dataSource={props.questionsType}  pagination={paginationProps}>
               <Column title="类型ID" dataIndex="questions_type_id"  />
               <Column title="类型名称" dataIndex="questions_type_text"  />
               <Column title="操作" dataIndex=""  />
             </Table>
            }
            </div>
            </div>
            <Modal
            title="创建新类型"
            visible={flag}
            onOk={()=>{addModal()}}//点击确认除了要关闭弹框还要发送请求，把内容添加到后台
            onCancel={()=>{hideModal()}}
            okText="确认"
            cancelText="取消"
            >
            <Input placeholder="Basic usage" value={val} onChange={(e)=>{setVal(e.target.value)}} />
            </Modal> 
        </div>
    )

}
let mapStateToProps=state=>{
    return {
        ...state.test
    }
}
let mapDispatchToProps=dispatch=>{
    return {
        getType:()=>{
            dispatch({
                type:"test/getType",
            })
        },
        addType:(payload)=>{
            dispatch({
                type:"test/addType",
                payload
            })
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(QuestionsType)