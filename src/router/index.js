// Main imports
import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Vuex from 'vuex'

// User Login SignUp
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

// Browser Access filter page
import Gateway from '@/components/Gateway'

// About landing pages
import LandingList from '@/components/LandingList'
import LandingCreate from '@/components/LandingCreate'
import LandingDetail from '@/components/LandingDetail'

// About Organization for staff or superuser
import Organization from '@/components/OrganizationList'
import OrganizationDetail from '@/components/OrganizationDetail'

// About Company for marketer
import CompanyList from '@/components/CompanyList'
import CompanyCreate from '@/components/CompanyCreate'
import CompanyDetail from '@/components/CompanyDetail'

// DBs in langings
import DBList from '@/components/DBList'
import DBDetail from '@/components/DBDetail'

// Manage users for marketer
import UserDetail from '@/components/UserDetail'
import UserList from '@/components/UserList'

// Update my information
import MyInfo from '@/components/MyInfo'

// use like this.$xx
Vue.use(Router)
Vue.use(Axios)
Vue.use(Vuex)

// export default new Router({
const router = new Router({
  routes: [
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
      path: '/gateway',
      name: 'gateway',
      component: Gateway,
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
      path: '/organization',
      name: 'organization_list',
      component: Organization,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/organization/detail/:organization_id',
      name: 'organization_detail',
      component: OrganizationDetail,
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
      path: '/db',
      name: 'db_list',
      component: DBList,
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
      path: '/users/detail',
      name: 'user_detail',
      component: UserDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'user_list',
      component: UserList,
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
    next({name: 'gateway'})
  } else if (window.localStorage.token && to.path === '/') {
    next({name: 'gateway'})
  }
  next()
})

export default router
