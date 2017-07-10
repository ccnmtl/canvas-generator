import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Weekly from 'components/Weekly'
import WeeklyList from 'components/WeeklyList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/weekly',
      name: 'Weekly Activities',
      component: Weekly
    },
    {
      path: '/weeklylist',
      name: 'Weekly Activities List',
      component: WeeklyList
    },

  ]
})
