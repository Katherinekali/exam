// import Main from '../pages/main/main';
// import Login from "../pages/login/loginPage"
import Page from '../pages/main/checking/page';
import Grade from "../pages/main/classRoom/grade"
import Room from "../pages/main/classRoom/room"
import Student from "../pages/main/classRoom/student"
import AddExam from "../pages/main/exam/addexam/addExam"
import ExamList from "../pages/main/exam/examList/eaxmList"
import AddQuestion from "../pages/main/question/addQuestion"
import QuestionType from "../pages/main/question/questionsType"
import WatchQuestion from "../pages/main//question/checkTheitem"
// import Questions from "../pages/main/question/questions/questions"
import AddUser from "../pages/main/user/addUser"
import ShowUser from "../pages/main/user/showUser"
// import ExamEdit from "../pages/main/exam/addexam/examEdit"
// import ExamDetail from "../pages/main/exam/examList/examDetail"
export default {
    routes: [{
      name: 'router.questions',
      path: '',
      children: [{
        name: 'router.questions.add',
        path: '/main/addquestion',
        view_id: 'main-addQuestions',
        component: AddQuestion
      },{
        name: 'router.questions.type',
        path: '/main/questiontype',
        view_id: 'main-questionsType',
        component: QuestionType
      },{
        name: 'router.questions.view',
        path: '/main/watchquestion',
        view_id: 'main-addQuestions',
        component: WatchQuestion
      }]
    },{
        name: 'router.user',
        path: '',
        children: [{
          name: 'router.user.add',
          path: '/main/adduser',
          view_id: 'main-addUser',
          component: AddUser
        },{
          name: 'router.user.show',
          path: '/main/showuser',
          view_id: 'main-showUser',
          component: ShowUser
        }]
      },{
        name: 'router.exam',
        path: '',
        children: [{
          name: 'router.exam.add',
          path: '/main/addexam',
          view_id: 'main-addExam',
          component: AddExam
        },{
          name: 'router.exam.list',
          path: '/main/examlist',
          view_id: 'main-questionsDetail',
          component: ExamList
        }]
      },{
        name: 'router.classroom',
        path: '',
        children: [{
          name: 'router.classroom.class',
          path: '/main/grade',
          view_id: 'main-grade',
          component:Grade
        },{
          name: 'router.classroom.management',
          path: '/main/room',
          view_id: 'main-student',
          component:Room
        },{
          name: 'router.classroom.student',
          path: '/main/student',
          view_id: 'main-room',
          component: Student
        }]
      },{
        name: 'router.examination',
        path: '',
        children: [{
          name: 'router.classroom.class',
          path: '/main/page',
          view_id: 'main-examPaperClassmate',
          component: Page
        }]
      }]
  }

