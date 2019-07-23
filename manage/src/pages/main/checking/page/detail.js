import  React,{useState,useEffect} from "react"
import { Layout,Empty, Slider, InputNumber, Button, Col,Modal} from 'antd';
import { connect } from "dva";
import styles from "./detail.scss"
const { confirm } = Modal;
function Detail(props){
    const {  Content } = Layout;
    const [inputValue,SetInputValue]=useState(0)
    const [info,setInfo]=useState({})
    const onChange=(value)=>{
        SetInputValue(value)
    }
    let { markStudent } = props
    console.log(props)
    function showConfirm() {
        confirm({
            title: '确定提交阅卷结果？',
            content: `分数值是${inputValue}`,
            cancelText: '取消',
            okText: '确认',
            onOk() {
                console.log('OK');
                
                showConfirm2()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    function showConfirm2() {
        confirm({
            title: '批卷结果',
            content: `批改试卷成功,${info&&info.name}得分是${inputValue}`,
            cancelText: '取消',
            okText: '确认',
            onOk() {
                console.log('OK');
                props.correctTestPaper({exam_student_id:info.id,score:inputValue})
                props.history.go(-1)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    useEffect(()=>{
            let data=JSON.parse(sessionStorage.getItem('studentInfo'))
            setInfo(data)
            console.log(data,11111111)
            props.getStudentInfo(data.id) 
    },[])
    return <div>
        <h2>阅卷</h2>
        <div className={styles.paper_wrapper}>
            <Content className={styles.paper_left}>
            {Object.keys(markStudent).length ? <div className="ant_student_questions">
                        {markStudent.questions && markStudent.questions.map((item, index) => <div key={item.questions_id}>
                            <h2>{index + 1}、{item.title}</h2>
                            <div className="ant_questions_stem">
                                {item.questions_stem}
                            </div>
                            <div className="ant_student_answer">
                                <div>
                                    <h3>学生答案</h3>
                                    <div>
                                        <pre>
                                        <code>
                                        {item.student_answer}
                                        </code>
                                        </pre>
                                    </div>
                                </div>
                                <div>
                                    <h3>标准答案</h3>
                                    <div>
                                        <pre>
                                            <code>
                                                {item.questions_answer}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />}
            </Content>
            <Content className={styles.paper_right}>
            <Col>
            <h2>姓名{info&&info.name}</h2>
            </Col>
            <Col >
                <h2 style={{display:"inline-block"}}>得分：</h2>
                <InputNumber style={{display:"inline-block",border:"none"}}
                min={1}
                max={100}
                value={inputValue}
                onChange={onChange}
            />
            </Col>
            <Col span={22}>
                <Slider
                    min={1}
                    max={100}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
            </Col>
           
            <Button type="primary"  onClick={showConfirm}>确定</Button>
            
            </Content>
        </div>
    </div>

}
let mapStateToProps=state=>{
    return {
        TestPape:state.checkPaper.TestPape,
        AllClassroom:state.checkPaper.AllClassroom,
        markStudent:state.checkPaper.markStudent
    }
}
let mapDispatchToProps=dispatch=>{
    return {
        //获取所有信息
        getStudentInfo:(payload)=>{
            dispatch({
                type:"checkPaper/getStudentInfo",
                payload
            })
        },
        correctTestPaper:(payload)=>{
            dispatch({
                type:"checkPaper/correctTestPaper",
                payload
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail)