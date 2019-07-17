import React, { useState, useEffect } from 'react'
import styles from "./question.scss"
import Editor from 'for-editor';
import { injectIntl } from 'react-intl';
import { Select, Button, Modal, Form, Input, notification, Icon, Spin } from 'antd';
import { connect } from "dva"
const { Option } = Select;

function AddQuestion(props) {
    let [visible, setvisible] = useState(false)
    let [search, setSearch] = useState(false)
    let [edit, setEdit] = useState("提交")
    let [detail, setDetail] = useState({})
    useEffect(() => {
        props.getExamType()
        props.getSubject()
        props.getQuestionType()
        if (props.location) {
            let { search } = props.location;
            search = search.split("=")[1]
            // 获取数据详情
            props.getDetail({ questions_id: search })
            setSearch(search)
            setDetail(props.detailData)
        }
    }, [])
    useEffect(() => {
        if (props.location) {
            let { search } = props.location;
            search = search.split("=")[1]
            setDetail(props.detail[0])
        }
    }, [props.detail])
    let showModal = (val) => {
        setvisible(true)
        setEdit(val)
    };
    let handleCancel = () => {
        setvisible(false)
    };
    function success() {
        Modal.success({
            title: '添加成功',
            content: '恭喜你添加成功',
            okText: "我知道了"
        });
    }
    let handleSubmit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                let user_id = JSON.parse(localStorage.getItem("userInfor")).data.user_id
                let obj = {
                    questions_type_id: values.questionType,
                    questions_stem: values.questions_stem,
                    subject_id: values.subject,
                    exam_id: values.examType,
                    user_id: user_id,
                    questions_answer: values.answer,
                    title: values.title
                }
                // setInfor(obj)
                props.addQuestion(obj, edit, search)


            }
        });
    }
    let handleOk = () => {
        handleSubmit()
        setvisible(false)
    };
    const openNotification = (infor) => {
        notification.open({
            message: '请求错误402',
            description: infor,
            icon: <Icon type="close-circle" style={{ color: '#f90' }} />,
        });
    };
    useEffect(() => {
        if (props.addState === 1) {
            success()
        } else if (props.addState === -1) {
            return
        } else {
            openNotification(props.addState.message)
        }
        props.reset()
    }, [props.addState])
    let { getFieldDecorator } = props.form
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h2> {search ? props.intl.formatMessage({ id: 'questions.update_questions' }) : props.intl.formatMessage({ id: 'questions.add_questions' })}</h2>
                <div className={styles.question_content}>
                    <Form.Item>
                        <h3>{props.intl.formatMessage({ id: 'questions.Dry_system' })}</h3>
                        <div>
                            <div><label title="题干">{props.intl.formatMessage({ id: 'questions.question stem' })}</label></div>
                            <div>
                                {getFieldDecorator('title', { initialValue: search ? detail && detail.title : "" })(
                                    <Input
                                        className={styles.ipt}
                                        placeholder="请输入题目标题,不超过20个字"
                                    />,
                                )}
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div>
                            <div><label title="题干">{props.intl.formatMessage({ id: 'questions.title theme' })}</label></div>
                            {getFieldDecorator('questions_stem', { initialValue: search ? detail && detail.questions_stem : "" })(
                                <Editor></Editor>
                            )}

                        </div>
                    </Form.Item>
                    <div>
                        <div>
                            <Form.Item>
                                <div><label title="请选择考试类型"> 请选择考试类型：</label></div>
                                <div>
                                    {getFieldDecorator('examType', { initialValue: search ? detail && detail.exam_name : (props.examType[0] && props.examType[0].exam_name) })(
                                        <Select
                                            style={{ width: 200 }}
                                        >
                                            {
                                                props.examType.length && props.examType.map(item => {
                                                    return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </div>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item>
                                <div><label title="请选择课程类型"> 请选择课程类型：</label></div>
                                <div>
                                    {getFieldDecorator('subject', { initialValue: search ? detail && detail.subject_text : (props.subject[0] && props.subject[0].subject_text) })(
                                        <Select
                                            style={{ width: 200 }}
                                        >
                                            {
                                                props.subject.length && props.subject.map(item => {
                                                    return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </div>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item>
                                <div><label title="请选择题目类型"> 请选择题目类型：</label></div>
                                <div>
                                    {getFieldDecorator('questionType', { initialValue: search ? detail && detail.questions_type_text : (props.questionType[0] && props.questionType[0].questions_type_text) })(
                                        <Select
                                            style={{ width: 200 }}
                                        >
                                            {
                                                props.questionType.length && props.questionType.map(item => {
                                                    return <Option value={item.questions_type_id} key={item.questions_type_id}>{item.questions_type_text}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                    <h3>答案信息</h3>
                    <div>
                        {getFieldDecorator('answer', { initialValue: search ? detail && detail.questions_answer : "" })(
                            <Editor></Editor>
                        )}
                    </div>
                    <div>
                        <Form.Item>
                            <Button type="primary" className={styles.btn} onClick={() => { showModal(search ? "修改" : "提交") }}>
                                {search ? "修改" : "提交"}
                            </Button>
                        </Form.Item>
                    </div>
                    <div>
                        <Modal
                            visible={visible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            cancelText="取消"
                            okText="确认"
                        >
                            <p>你确定要添加这道试题吗？</p>
                            <p>真的要添加吗？</p>
                        </Modal>
                    </div>
                </div>
            </Form>
            {props.global ? <div className={styles.loading}><Spin /></div> : null}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        examType: state.question.examType,
        subject: state.question.subject,
        questionType: state.question.questionType,
        addState: state.question.addState,
        addTime: state.question.addTime,
        detail: state.question.detail,
        // addTime: state.question.addTime,
        ...state.checkTheItem,
        ...state.global
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getExamType() {
            dispatch({
                type: "question/examType",
                payload: ""
            })
        },
        getSubject() {
            dispatch({
                type: "question/subject",
                payload: ""
            })
        },
        getQuestionType() {
            dispatch({
                type: "question/questionType",
                payload: ""
            })
        },
        addQuestion(payload, edit, search) {
            dispatch({
                type: "question/addQuestion",
                payload: payload,
                edit: edit,
                id: search
            })
        },
        getDetail(payload) {
            dispatch({
                type: "question/detail",
                payload: payload
            })
        },
        detailInfo: payload => {
            dispatch({
                type: "checkTheItem/detail",
                payload
            })
        },
        reset() {
            dispatch({
                type: "question/reset"
            })
        }
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddQuestion)))