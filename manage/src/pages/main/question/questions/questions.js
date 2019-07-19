import React, { useEffect } from "react";
import { Tag } from 'antd';
import styles from "./questions.scss"
import ReactMarkdown from "react-markdown";
import { injectIntl } from 'react-intl';
import { connect } from "dva";
function Question(props) {
    // let data = props.location.state ? props.location.state : JSON.parse(localStorage.getItem('data'));
    // localStorage.setItem('data', JSON.stringify(data))
    useEffect(() => {
        props.refer({ questions_id: props.match.params.id })
    }, [])
    //console.log(props.list)
    return (
        <div className={styles.detailWrapper}>
            <h2 className={styles.title}>{props.intl.formatMessage({ id: 'questions.DetailQuestions' })}</h2>
            <div className={styles.ant_layout_detailBox}>
                <div style={{
                    display: "flex"
                }}>
                    {props.list[0] && <div className={styles.ant_layout_content}>
                        <div style={{ marginBottom: "20px" }}><span>出题人：{props.list[0].user_name}</span><div></div></div>
                        <h3>题目信息</h3>
                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Tag color="blue">{props.list[0].questions_type_text}</Tag>
                            <Tag color="geekblue">{props.list[0].subject_text}</Tag>
                            <Tag color="orange">{props.list[0].exam_name}</Tag>
                            <h4>{props.list[0].title}</h4>
                            <ReactMarkdown source={props.list[0].questions_stem} className={styles.react_markdown} />
                        </div>
                    </div>
                    }
                    <div className={styles.ant_divider_vertical}></div>
                    <div className={styles.ant_layout_contents}>
                        <h3>答案信息</h3>
                        {props.list[0] && <ReactMarkdown source={props.list[0].questions_answer} className={styles.react_markdown} />}
                    </div>
                </div>
            </div>
        </div>)
}
const mapState = state => {
    return {
        ...state.checkTheItem
    };
};
const mapDispatch = dispatch => {
    return {
        refer: payload => {
            //console.log(payload)
            dispatch({
                type: "checkTheItem/conditionquery",
                payload
            })
        },
    }
}
export default connect(mapState, mapDispatch)(Question);
