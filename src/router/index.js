import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import ClazzList from '@/components/list/ClazzList'
import TeacherList from '@/components/list/TeacherList'
import CourseList from '@/components/list/CourseList'
import GradeList from '@/components/list/GradeList'
import StudentList from '@/components/list/StudentList'
import ExamList from '@/components/list/ExamList'
import Intro from '@/components/Intro'
import ExamListByTeacher from '@/components/list/ExamListByTeacher'
import ExamDetail from '@/components/ExamDetail'
import StudentListByClazz from '@/components/list/StudentListByClazz'
import ExamListByStudent from '@/components/list/ExamListByStudent'
import PersonInfo from '@/components/list/PersonInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        isLogin: false,
        title: '欢迎登陆'
      }
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        isLogin: true,
        title: '主页'
      },
      children: [{
        path: 'showMyInfo',
        name: 'ShowMyInfo',
        component: PersonInfo
      },
      {
        path: 'listExamByStudent',
        name: 'ListExamByStudent',
        component: ExamListByStudent
      },
      {
        path: 'listClassByStudent',
        name: 'ListClassByStudent',
        component: StudentListByClazz
      },
      {
        path: 'intro',
        name: 'Intro',
        component: Intro
      },
      {
        path: 'examDetail',
        name: 'ExamDetail',
        component: ExamDetail
      },
      {
        path: 'listExamByTeacher',
        name: 'ListExamByTeacher',
        component: ExamListByTeacher
      },
      {
        path: 'listAllClazz',
        name: 'ListAllClass',
        component: ClazzList
      },
      {
        path: 'listAllTeacher',
        name: 'ListAllTeacher',
        component: TeacherList
      },
      {
        path: 'listAllCourse',
        name: 'ListAllCourse',
        component: CourseList
      },
      {
        path: 'listAllGrade',
        name: 'ListAllGrade',
        component: GradeList
      },
      {
        path: 'listAllStudent',
        name: 'ListAllStudent',
        component: StudentList
      },
      {
        path: 'listAllExam',
        name: 'ListAllExam',
        component: ExamList
      }]

    }
  ]
})
