// Main imports
import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Store from '@/main.js'
// import Vuex from 'vuex'

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
// Vue.use(Vuex)

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
        signed: true
      }
    },
    {
      path: '/landing',
      name: 'landing_list',
      component: LandingList,
      meta: {
        signed: true,
        auth_grade: 'customer'
      }
    },
    {
      path: '/landing/create',
      name: 'landing_create',
      component: LandingCreate,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/landing/detail/:landing_id',
      name: 'landing_detail',
      component: LandingDetail,
      meta: {
        signed: true,
        auth_grade: 'customer'
      }
    },
    {
      path: '/organization',
      name: 'organization_list',
      component: Organization,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/organization/detail/:organization_id',
      name: 'organization_detail',
      component: OrganizationDetail,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/company',
      name: 'company_list',
      component: CompanyList,
      meta: {
        signed: true,
        auth_grade: 'customer'
      }
    },
    {
      path: '/company/create',
      name: 'company_create',
      component: CompanyCreate,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/company/detail/:company_id',
      name: 'company_detail',
      component: CompanyDetail,
      meta: {
        signed: true,
        auth_grade: 'customer'
      }
    },
    {
      path: '/db',
      name: 'db_list',
      component: DBList,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/db/detail',
      name: 'db_detail',
      component: DBDetail,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/users/detail',
      name: 'user_detail',
      component: UserDetail,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/users',
      name: 'user_list',
      component: UserList,
      meta: {
        signed: true,
        auth_grade: 'manager'
      }
    },
    {
      path: '/myinfo',
      name: 'my_info',
      component: MyInfo,
      meta: {
        signed: true
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
  if (to.meta.signed) {
    if (window.localStorage.token) {
      next()
    } else {
      alert('로그인 후 이용 가능합니다.')
      next({name: 'sign_in'})
    }
  }
  if (to.meta.auth_grade) {
    let auth = to.meta.auth_grade
    if (auth === 'superuser') {
      if (Store.state.authUser.is_superuser) {
        next()
      } else {
        next({name: 'gateway'})
      }
    } else if (auth === 'staff') {
      if (Store.state.authUser.is_staff) {
        next()
      } else {
        next({name: 'gateway'})
      }
    } else if (auth === 'manager') {
      if (Store.state.userAccess.access === 1) {
        // eslint-disable-next-line
        if (to.name == 'organization_detail' && Store.state.userAccess.organization == to.params.organization_id) {
          next()
          // eslint-disable-next-line
        } else if (to.name == 'organization_detail' && Store.state.userAccess.organization !== to.params.organization_id) {
          next({name: 'organization_list'})
        } else {
          next()
        }
      } else {
        next({name: 'gateway'})
      }
    } else if (auth === 'customer') {
      if (Store.state.userAccess.access >= 1) {
        next()
      } else {
        next({name: 'gateway'})
      }
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
