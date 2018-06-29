import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Homepage from '@/components/Homepage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    }
  ]
})
