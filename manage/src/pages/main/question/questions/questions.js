import React, { useEffect } from "react";
import { Tag } from 'antd';
import styles from "./questions.scss"
import ReactMarkdown from "react-markdown";
import { connect } from "dva";
function Question(props) {
    let data = props.location.state ? props.location.state : JSON.parse(localStorage.getItem('data'));
    localStorage.setItem('data', JSON.stringify(data))
    useEffect(() => {
      
    })
    return (
        <div className={styles.detailWrapper}>
            <h2 className={styles.title}>试题详情</h2>
            <div className={styles.ant_layout_detailBox}>
                <div style={{
                    display: "flex"
                }}>
                    {data.data && <div className={styles.ant_layout_content}>
                        <div style={{ marginBottom: "20px" }}><span>出题人：{data.data.user_name}</span><div></div></div>
                        <h3>题目信息</h3>
                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Tag color="blue">{data.data.questions_type_text}</Tag>
                            <Tag color="geekblue">{data.data.subject_text}</Tag>
                            <Tag color="orange">{data.data.exam_name}</Tag>
                            <h4>{data.data.title}</h4>
                            <ReactMarkdown source={data.data.questions_stem} className={styles.react_markdown} />
                        </div>
                    </div>
                    }
                    <div className={styles.ant_divider_vertical}></div>
                    <div className={styles.ant_layout_contents}>
                        <h3>答案信息</h3>
                        <ReactMarkdown source={data.data.questions_answer} className={styles.react_markdown} />
                    </div>
                </div>
            </div>
        </div>)
}

export default connect()(Question);
