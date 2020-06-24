import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TranscriptShow from '../views/TranscriptShow.vue'
import Access from '../views/ApiKeys.vue'
import ApiDoc from '../views/ApiDoc.vue'
import NotFound from '../views/error/NotFound.vue'
import Login from '../views/VLogin.vue'
import Logout from '../views/Logout.vue'
import Setup from '../views/VSetup.vue'
import store from '../store'
import loginHelper from '../utils/loginHelper'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Transcriptions',
    component: Home,
    meta: { requiresAuth: true, inMenu: true, icon: 'mdi-view-list' },
  },
  {
    path: '/access',
    name: "Clés d'accès",
    component: Access,
    meta: { requiresAuth: true, inMenu: true, icon: 'mdi-key' },
  },
  {
    path: '/doc',
    name: 'Documentation',
    component: ApiDoc,
    meta: { requiresAuth: true, inMenu: true, icon: 'mdi-file-document' },
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
