import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import ClazzList from '@/pages/ClazzList'
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
        path: 'listAllClass',
        name: 'ListAllClass',
        component: ClazzList
      }]

    }
  ]
})
