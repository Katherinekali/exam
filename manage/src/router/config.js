import Page from '../pages/main/checking/page';
import Grade from "../pages/main/classRoom/grade"
import Room from "../pages/main/classRoom/room"
import Student from "../pages/main/classRoom/student"
import AddExam from "../pages/main/exam/addexam/addExam"
import ExamList from "../pages/main/exam/examList/eaxmList"
import AddQuestion from "../pages/main/question/addQuestions/addQuestion"
import QuestionType from "../pages/main/question/questionsType/questionsType"
import WatchQuestion from "../pages/main//question/CheckTheitem/checkTheitem"
import Questions from "../pages/main/question/questions/questions"
import AddUser from "../pages/main/user/addUser"
import ShowUser from "../pages/main/user/showUser"
import ExamEdit from "../pages/main/exam/addexam/examEdit"
import ExamDetail from "../pages/main/exam/examList/examDetail"
import TestPaper from "../pages/main/checking/page/testPaper";
import Detail from "../pages/main/checking/page/detail"
import ClassList from "../pages/main/checking/page/classList";
import Excel from "../pages/main/user/excel/index"
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
      },{
        name: "",
        path: '/main/questions',
        view_id: 'main-questionsDetail',
        component: Questions
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
        },{
          name: '',
          path: '/main/excel',
          view_id: 'main',
          component: Excel
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
        },
        {
          name: '',
          path: '/main/edit',
          view_id: 'main-examEdit',
          component: ExamEdit
        },
        {
          name: '',
          path: '/main/detail/:id',
          view_id: 'main-examDetail',
          component: ExamDetail
        }
      ]
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
          component: ClassList
        },
        {
          name: '',
          path: '/main/testPaper',
          view_id: 'main-examPaperClassList',
          component: TestPaper
        },{
          name: '',
          path: '/main/paperDetail/:id',
          view_id: 'main-examPaperClassmate',
          component: Detail
        }
       ]
      }]
  }

