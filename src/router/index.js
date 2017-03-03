import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Hello2 from 'components/Hello2'
import Weekly from 'components/Weekly'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/weekly',
      name: 'Weekly Activities',
      component: Hello2
    }
  ]
})
