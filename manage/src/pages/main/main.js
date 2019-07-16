import React from 'react';
import { connect } from 'dva';
import { Route, Link } from 'dva/router';
import styles from "./main.css"
import { Dropdown, Menu, Icon, Spin } from 'antd';
import ClassList from "./checking/classList"
import Grade from "./classRoom/grade"
import Room from "./classRoom/room"
import Student from "./classRoom/student"
import AddExam from "./exam/addexam/addExam"
import ExamList from "./exam/examList/eaxmList"
import AddQuestion from "./question/addQuestion"
import QuestionType from "./question/questionsType"
import WatchQuestion from "./question/checkTheitem"
import Questions from "./question/questions/questions";
import AddUser from "./user/addUser"
import ShowUser from "./user/showUser"
import ExamEdit from "./exam/addexam/examEdit"
import ExamDetail from "./exam/examList/examDetail"
const { SubMenu } = Menu;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        个人中心
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        我的班级
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      设置
    </Menu.Item>
    <Menu.Item key="4">
      退出登录
    </Menu.Item>
  </Menu>

);

function IndexPage(props) {
  let handleClick = e => {
    // console.log('click ', e);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <h1 className={styles.logo}><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg' /></h1>
        <div className={styles.logout}>
          <Dropdown overlay={menu}>
            <span>
              <a href="#"><img src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png" /></a>
              chenmanjie
              </span>
          </Dropdown>
        </div>
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
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>试题管理</span>
                </span>
              }
            >
              <Menu.Item key="1"><Link to="/main/addquestion">添加试题</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/main/questiontype">试题分类</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/main/watchquestion">查看试题</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="user" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="4"><Link to="/main/adduser">添加用户</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/main/showuser">用户展示</Link></Menu.Item>
            </SubMenu>  
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="user" />
                  <span>考试管理</span>
                </span>
              }
            >
              <Menu.Item key="6"><Link to="/main/addexam">添加考试</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/main/examlist">考试列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="project" />
                  <span>班级管理</span>
                </span>
              }
            >
              <Menu.Item key="8"><Link to="/main/grade">班级管理</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/main/room">教室管理</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/main/student">学生管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="project" />
                  <span>阅卷管理</span>
                </span>
              }
            >
              <Menu.Item key="11"><Link to="/main/classlist">待批班级</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className={styles.content}>
          <div className={styles.layout_main}>
            <Route path="/main/classlist" component={ClassList} />
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
            <Route path="/main/exam/edit" component={ExamEdit} />
            <Route path="/main/exam/detail" component={ExamDetail} />
          </div>
          {props.global ? <div className={styles.loading}><Spin /></div> : null}
        </div>

      </div>
    </div>
  );
}
const mapState = state => {
  return {
    ...state.checkTheItem,
    global: state.loading.global
  };
};

export default connect(mapState)(IndexPage);
