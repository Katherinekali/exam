import React,{useEffect} from 'react'
import {connect} from "dva"
import styles from "../addExam.scss"
function examDetail (props) {
   
    useEffect(()=>{
        // let id=props.location.search.split("=")[1]
        // let examList=JSON.parse(sessionStorage.getItem("examList"))
         
    },[])
    return (
        <div>
            <h2>试卷详情</h2>
            <div className={styles.question_content}>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
   
    return {
       
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