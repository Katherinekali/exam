import React from 'react'
import { Table, Radio } from 'antd';
import { connect } from "dva";
const { Column } = Table;
function showUser(props) {
    let onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
    }
    const paginationProps = {
        pageSize: 5
    }
    return (
        <div className="showUser_wrapper">
            <h2>用户展示</h2>
            <div className="showUser_content">
                <div>
                    <Radio.Group onChange={onChange} defaultValue="a">
                        <Radio.Button value="a">Hangzhou</Radio.Button>
                        <Radio.Button value="b">Shanghai</Radio.Button>
                        <Radio.Button value="c">Beijing</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                    </Radio.Group>
                    <h1>用户数据</h1>
                    <div className="questions_table">
                        <Table rowKey="questions_type_id" dataSource={props.questionsType} pagination={paginationProps}>
                            <Column title="用户名" dataIndex="questions_type_id" />
                            <Column title="密码" dataIndex="questions_type_text" />
                            <Column title="身份" dataIndex="" />
                        </Table>
                    </div>
                </div>
            </div>

        </div>
    )
}
let mapStateToProps = state => {
    return {
        ...state.addUser
    }
}
let mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(showUser)
