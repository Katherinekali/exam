import React, { useState, useEffect } from "react";
import { Tag } from 'antd';
import styles from "./questions.scss"
// import Editor from "for-editor";
import { connect } from "dva";
function Question(props) {
    let data=props.location.state;
// console.log(data)
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
                            <div>
                                <div className={styles.react_markdown}>
                                    <pre>{data.data.questions_stem}></pre>
                                    <p>移动顺序由字符串表示。机器人的有效动作有 R（右），L（左），U（上）和 D（下）。如果机器人在完成所有动作后返回原点，则返回 true。否则，返回 false。</p>
                                    <p>示例 1:</p>
                                    <pre>
                                        输入: "LL"
                                        <br />
                                        输出: false
                                        <br />
                                        解释：机器人向左移动两次。它最终位于原点的左侧，
                                        <br />
                                        距原点有两次 “移动” 的距离。我们返回 false，
                                        <br />
                                        因为它在移动结束时没有返回原点.</pre>
                                    <p>示例 2:</p>
                                    <pre>
                                        输入: "LL"
                                        <br />
                                        输出: false
                                        <br />
                                        解释：机器人向左移动两次。它最终位于原点的左侧，
                                        <br />
                                        距原点有两次 “移动” 的距离。我们返回 false，
                                        <br />
                                        因为它在移动结束时没有返回原点.</pre>
                                    <p>注意：机器人“面朝”的方向无关紧要。 “R” 将始终使机器人向右移动一次，“L” 将始终向左移动等。此外，假设每次移动机器人的移动幅度相同。</p>
                                    <p>请根据题意在横线处填写合适的代码：</p>
                                     <p>{data.data.questions_answer}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     }
                    <div className={styles.ant_divider_vertical}></div>
                    <div className={styles.ant_layout_content}>
                        <h3>答案信息</h3>
                        {data.data&&<div className={styles.react_markdown}>
                            <p>{data.data.questions_answer}</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>)
}
export default connect()(Question);
