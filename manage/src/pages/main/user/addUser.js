import React, { useEffect } from 'react'
import { connect } from "dva";
import AddUser from "../../../components/addUser"
import AddIdentity from "../../../components/addIdentity"
import Addapiport from "../../../components/addApiport"
import AddViewport from "../../../components/addViewport"
import AddIdentityView from "../../../components/addIdentityView"
import AddIdentityPort from "../../../components/addIdentityPort"
import styles from "./addUser.scss"
import { injectIntl } from 'react-intl';
function addUser(props) {
    useEffect(() => {
        props.getUserID()
        props.getApiPort()
        props.getView()
        props.AllUser()
    }, [])
    return (
        <div>
            <h2> {props.intl.formatMessage({ id: 'user.addUser' })}</h2>
            <div className={styles.addUser_wrapper}>
                {console.log(props)}
                <AddUser></AddUser>
                <AddIdentity></AddIdentity>
                <Addapiport></Addapiport>
                <AddViewport></AddViewport>
                <AddIdentityView></AddIdentityView>
                <AddIdentityPort></AddIdentityPort>
            </div>
        </div>
    )
}
let mapStateToProps = state => {
    return {
        ...state.userInfo
    }
}
let mapDispatchToProps = dispatch => {
    return {
        getUserID() {
            dispatch({
                type: "userInfo/getUserId"
            })
        },
        getApiPort() {
            dispatch({
                type: "userInfo/getApiPort"
            })
        },
        getView() {
            dispatch({
                type: "userInfo/getView"
            })
        },
        AllUser() {
            dispatch({
                type: "userInfo/getAllUser"
            })
        }
    }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(addUser))