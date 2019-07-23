/**
 * 试题分类页面
 * 主要功能：1.渲染试题类型 2.添加数据类型
 */
import React, { useState, useEffect } from "react"
import { Modal, Button, Table, Input, message, Form } from 'antd';
import { injectIntl } from 'react-intl';
import { connect } from "dva";
import styles from  "./questionsType.css";
const { Column } = Table;

function QuestionsType(props) {
    const [flag, setFlag] = useState(false);
    const { getFieldDecorator } = props.form;
    const addFn = () => {
        setFlag(true)
    }
    const hideModal = () => {
        setFlag(false)
    }
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                setFlag(false)
                props.addType({ text: values.info, sort: (props.questionsType.length + 1).toString() })
            } else {
                message.error("error")
            }
        });
    };
    const paginationProps = {
        pageSize: 10,

    }
    useEffect(() => {
        props.getType()
        if (props.message === 1) {
            message.success("添加成功")
            props.addType()
        } else if (props.message === -1) {
            return
        }
    }, [props.message])
    return (
        <div>
            <h2>{props.intl.formatMessage({ id: 'questions.classification' })}</h2>
            <div style={{ background: "#fff" }} className={styles.question_content}>
                <Button type="primary" icon="plus" onClick={() => { addFn() }} style={{ margin:5,width:158,height:40,background:"blue" }}>
                    添加类型
                </Button>
                <div className={styles.questions_table}>
                    {
                        props.questionsType && <Table rowKey="questions_type_id" dataSource={props.questionsType} pagination={false}>
                            <Column title="类型ID" dataIndex="questions_type_id" />
                            <Column title="类型名称" dataIndex="questions_type_text" />
                            <Column title="操作" dataIndex="" />
                        </Table>
                    }
                </div>
            </div>
            <Modal
                title="创建新类型"
                visible={flag}
                onOk={() => { handleSubmit() }}//点击确认除了要关闭弹框还要发送请求，把内容添加到后台
                onCancel={() => { hideModal() }}
                okText="确认"
                cancelText="取消"
            >
                <Form className={styles.login_form}>
                    <Form.Item>
                        {getFieldDecorator('info', {
                            rules: [{ required: true, message: 'Please input your questionsType!' }],
                        })(
                            <Input placeholder="questionsType" className={styles.ant_input}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

}
let mapStateToProps = state => {
    return {
        ...state.test
    }
}
let mapDispatchToProps = dispatch => {
    return {
        getType: () => {
            dispatch({
                type: "test/getType",
            })
        },
        addType: (payload) => {
            dispatch({
                type: "test/addType",
                payload
            })
        }
    }

}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(QuestionsType)))
