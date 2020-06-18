import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TranscriptShow from '../views/TranscriptShow.vue'
import Access from '../views/ApiKeys.vue'
import ApiDoc from '../views/ApiDoc.vue'
import NotFound from '../views/error/NotFound.vue'
import Login from '../views/VLogin.vue'
import Logout from '../views/Logout.vue'
import Test from '../views/Test.vue'
import Setup from '../views/VSetup.vue'
import store from '../store'
import loginHelper from '../utils/loginHelper'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/doc',
    name: 'ApiDoc',
    component: ApiDoc,
    meta: { requiresAuth: true },
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: { requiresAuth: true },
  },
  {
    path: '/access',
    name: 'Access',
    component: Access,
    meta: { requiresAuth: true },
  },
  {
    path: '/transcript/show/:id',
    name: 'TranscriptShow',
    component: TranscriptShow,
    meta: { requiresAuth: true },
  },
  {
    path: '/setup',
    component: Setup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.VUE_APP_BASE_URL,
  routes,
})

// Redirect if not logged
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if ((await store.getters['auth/isLogged']) || (await loginHelper())) {
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
