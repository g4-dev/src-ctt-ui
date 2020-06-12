import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TranscriptShow from '../views/TranscriptShow.vue'
import Access from '../views/ApiKeys.vue'
import NotFound from '../views/error/NotFound.vue'
import Login from '../views/VLogin.vue'
import Setup from '../views/VSetup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/access',
    name: 'Access',
    component: Access,
  },
  {
    path: '/transcript/show/:id',
    name: 'TranscriptShow',
    component: TranscriptShow,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/setup',
    component: Setup,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router



