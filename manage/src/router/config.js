import dynamic from 'dva/dynamic';

// 引入路由
const CheckTheitem = dynamic({
    component: () => import('../page/main/question/checkTheitem.js'),
});
const QuestionsType = dynamic({
    component: () => import('../page/main/question/questionsType.js'),
});
const CheckTheitem = dynamic({
    component: () => import('../page/main/question/checkTheitem.js'),
});
const AddUser = dynamic({
    component: () => import('../page/main/user/addUser.js'),
});
const ShowUser = dynamic({
    component: () => import('../page/main/user/showUser.js'),
});
const Addexam = dynamic({
    component: () => import('../page/main/exam/addexam.js'),
});
const ExamList = dynamic({
    component: () => import('../page/main/exam/examList.js'),
});
const Grade = dynamic({
    component: () => import('../page/main/classRoom/grade.js'),
});
const Room = dynamic({
    component: () => import('../page/main/classRoom/room.js'),
});
const Student = dynamic({
    component: () => import('../page/main/classRoom/student.js'),
});
const Student = dynamic({
    component: () => import('../page/main/classRoom/student.js'),
});

export default {
    routes: [{
        name: 'router.question',
        children: [{
            name: 'router.question.checkTheitem',
            id: 'main-addQuestions',
            path: '/question/checkTheitem',
            component: CheckTheitem
        },{
            name: 'router.question.questionsType',
            id: 'main-questionsType',
            path: '/question/questionsType',
            component: QuestionsType
        },{
            name: 'router.question.checkTheitem',
            id: 'main-watchQuestions',
            path: '/question/checkTheitem',
            component: CheckTheitem
        }]
    },{
        name: 'router.user',
        children: [{
            name: 'router.user.addUser',
            id: 'main-addUser',
            path: '/user/addUser',
            component: AddUser
        },{
            name: 'router.user.showUser',
            id: 'main-showUser',
            path: '/user/showUser',
            component: ShowUser
        }]
    },{
        name: 'router.exam',
        children: [{
            name: 'router.exam.addexam',
            id: 'main-addExam',
            path: '/exam/addexam',
            component: Addexam
        },{
            name: 'router.exam.examList',
            id: 'main-examList',
            path: '/exam/examList',
            component: ExamList
        }]
    },{
        name: 'router.classRoom',
        children: [{
            name: 'router.classRoom.grade',
            id: 'main-grade',
            path: '/classRoom/grade',
            component: Grade
        },{
            name: 'router.classRoom.room',
            id: 'main-room',
            path: '/classRoom/room',
            component: Room
        },{
            name: 'router.classRoom.student',
            id: 'main-student',
            path: '/classRoom/student',
            component: Student
        }]
    }]
}