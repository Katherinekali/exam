import React,{useState,useEffect} from 'react';
import { connect } from 'dva';
import { Route, Link,Switch,Redirect} from 'dva/router';
import styles from "./main.css"
import { Dropdown, Menu, Icon, Spin, Select,Form, Input,Modal} from 'antd';
import { injectIntl } from 'react-intl';
const { SubMenu } = Menu;
const { Option } = Select;
function IndexPage(props) {
  console.log(props)
  let [user,setUser]=useState("")
  let [image,setImg]=useState("")
  let [flag,setFlag]=useState(false)
  const load=(e)=>{
    let form=new FormData()
    form.append(e.target.files[0].name,e.target.files[0])
    props.load(form)
  }
  //实时改变用户信息
  useEffect(()=>{
    setUser(props.userInfo)
  },[props.userInfo])

  //实时改变用户头像
  useEffect(()=>{
    if(props.mes===1){
      setImg(props.userInfo.avatar)
      props.change()
    }
  },[props.mes])

  //更新用户头像
  useEffect(()=>{
      setImg(props.img)
  },[props.img])

  //弹框隐藏
  let showModal = () => {
    setFlag(true)
  };

  //在确定时发送行为更新用户信息
  let handleOk = e => {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.updata({'user_name':values.username,user_id:user.user_id,avatar:image}) 
      }
    });
    setFlag(false)
  };

  //点击取消弹窗消失
  let handleCancel = e => {
    setFlag(false)
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          {props.intl.formatMessage({ id: 'personage.personal_center' })}
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          {props.intl.formatMessage({ id: 'personage.My_class' })}
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        {props.intl.formatMessage({ id: 'personage.setting' })}
      </Menu.Item>
      <Menu.Item key="4">
        {props.intl.formatMessage({ id: 'personage.log_out' })}
      </Menu.Item>
    </Menu>

  );
  let handleClick = e => {
    // console.log('click ', e);
  };
  let {getFieldDecorator}=props.form
  console.log(props.myView)
  // 在获取我的路由之前啥也不渲染
  if (!props.myView.length){
    return null;
  }
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h1 className={styles.logo}><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg' /></h1>
        <Select defaultValue="中文" style={{ width: 90 }}>
          <Option value="中文" onClick={() => props.changeLocale('zh')}>中文</Option>
          <Option value="英文" onClick={() => props.changeLocale('en')}>English</Option>
        </Select>
        <div className={styles.logout}>
          <Dropdown overlay={menu}>
          <span onClick={showModal}>
                <b>
                <img src={user.avatar} alt="" style={{width:50,height:50,borderRadius:"50%"}}  /></b> 
                {user&&user.user_name}
          </span>
          </Dropdown>
        </div>

        {/**更改用户信息弹框部分 */}

        <Modal
          title="更改用户信息"
          visible={flag}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <div>
          <label for="file" style={{marginLeft:200}}>
            <span onClick={showModal}>
              <b>
              <img src={image?image:props.userInfo.avatar} alt="" style={{width:50,height:50,borderRadius:"50%"}}   /></b> 
            </span>
          </label>
          <input type="file" id="file" name="" style={{display: "none"}} onChange={(e)=>{load(e)}}/>
          </div>
          <Form  className="login-form" layout="inline" style={{textAlign:"right"}}>
              <Form.Item label="用户名" >
                  {getFieldDecorator('username', 
                      { 
                          validateTrigger:"onBlur",
                          initialValue:user&&user.user_name,
                          rules: [ { required: true, message: 'Please input your username!' },],         
                      })(
                      <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                      style={{width:300,display:"inline"}}
                      />,
                  )}
              </Form.Item>
              <Form.Item label="密 码" >
                  {getFieldDecorator('password', 
                      {   
                          validateTrigger:"onBlur",
                          initialValue:"Chenmanjie123!",
                          rules: [
                                  { required: true, message: 'Please input your password!' },
                                  { pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: 'Please input your current password!' }
                                  ],
                      })(
                      <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密码"
                      />,
                  )}
              </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className={styles.layout_content}>
        <div className={styles.slide}>
          <Menu
            onClick={handleClick}
            style={{ width: 200 }}
            defaultSelectedKeys={[]}
            defaultOpenKeys={[]}
            mode="inline"
            theme="dark"
          >
            {/* <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>{props.intl.formatMessage({ id: 'router.questions' })}</span>
                </span>
              }
            >
              <Menu.Item key="1"><Link to="/main/addquestion">{props.intl.formatMessage({ id: 'router.questions.add' })}</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/main/questiontype">{props.intl.formatMessage({ id: 'router.questions.view' })}</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/main/watchquestion">{props.intl.formatMessage({ id: 'router.questions.type' })}</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="user" />
                  <span>{props.intl.formatMessage({ id: 'router.user' })}</span>
                </span>
              }
            >
              <Menu.Item key="4"><Link to="/main/adduser">{props.intl.formatMessage({ id: 'router.user.add' })}</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/main/showuser">{props.intl.formatMessage({ id: 'router.user.show' })}</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="user" />
                  <span>{props.intl.formatMessage({ id: 'router.exam' })}</span>
                </span>
              }
            >
              <Menu.Item key="6"><Link to="/main/addexam">{props.intl.formatMessage({ id: 'router.exam.add' })}</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/main/examlist">{props.intl.formatMessage({ id: 'router.exam.list' })}</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="project" />
                  <span>{props.intl.formatMessage({ id: 'router.classroom' })}</span>
                </span>
              }
            >
              <Menu.Item key="8"><Link to="/main/grade">{props.intl.formatMessage({ id: 'router.classroom.class' })}</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/main/room">{props.intl.formatMessage({ id: 'router.classroom.management' })}</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/main/student">{props.intl.formatMessage({ id: 'router.classroom.student' })}</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="project" />
                  <span>{props.intl.formatMessage({ id: 'router.examination' })}</span>
                </span>
              }
            >
              <Menu.Item key="11"><Link to="/main/page">待批班级</Link></Menu.Item>
            </SubMenu> */}
             {
      props.myView.map(item=>{
        return <SubMenu
          key={item.name}
          title={
            <span>
              <Icon type="mail" />
              <span>{props.intl.formatMessage({id: item.name})}</span>
            </span>
          }
        >{
          item.children.map(value=>{
            return <Menu.Item key={value.name}>
              <Link to={value.path}>{props.intl.formatMessage({id: value.name})}</Link>
            </Menu.Item>
          })
        }</SubMenu>
      })
    }
          </Menu>
        </div>
        <div className={styles.content}>
          <div className={styles.layout_main}>
            <Switch>
                <Redirect from="/main" exact to="/main/addQuestions"/>
                {/* 配置用户拥有的路由 */}
                {
                  props.myView.map(item=>{
                    return item.children.map(value=>{
                      return <Route key={value.name} path={value.path} component={value.component}></Route>
                    })
                  })
                }

                {/* 配置用户禁止访问的路由 */}
                {
                  props.forbiddenView.map(item=>{
                    return <Redirect key={item.path} from={item.path} to="/403"></Redirect>
                  })
                }

                {/* 配置不存在的路由 */}
                <Redirect to="/404"></Redirect>
            </Switch>
            {/* <Route path="/main/page" component={Page} />
            <Route path="/main/grade" component={Grade} />
            <Route path="/main/room" component={Room} />
            <Route path="/main/student" component={Student} />
            <Route path="/main/addexam" component={AddExam} />
            <Route path="/main/examlist" component={ExamList} />
            <Route path="/main/addquestion" component={AddQuestion} />
            <Route path="/main/questiontype" component={QuestionType} />
            <Route path="/main/watchquestion" component={WatchQuestion} />
            <Route path="/main/questions/:id" component={Questions} />
            <Route path="/main/adduser" component={AddUser} />
            <Route path="/main/showuser" component={ShowUser} />
            <Route path="/main/edit" component={ExamEdit} />
            <Route path="/main/detail" component={ExamDetail} /> */}
            </div>
          {props.global ? <div className={styles.loading}><Spin /></div> : null}
        </div>

      </div>
    </div>
  );
}
const mapState = state => {
  console.log(state)
  return {
    ...state.checkTheItem,
    global: state.loading.global,
    userInfo:state.login.userInfo,
    mes:state.login.mes,
    img:state.login.img,
    myView:state.login.myView,
    forbiddenView:state.login.forbiddenView,
  };
};
const mapDispatch = dispatch => {
  return {
    changeLocale: payload => {
      dispatch({
        type: "global/updateLocale",
        payload
      })
    },
    load:payload=>{
      dispatch({
        type:"login/load",
        payload
      })
    },
    change:payload=>{
      dispatch({
        type:"login/change",
        
      })
    },
    listen:payload=>{
      dispatch({
        type:"getUserInfo"
      })
    },
    updata:payload=>{
      dispatch({
        type:"login/updateUser",
        payload
      })
    },
  }
}
export default injectIntl(connect(mapState, mapDispatch)(Form.create()(IndexPage)));
