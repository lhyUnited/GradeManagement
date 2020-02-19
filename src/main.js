// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(qs)
Vue.config.devtools = true
axios.defaults.baseURL = 'http://www.tomluvjerry.cn:5567/studentmanager/'
axios.defaults.withCredentials = true

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLogin)) { // 判断该路由是否需要登录权限
    if (to.name !== 'LoginPage') {
      console.log('motherfucker')
    }
    if (!localStorage.getItem('UserInfo') && to.name !== 'LoginPage') {
      next('/')
      console.log('进入了这个判断')
    } else {
      next()
    }
  } else {
    next()
  }
})
