import Vue from 'vue'
import Router from 'vue-router'
import Splash from 'components/Splash'
import Home from 'components/Home'
import NewHome from 'components/NewHome'
import NewActivity from 'components/NewActivity'
import NewWeeklyList from 'components/NewWeeklyList'
import Syllabus from 'components/Syllabus'
import Program from 'components/ProgramOverview'
import Weekly from 'components/Weekly'
import Zoom from 'components/Zoom'
import WeeklyList from 'components/WeeklyList'
import StudentsList from 'components/StudentsList'
import Student from 'components/Student'
import Export from 'components/Export'
import Guide from 'components/Guide'
import Credits from 'components/Credits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome Page',
      component: Splash
    },
    {
      path: '/home',
      name: 'Home Template',
      component: Home
    },
    {
      path: '/home-new',
      name: 'New Home Template',
      component: NewHome
    },
    {
      path: '/activity-new',
      name: 'New Activity Template',
      component: NewActivity
    },
    {
      path: '/weekly-new',
      name: 'New Weekly Template',
      component: NewWeeklyList
    },
    {
      path: '/syllabus',
      name: 'Syllabus Template',
      component: Syllabus
    },
    {
      path: '/weekly',
      name: 'Weekly Activity',
      component: Weekly
    },
    {
      path: '/program',
      name: 'Program Overview',
      component: Program
    },
    {
      path: '/studentlist',
      name: 'Student List',
      component: StudentsList
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/activities',
      name: 'Activities',
      component: WeeklyList
    },
    {
      path: '/zoom',
      name: 'Zoom',
      component: Zoom
    },
    {
      path: '/export',
      name: 'Export',
      component: Export
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits
    }
  ]
})
