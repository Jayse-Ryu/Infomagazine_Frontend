import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Vuex from 'vuex'

import CompanyCreate from '@/components/CompanyCreate'
import CompanyDetail from '@/components/CompanyDetail'
import CompanyList from '@/components/CompanyList'
import DBDetail from '@/components/DBDetail'
import DBList from '@/components/DBList'
import LandingCreate from '@/components/LandingCreate'
import LandingDetail from '@/components/LandingDetail'
import LandingList from '@/components/LandingList'
import MyInfo from '@/components/MyInfo'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import UserDetail from '@/components/UserDetail'
import UserList from '@/components/UserList'

// use like this.$xx
Vue.use(Router)
Vue.use(Axios)
Vue.use(Vuex)

// export default new Router({
const router = new Router({
  routes: [
    {
      path: '/company/create',
      name: 'conpany_create',
      component: CompanyCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/company/detail',
      name: 'company_detail',
      component: CompanyDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/company',
      name: 'company_list',
      component: CompanyList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/db/detail',
      name: 'db_detail',
      component: DBDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/db',
      name: 'db_list',
      component: DBList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/landing/create',
      name: 'landing_create',
      component: LandingCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/landing/detail/:landing_id',
      name: 'landing_detail',
      component: LandingDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/landing',
      name: 'landing_list',
      component: LandingList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myinfo',
      name: 'my_info',
      component: MyInfo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'sign_in',
      component: Signin
    },
    {
      path: '/signup',
      name: 'sign_up',
      component: Signup
    },
    {
      path: '/users/detail',
      name: 'user_detail',
      component: UserDetail,
      meta: {
        requiresAuth: true,
        is_staff: true
      }
    },
    {
      path: '/users',
      name: 'user_list',
      component: UserList,
      meta: {
        requiresAuth: true,
        is_staff: true
      }
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

// adding differnt authentication for user list or something.
router.beforeEach((to, from, next) => {
  // Block not applied users
  if (to.meta.requiresAuth) {
    if (window.localStorage.token) {
    // if (this.$store.state.isAuthenticated) {
      next()
    } else {
      alert('로그인 후 이용 가능합니다.')
      next({name: 'sign_in'})
    }
  }
  // When auth user, return to landing page from sign_in
  if (window.localStorage.token && to.name === 'sign_in') {
    next({name: 'landing_list'})
  } else if (window.localStorage.token && to.path === '/') {
    next({name: 'landing_list'})
  }
  next()
})

export default router
