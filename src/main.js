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
axios.defaults.baseURL = 'http://localhost:6969/studentmanager'
axios.defaults.withCredentials = true

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
