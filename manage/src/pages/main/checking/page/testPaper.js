import React,{useState,useEffect} from "react"
import {Table,Form} from 'antd';
import {connect} from "dva"
import "../../question/question.css"
function ClassMate(props){
    const [page,setPage]=useState(1)
    useEffect(()=>{
        props.getAll()
    },[])
    const [dataSource,setDataSource]=useState([])//获取到列表数据
    const changePage=(current)=>{
        setPage(current)

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
    //获取初始教室数据
    useEffect(()=>{
        setDataSource(props.TestPape)
    },[props.TestPape])

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