import Vue from 'vue'
import Router from 'vue-router'
import Splash from 'components/Splash'
import Home from 'components/Home'
import Weekly from 'components/Weekly'
import WeeklyList from 'components/WeeklyList'
import Export from 'components/Export'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/home',
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
    {
      path: '/export',
      name: 'Export',
      component: Export
    }
  ]
})
