import React, { useEffect} from 'react';
import "antd/dist/antd.css";
import { Tabs, Table } from 'antd';
import { connect } from "dva";
import { injectIntl } from 'react-intl';
const { TabPane } = Tabs;
function showUser(props) {
    useEffect(() => {
        props.getUsers();
        props.getUserIdentit();
        props.getUserIdentityApiAuthorityRelation();
        props.getUserApiAuthority();
        props.getUserViewAuthority();
        props.getUserIdentityViewAuthorityRelation()

    }, [])
    let { user, userIdentit, userIdentityApiAuthorityRelation, userApiAuthority, userViewAuthority, userIdentityViewAuthorityRelation } = props;
    user.forEach(item => {
        item.key = item.user_id;
    });
    userIdentit.forEach(item => {
        item.key = item.identity_id;
    });
    userIdentityApiAuthorityRelation.forEach(item => {
        item.key = item.api_authority_id;
    });
    userApiAuthority.forEach(item => {
        item.key = item.identity_api_authority_relation_id;
    });
    userViewAuthority.forEach(item => {
        item.key = item.view_authority_id;
    });
    userIdentityViewAuthorityRelation.forEach(item => {
        item.key = item.identity_view_authority_relation_id;
    });
    //用户数据
    const columns = [
        {
            title: '用户名',
            dataIndex: 'user_name'
        },
        {
            title: '密码',
            dataIndex: 'user_pwd',
        },
        {
            title: '身份',
            dataIndex: 'identity_text',
        }]
    //展示身份数据
    const columnsIdentity = [
        {
            title: '身份名称',
            dataIndex: 'identity_text'
        }];
    //展示身份和api权限关系
    const columnsApiAuthority = [
        {
            title: 'api权限名称',
            dataIndex: 'api_authority_text'
        },
        {
            title: 'api权限url',
            dataIndex: 'api_authority_url',
        },
        {
            title: 'api权限方法',
            dataIndex: 'api_authority_method',
        }];
    // 展示api接口权限数据
    const columnsRelation = [
        {
            title: '身份名称',
            dataIndex: 'identity_text'
        },
        {
            title: 'api权限名称',
            dataIndex: 'api_authority_text',
        },
        {
            title: 'api权限url',
            dataIndex: 'api_authority_url',
        },
        {
            title: 'api权限方法',
            dataIndex: 'api_authority_method',
        }];
    //获取视图接口权限数据
    const columnsViewauthority = [
        {
            title: '试图权限名称',
            dataIndex: 'view_authority_text'
        },
        {
            title: '试图id',
            dataIndex: 'view_id',
        }];
    //展示身份和视图权限关系
    const columsIdentityview = [
        {
            title: '身份',
            dataIndex: 'identity_text'
        },
        {
            title: '试图名称',
            dataIndex: 'view_authority_text',
        },
        {
            title: '试图id',
            dataIndex: 'view_id',
        }];
    return (
        //identity_text
        < div className="showUser_wrapper" >
            <h2> {props.intl.formatMessage({ id: 'user.showUser' })}</h2>
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="用户数据" key="1">
                        <h2>用户数据</h2>
                        <Table columns={columns} dataSource={user} />
                    </TabPane>
                    <TabPane tab="身份数据" key="2">
                        <h2>身份数据</h2>
                        <Table columns={columnsIdentity} dataSource={userIdentit} />
                    </TabPane>
                    <TabPane tab="api接口权限" key="3">
                        <h2>api接口权限</h2>
                        <Table columns={columnsApiAuthority} dataSource={userApiAuthority} />
                    </TabPane>
                    <TabPane tab="身份和api接口关系" key="4">
                        <h2>身份和api接口关系</h2>
                        <Table columns={columnsRelation} dataSource={userIdentityApiAuthorityRelation} />
                    </TabPane>
                    <TabPane tab="试图接口权限" key="5">
                        <h2>试图接口权限</h2>
                        <Table columns={columnsViewauthority} dataSource={userViewAuthority} />
                    </TabPane>
                    <TabPane tab="身份和视图权限关系" key="6">
                        <h2>身份和视图权限关系</h2>
                        <Table columns={columsIdentityview} dataSource={userIdentityViewAuthorityRelation} />
                    </TabPane>
                </Tabs>
            </div>
        </div >
    )
}
let mapStateToProps = state => {
    return {
        ...state.showUser
    }
}
let mapDispatchToProps = dispatch => {
    return {
        //用户数据
        getUsers: () => {
            dispatch({
                type: "showUser/user",
            })
        },
        //展示身份数据
        getUserIdentit: () => {
            dispatch({
                type: "showUser/userIdentit",
            })
        },
        //展示身份和api权限关系
        getUserIdentityApiAuthorityRelation: () => {
            dispatch({
                type: "showUser/userIdentityApiAuthorityRelation",
            })
        },
        // 展示api接口权限数据
        getUserApiAuthority: () => {
            dispatch({
                type: "showUser/userApiAuthority",
            })
        },
        //获取视图接口权限数据
        getUserViewAuthority: () => {
            dispatch({
                type: "showUser/userViewAuthority",
            })
        },
        //展示身份和视图权限关系
        getUserIdentityViewAuthorityRelation: () => {
            dispatch({
                type: "showUser/userIdentityViewAuthorityRelation",
            })
        }

    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(showUser))
