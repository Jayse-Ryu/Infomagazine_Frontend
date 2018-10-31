import Vue from 'vue'
import Router from 'vue-router'
// import Vuex from 'vuex'
import Axios from 'axios'

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

Vue.use(Router)
// Vue.use(Vuex)
Vue.use(Axios)

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
      path: '/landing/detail',
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

// eslint-disable-next-line
// function auth_filter () {
//   // const axios = this.$axios
//   const axios = new Axios()
//   console.log(axios)
//
//   const base = {
//     baseURL: this.$store.state.endpoints.baseUrl,
//     headers: {
//       // Set your Authorization to 'JWT', not Bearer!!!
//       Authorization: `JWT ${this.$store.state.jwt}`,
//       'Content-Type': 'application/json'
//     },
//     xhrFields: {
//       withCredentials: true
//     }
//   }
//   // Even though the authentication returned a user object that can be
//   // decoded, we fetch it again. This way we aren't super dependant on
//   // JWT and can plug in something else.
//   const axiosInstance = axios.create(base)
//   axiosInstance({
//     url: '/users/',
//     method: 'get',
//     params: {}
//   })
//     .then((response) => {
//       this.$store.commit('setAuthUser',
//         {authUser: response.data, isAuthenticated: true}
//       )
//       console.log(response.data)
//       console.log(response.data[0].authority_id)
//       // this.$router.push({name: 'Signup'})
//     })
//     .catch((error) => {
//       console.log(error)
//       console.debug(error)
//       console.dir(error)
//       alert('Error.')
//       this.$router.push({name: 'Signin'})
//     })
// }

// adding differnt authentication for user list or something.
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (window.localStorage.token) {
      next()
    } else {
      next({name: 'sign_in'})
    }
  }
  // console.log('to name is ', to.name)
  // console.log('to path is ', to.path)
  // console.log('token is ', window.localStorage.token)
  if (window.localStorage.token && to.name === 'sign_in') {
    next({name: 'landing_list'})
  } else if (window.localStorage.token && to.path === '/') {
    next({name: 'landing_list'})
  }
  next()
})

export default router
