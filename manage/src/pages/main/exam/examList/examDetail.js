import React, { useEffect, useState } from 'react'
import { connect } from "dva"
import styles from "../addExam.scss"
<<<<<<< HEAD
import ReactMarkdown from "react-markdown";
function examDetail (props) {
    let [detail,setDetail]=useState({})
    useEffect(()=>{
        let id=props.location.search.split("=")[1]
        // let examList=JSON.parse(sessionStorage.getItem("examList"))
        props.getDetail(id)
    },[])
=======
import { injectIntl } from 'react-intl';
import ReactMarkdown from "react-markdown";
function examDetail(props) {
    let [detail, setDetail] = useState({})
    useEffect(() => {
        let id = props.location.search.split("=")[1]
        // let examList=JSON.parse(sessionStorage.getItem("examList"))
        props.getDetail(id)
    }, [])
>>>>>>> 4c7c44027bc7a340add58561b7c63f83fbc5d607
    return (
        <div>
            <h2>试卷详情</h2>
            <div className={styles.detail_content}>
                <div className={styles.content_left}>
                    <div>
                        {
                            props.detailData.map((item, index) => {
                                return <div key={index}>
<<<<<<< HEAD
                                    <h4>{index+1}:{item.title}</h4>
                                    <div>     
                                        <ReactMarkdown source={item.questions_stem} className={styles.question_list}/>
=======
                                    <h4>{index + 1}:{item.title}</h4>
                                    <div>
                                        <ReactMarkdown source={item.questions_stem} />
>>>>>>> 4c7c44027bc7a340add58561b7c63f83fbc5d607
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {/* <div className={styles.content_right}></div> */}
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
<<<<<<< HEAD
        detailData:state.exam.detailData,
=======
        detailData: state.exam.detailData,

>>>>>>> 4c7c44027bc7a340add58561b7c63f83fbc5d607
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDetail(payload) {
            dispatch({
                type: "exam/getDetail",
                payload,
            })
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(examDetail)