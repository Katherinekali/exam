import React, { useState, useEffect } from 'react'
import { connect } from "dva";
import "antd/dist/antd.css";
import { injectIntl } from 'react-intl';
import { Form, Button, Table, Divider, Modal, Input, Select, message, Popconfirm } from "antd";
const { Option } = Select;
function grade(props) {
	let [flag, setFlag] = useState(false);
	let [data, setData] = useState({});
	let [type, settype] = useState("");
	let [f, setf] = useState(false)
	useEffect(() => {
		props.getassignedgrade();	//已分配教室的班级
		props.getaundistributedgrade();//未分配教室的班级
		props.getRoom();//全部教室
		props.getAllLessons();	//所有课程	
	}, [])
	const addFn = (add) => {
		setFlag(true)
		settype(add)
		setf(true);
		// setData({})
	}
	//删除
	const handleDelete = (id) => {
		props.getremovegrade({ grade_id: id })
	}
	//修改
	const handleUpdate = (res, reset) => {
		console.log(res)
		setData(res)
		settype(reset)
		addFn();
		setf(false)
	}
	const addModal = () => {
		props.form.validateFields((err, values) => {
			console.log(values.grade_id);
			console.log(data.grade_id)
			if (!err) {
				if (type === "add") {
					props.getaddgrade(values && values)
				}
				else {
					props.getupdategrade({
						room_id: values.room_id,
						grade_id: data.grade_id,
						subject_id: values.subject_id,
						grade_name: data.grade_name,
					})
				}
				setFlag(false)
			} else {
				message.error("error")
			}
		});
	}
	useEffect(() => {
		//添加状态
		if (props.addgrade.code === 1) {
			props.getassignedgrade();
		} else if (props.message === -1) {
			return
		}
		//删除状态
		if (props.deletegrade.code === 1) {
			props.getassignedgrade();
		} else if (props.deletegrade.code === -1) {
			message.success("删除失败")
		}
		//修改状态
		if (props.renewalgrade.code === 1) {
			props.getassignedgrade();
		} else if (props.renewalgrade.code === -1) {
			return
		}
	}, [props.addgrade, props.deletegrade, props.renewalgrade])
	const hideModal = () => {
		setFlag(false)
	}
	const columns = [
		{
			title: '班级名',
			dataIndex: 'grade_name'
		},
		{
			title: '课程名',
			dataIndex: 'subject_text',
		},
		{
			title: '教室号',
			dataIndex: 'room_text',
		}, {
			title: "操作",
			dataIndex: "",
			render: (text, record) => (
				<span>
					<a href="javascript:;" style={{ color: "#0139FD" }} onClick={() => handleUpdate(record, "reset")}>修改</a>
					<Divider type="vertical" />
					<a href="javascript:;" style={{ color: "#0139FD" }} onClick={() => handleDelete(record.grade_id)}>删除</a>
				</span>
			)
		}]
	const { getFieldDecorator } = props.form;
	return (
		<div>
			<h2>{props.intl.formatMessage({id: 'classroom.grade'})}</h2>
			<div style={{ background: "rgb(255, 255, 255)", borderRadius: 8 }}>
				<Button type="primary" icon="plus" onClick={() => { addFn("add") }} style={{ margin: 20, width: 158, height: 40 }}>
					添加班级
          </Button>
				<div className="questions_table">
					<Table columns={columns} dataSource={props.getgrade} size="middle">
					</Table>
				</div>
			</div>
			<Modal
				visible={flag}
				title="添加班级"
				okText="确认"
				cancelText="取消"
				onCancel={() => hideModal()}
				onOk={() => addModal()}
			>
				<Form layout="vertical">
					<Form.Item label="班级名：">
						{getFieldDecorator('grade_name', {
							initialValue: (data.grade_name) ? (data.grade_name) : '班级名',

							rules: [{ required: true, message: 'Please input the title of collection!' }],
						})(<Input disabled={!f} />)}
					</Form.Item>
					<Form.Item label="教室号：">
						{getFieldDecorator("room_id", {
							initialValue: (data.room_text) ? (data.room_text) : "请选择教室号"
						})(<Select style={{ width: 472, margin: "0px 3px" }}>
							{props.getrooms && props.getrooms.map((v, k) => {
								return <Option value={v.room_id} key={v.room_id}>{v.room_text}</Option>
							})}
						</Select>)}
					</Form.Item>
					<Form.Item label="课程号：">
						{getFieldDecorator('subject_id', {
							initialValue: (data.subject_text) ? (data.subject_text) : '课程号',
							rules: [{ required: true, message: 'Please input the title of collection!' }],
						})(<Select style={{ width: 472, margin: "0px 3px" }}>
							{props.allthelessons && props.allthelessons.map((v, k) => {
								return <Option value={v.subject_id} key={v.subject_id}>{v.subject_text}</Option>
							})}
						</Select>)}
					</Form.Item>
				</Form>
			</Modal>
		</div >
	)
}
const mapStateToProps = state => {
	return {
		...state.grade,
		...state.checkTheItem
	}
};
const mapDispatchToProps = dispatch => {
	return {
		//添加班级
		getaddgrade: (payload) => {
			dispatch({
				type: "grade/addgrade",
				payload
			})
		},
		//所有课程
		getAllLessons: payload => {
			dispatch({
				type: "checkTheItem/Lessons",
				payload
			})
		},
		//已分配教室的班级
		getassignedgrade: () => {
			dispatch({
				type: "grade/assignedroom",
			})
		},
		//未分配教室的班级
		getaundistributedgrade: () => {
			dispatch({
				type: "grade/undistributedgrades",
			})
		},
		//全部教室
		getRoom: () => {
			dispatch({
				type: "grade/room",
			})
		},
		//删除班级
		getremovegrade: (payload) => {
			dispatch({
				type: "grade/removegrades",
				payload
			})
		},
		//更新班级
		getupdategrade: (payload) => {
			// console.log(payload, 'paylod')
			dispatch({
				type: "grade/updategrades",
				payload
			})
		}
	}
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(grade)))
