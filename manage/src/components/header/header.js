import React,{useEffect,useState} from 'react';
import { connect } from 'dva';
import {injectIntl} from 'react-intl';
import styles from "./header.scss"
import { Dropdown, Menu,Modal,Form,Input, Select} from 'antd';
const { Option } = Select;

function Header(props) {
  const {getFieldDecorator} =props.form;
  //划过时出现的下拉框
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          <div>个人中心</div>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          <div>我的班级</div>
        </a>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3">
          <div onClick={()=>{showModal()}}>设置</div>
      </Menu.Item>
      <Menu.Item key="4">
          <div>退出登录</div>
      </Menu.Item>
    </Menu>
  );
  //重新设置个人信息：
  let [visible,setVisible]=useState(false)
  let [img,setImg]=useState("")
  let  showModal = () => {
      setVisible(true)
  };
  //更新信息
  let handleSubmit = () => {
   props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.avatar=img
        values.user_id=props.userInfo.data.user_id
        // console.log(values)
        let obj={
          user_id:props.userInfo.data.user_id,
          avatar:img,
        }
        props.upDateUser(obj)
      }
    });
  };
  //弹框：
  let handleOk =()=> {
     setVisible(false)
     handleSubmit()
    
  };
  let  handleCancel =() => {
    setVisible(false)
  };
  //传头像：
  let changeAvatar=(e)=>{
    let form = new FormData();
    form.append(e.target.files[0].name,e.target.files[0])
      props.upDateAvatar(form)
  }
  //信息更新后的操作
  useEffect(()=>{
    props.reset()
    props.getUserInfor()
  },[props.returnInfo])
  //用户头像更新完成后---返回的路径
  useEffect(()=>{
    setImg(props.avatar.path)
  },[props.avatar])
  //国际化：
 let localChange=(value)=> {
    props.changeLocale(props.intl.locale=='en'?'zh':'en')
  }
  return (
    <div className={styles.header}>
        <h1 className={styles.logo}><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg' /></h1>
        <div className={styles.action}>
           <div className={styles.localeProvider}>
              <Select defaultValue="中文"  onChange={()=>{localChange()}} style={{width:120}}>
                <Option value="中文">中文</Option>
                <Option value="英语">English</Option>
              </Select>
           </div>
           <div className={styles.settings}>
            <Dropdown overlay={menu}>
                  <span>
                      <b className={styles.avatar}>
                        <img src={props.userInfo.data&&props.userInfo.data.avatar} />
                      </b>
                      {props.userInfo.data&&props.userInfo.data.user_name}
                  </span>
              </Dropdown>
           </div>
           <div>
              <Modal
                title="设置个人信息"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form>
                    <Form.Item label="用户名">
                      {getFieldDecorator('user_name')(<Input />)}
                    </Form.Item>
                    <Form.Item label="我的头像">
                      <input type="file" className={styles.ipt} onChange={changeAvatar}/>
                      <span className={styles.chooseImg}>
                        <img src={img}/>
                      </span>
                    </Form.Item>
                  </Form>
              </Modal>
           </div>
        </div>
  </div>
  );
}
const mapStateToProps = state => {
  return {
   ...state.login,
   ...state.user
  };
};
const mapDispatchToProps=(dispatch)=>{
  return {
    upDateAvatar(payload){   //传递头像--得到头像的网上路径
      dispatch({
        type:"user/upDateAvatar",
        payload,
      })
    },
    upDateUser(payload){     // 更新用户信息
      dispatch({
        type:"user/upDateUserInfo",
        payload,
      })
    },
    reset(){               //用户信息更新完成后--清除已经获取到的userInfo
      dispatch({
        type:"login/reset"
      })
    },
    getUserInfor(){        //重新获取更新后的用户信息
      dispatch({
        type:"login/getUserInfo",
      })
    },
    changeLocale: payload=>{
      dispatch({
        type: 'global/updateLocale',
        payload
      })
    }
  }
}
export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(Form.create()(Header)));
