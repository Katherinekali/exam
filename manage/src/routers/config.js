import AddQuestion from "../pages/main/question/addQuestion"
import QuestionType from "../pages/main/question/questionsType"
import Questions from "../pages/main/question/questions/questions"
import WatchQuestion from "../pages/main/question/checkTheitem"

import AddUser from "../pages/main/user/addUser"
import ShowUser from "../pages/main/user/showUser"

import AddExam from "../pages/main/exam/addexam/addExam"
import ExamList from "../pages/main/exam/examList/eaxmList"
import ExamEdit from "../pages/main/exam/addexam/examEdit"
import ExamDetail from "../pages/main/exam/examList/examDetail"

import Grade from "../pages/main/classRoom/grade"
import Room from "../pages/main/classRoom/room"
import Student from "../pages/main/classRoom/student"
import Page from '../pages/main/checking/page';
import Excel from "../pages/main/checking/excel"
import TestPaper from "../pages/main/checking/page/testPaper";
import Detail from "../pages/main/checking/page/detail"
//配置；路由表：
export default {
    routes:[
        {
           name:"router.questions",
           icon:"mail",
           path:"",
           children:[
               {
                   name:"router.questions.add",
                   path:"/main/addquestion",
                   component:AddQuestion,
                   view_id:"main-addQuestions"
               },
               {
                    name:"router.questions.view",
                    path:"/main/questiontype",
                    component:QuestionType,
                    view_id:"main-questionsType"
                },
                {
                    name:"router.questions.type",
                    path:"/main/watchquestion",
                    component:WatchQuestion,
                    view_id:"main-watchQuestions"
                },
                {
                    name:"",
                    path:"/main/questions/:id",
                    component:Questions,
                    view_id:"main-questionsDetail"
                }
           ]
        },
        {
            name:"router.user",
            icon:"user",
            path:"",
            children:[
                {
                    name:"router.user.add",
                    path:"/main/adduser",
                    component:AddUser,
                    view_id:"main-addUser"
                },
                {
                    name:"router.user.show",
                    path:"/main/showuser",
                    component:ShowUser,
                    view_id:"main-showUser"
                }
            ]
         },
         {
            name:"router.exam",
            icon:"project",
            path:"",
            children:[
                {
                    name:"router.exam.add",
                    path:"/main/addexam",
                    component:AddExam,
                    view_id:"main-addExam"
                },
                {
                    name:"router.exam.list",
                    path:"/main/examlist",
                    component:ExamList,
                    view_id:"main-examList"
                },{
                    name:"",
                    path:"/main/examEdit",
                    component:ExamEdit,
                    view_id:"main-examEdit"
                },
                {
                    name:"",
                    path:"/main/examDetail",
                    component:ExamDetail,
                    view_id:"main-examDetail"
                },
            ]
         },
         {
            name:"router.class",
            icon:"mail",
            path:"",
            children:[
                {
                    name:"router.class.grade",
                    path:"/main/grade",
                    component:Grade,
                    view_id:"main-grade"
                },
                {
                    name:"router.class.room",
                    path:"/main/room",
                    component:Room,
                    view_id:"main-room"
                },
                {
                    name:"router.class.student",
                    path:"/main/student",
                    component:Student,
                    view_id:"main-student"
                }
            ]
         },{
            name:"router.marking",
            icon:"mail",
            path:"",
            children:[
                {
                    name:"router.marking.wait",
                    path:"/main/page",
                    component:Page,
                    view_id:"main-grade"
                },
                {
                    name:"router.marking.wait",
                    path:"/main/pages",
                    component:Page,
                    view_id:"main-gradessssssssssss"
                },
                {
                    name:"router.marking.excel",
                    path:"/main/excle",
                    component:Excel,
                    view_id:"main-grade"
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
         },
    ]
}