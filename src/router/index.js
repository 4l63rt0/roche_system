import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../views/Home2.vue'
import about from '../views/about.vue'
import user_profile from '../views/user_profile.vue'
import update_user from '../views/update_user.vue'
import update_kid from '../views/update_kid.vue'
import update_routine from '../views/update_routine.vue'
import update_reward from '../views/update_reward.vue'
import add_kid from '../views/add_kid.vue'
import add_routine from '../views/add_routine.vue'
import add_reward from '../views/add_reward.vue'
import signUp from '../components/User/signUp.vue'
import login from '../components/User/login.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/2',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/user_profile',
    name: 'user_profile',
    component: user_profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/update_user',
    name: 'update_user',
    component: update_user,
    beforeEnter: AuthGuard
  },
  {
    path: '/update_kids/:id',
    name: 'update_kid',
    component: update_kid,
    beforeEnter: AuthGuard,
    paramas: true
  },
  {
    path: '/update_routines/:id',
    name: 'update_routine',
    component: update_routine,
    beforeEnter: AuthGuard,
    paramas: true
  },
  {
    path: '/update_rewards/:id',
    name: 'update_reward',
    component: update_reward,
    beforeEnter: AuthGuard,
    paramas: true
  },
  {
    path: '/add_kid',
    name: 'add_kid',
    component: add_kid,
    beforeEnter: AuthGuard
  },
  {
    path: '/add_routine',
    name: 'add_routine',
    component: add_routine,
    beforeEnter: AuthGuard
  },
  {
    path: '/add_reward',
    name: 'add_reward',
    component: add_reward,
    beforeEnter: AuthGuard
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
