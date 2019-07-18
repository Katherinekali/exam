import React, { useState, useEffect } from 'react'
import { connect } from "dva";
import "antd/dist/antd.css";
import { Form, Button, Table, Divider, Modal, Input } from "antd";
function grade(props) {
	let [flag, setFlag] = useState(false)
	const addFn = () => {
		setFlag(true)
	}
	const addModal = () => {
		setFlag(false)
	}
	const hideModal = () => {
		setFlag(false)
	}
	useEffect(() => {
		props.getassignedgrade();
		props.getaundistributedgrade();
	}, [])
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
					<span>修改</span>
					<Divider type="vertical" />
					<span>删除</span>
					<Divider type="vertical" />
				</span>
			),
		}]
	const { getFieldDecorator } = props.form;
	return (
		<div>
			<h2>班级管理</h2>
			<div>
				<Button type="primary" icon="plus" onClick={() => { addFn() }} style={{ margin: 20 }}>
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
				okText="Create"
				onCancel={() => hideModal()}
				onOk={() => addModal()}
			>
				<Form layout="vertical">
					<Form.Item label="Title">
						{/* {getFieldDecorator('title', {
							rules: [{ required: true, message: 'Please input the title of collection!' }],
						})(<Input />)} */}
						<Input />
					</Form.Item>
					<Form.Item label="Description">
						{getFieldDecorator('description')(
							<Input type="textarea" />
						)}
					</Form.Item>

				</Form>
			</Modal>
		</div >
	)
}
const mapStateToProps = state => {
	return {
		...state.grade
	}
};
const mapDispatchToProps = dispatch => {
	return {
		//添加班级
		// getaddgrade: (payload) => {
		// 	dispatch({
		// 		type: "grade/addgrade",
		// 		paload
		// 	})
		// },
		//已分配教室的班级
		getassignedgrade: () => {
			console.log(222)
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
		//删除班级
		// getremovegrade: (paload) => {
		// 	dispatch({
		// 		type: "grade/removegrade",
		// 		paload
		// 	})
		// },
		//更新班级
		// getupdategrade: (paload) => {
		// 	dispatch({
		// 		type: "grade/updategradee",
		// 		paload
		// 	})
		// }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(grade))
