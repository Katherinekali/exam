import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Form, Select, Button, Radio, Table, } from "antd";
import styles from "../addExam.scss"
import moment from 'moment';
import { injectIntl } from 'react-intl';
moment.locale('zh-cn');
function ExamList(props) {
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    let [size, setSize] = useState("all")
    useEffect(() => {
        props.getExamType()
        props.getSubject()
        props.getExamList()
    }, [])
    let handleSubmit = () => {
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    subject_id: values.subject_id,
                }
                props.getExamList(data)
            }
        });
    };
    let getSearch = () => {
        handleSubmit()
    }
    let handleSizeChange = (e) => {
        setSize(e.target.value)
    }
    const columns = [
        {
            title: '试卷信息',
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <div key="title">
                    <h4>{record.title}</h4>
                    <p>
                        <span>考试时间：{
                            moment.duration((record.end_time - record.start_time), 'ms').get('hours') + ":" + moment.duration((record.end_time - record.start_time), 'ms').get('minutes') + ":" + moment.duration((record.end_time - record.start_time), 'ms').get('seconds')
                        } </span>
                        <span>{record.number}道题 </span>
                        <span>作弊0分</span>
                    </p>
                </div>
            )
        },
        {
            title: '班级',
            dataIndex: 'grade_name',
            key: "classname",
            render: (text) => (
                <div>
                    <p>考试班级</p>
                    {
                        text.map((item, index) => {
                            return <span style={{ marginRight: 4 }} key={"grade" + index}>{item}</span>
                        })
                    }
                </div>
            )
        },
        {
            title: '创建人',
            dataIndex: 'user_name',
            key: "creater",
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: "start",
            render: (text) => (<span>{
                moment(text * 1).format('YYYY-MM-DD HH:mm:ss')
            }</span>)
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: "end",
            render: (text) => (<span>{moment(text * 1).format('YYYY-MM-DD HH:mm:ss')}</span>)
        },
        {
            title: '操作',
            dataIndex: 'exam_id',
            key: "oper",
            render: (text) => (<a href={`/#/main/exam/detail?id=${text}`}>详情</a>)
        },
    ];


    return (
        <div>
            <h2>{props.intl.formatMessage({ id: 'exam.examList' })}</h2>
            <div className={styles.question_content}>
                <Form layout="inline">
                    <Form.Item label="考试类型">
                        {getFieldDecorator('exam_id')(
                            <Select style={{ width: 150 }}>
                                {props.examType && props.examType.map(item => {
                                    return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="课程">
                        {getFieldDecorator('subject_id')(
                            <Select style={{ width: 150 }}>
                                {
                                    props.subject && props.subject.map(item => {
                                        return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon="search" onClick={getSearch}>
                            查询
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={styles.question_content}>
                <div className={styles.list_top}>
                    <h4>试卷列表</h4>
                    <div>
                        <Radio.Group value={size} onChange={handleSizeChange}>
                            <Radio.Button value="all">全部</Radio.Button>
                            <Radio.Button value="doing">进行中</Radio.Button>
                            <Radio.Button value="done">已完成</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <div>
                    <Table columns={columns} dataSource={props.examList && props.examList} pagination={false} rowKey="examList" />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state.exam.examList.exam)
    return {
        examType: state.exam.examTypes,
        subject: state.exam.subjects,
        examList: state.exam.examList.exam,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getExamType() {
            dispatch({
                type: "exam/getExamType",
            })
        },
        getSubject() {
            dispatch({
                type: "exam/getSubject",
            })
        },
        getExamList(payload) {
            dispatch({
                type: "exam/getExamList",
                payload,
            })
        },
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ExamList)))