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
    path: '/avalon/:roomId',
    name: 'AvalonGame',
    component: () => import('../views/AvalonGame.vue'),
    props: true
  },
  {
    path: '/donate',
    name: 'Donate',
    component: Donate
  }
]

if (process.env.NODE_ENV == "development") {
  routes.push(
    {
      path: '/components',
      name: 'Components',
      component: () => import ('../views/Components.vue')
    }
  )
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
