import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Donate from '../views/Donate.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/avalon',
    name: 'Avalon',
    component: () => import('../views/Avalon.vue')
  },
  {
    path: '/donate',
    name: 'Donate',
    component: Donate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
