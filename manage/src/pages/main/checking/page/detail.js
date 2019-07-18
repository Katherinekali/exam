import  React,{useState,useEffect} from "react"
import { Layout,List, Slider, InputNumber, Button, Col} from 'antd';
import { connect } from "dva";
import styles from "./detail.scss"
function Detail(props){
    const {  Content } = Layout;
    const [inputValue,SetInputValue]=useState(0)
    const [info,setInfo]=useState({})
    const onChange=(value)=>{
        SetInputValue(value)
    }
    useEffect(()=>{
            let data=JSON.parse(sessionStorage.getItem('studentInfo'))
            setInfo(data)
            console.log(data)
            props.getStudentInfo(data.id) 
    },[])
    return <div>
        <h2>阅卷</h2>
        <div className={styles.paper_wrapper}>
            <Content className={styles.paper_left}>
            <List
     
            />
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
           
            <Button type="primary">确定</Button>
            
            </Content>
        </div>
    </div>

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
        getStudentInfo:(payload)=>{
            dispatch({
                type:"checkPaper/getStudentInfo",
                payload
            })
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail)