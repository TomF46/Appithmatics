import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Play from '@/components/Play'
import Summary from '@/components/Summary'
import Leaderboards from '@/components/ViewLeaderboards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    },
    {
      path: '/leaderboards',
      name: 'Leaderboards',
      component: Leaderboards
    }
  ]
})
