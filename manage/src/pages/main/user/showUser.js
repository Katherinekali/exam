import React from 'react'
import { Table, Radio } from 'antd';
import { connect } from "dva";
const { Column } = Table;
function showUser(props) {
    let  onChange=(e)=> {
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
                        <h1>api接口权限</h1>
                        <div className="questions_table">
                            <Table rowKey="questions_type_id" dataSource={props.questionsType} pagination={paginationProps}>
                                    <Column title="类型ID" dataIndex="questions_type_id" />
                                    <Column title="类型名称" dataIndex="questions_type_text" />
                                    <Column title="操作" dataIndex="" />
                                </Table>
                        </div>
                    </div>
                </div>
               
            </div>
        )

}
export default connect()(showUser)
