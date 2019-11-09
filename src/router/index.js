import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import ClazzList from '@/components/ClazzList'
import TeacherList from '@/components/TeacherList'
import CourseList from '@/components/CourseList'
import GradeList from '@/components/GradeList'
import StudentList from '@/components/StudentList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        title: '欢迎登陆'
      }
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: '主页'
      },
      children: [{
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
      }]

    }
  ]
})
