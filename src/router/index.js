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
    path: '/login',
    name: 'Login',
    component: Login,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters['auth/isLogged']) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
})

export default router
