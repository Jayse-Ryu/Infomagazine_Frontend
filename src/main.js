import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import Decoder from 'jwt-decode'
import Paginate from 'vuejs-paginate'
// import VueDragDrop from 'vue-drag-drop'
import VueGrid from 'vue-grid-layout'
import VTooltip from 'v-tooltip'
import VueDraggableResizable from 'vue-draggable-resizable'
// import module_auth from './store_modules/auth'

// Routers
import Header from './Header'

Vue.component('app-header', Header)
Vue.component('paginate', Paginate)
Vue.component('vue-grid', VueGrid)
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
// Vue.use(axios)
Vue.use(VueGrid)
Vue.use(VTooltip)
Vue.use(VueDraggableResizable)

Vue.prototype.$jwt_decode = Decoder
Vue.prototype.$axios = axios
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

/* Vuex with token */
// eslint-disable-next-line
const store = new Vuex.Store({
  state: {
    authUser: {},
    userAccess: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      obtainJWT: 'http://127.0.0.1:8000/api-token-auth/',
      refreshJWT: 'http://127.0.0.1:8000/api-token-refresh/',
      baseUrl: 'http://127.0.0.1:8000/'
    },
    pageOptions: {
      landing: {
        page: 1,
        option: 0,
        text: ''
      },
      organization: {
        page: 1,
        option: 0,
        text: ''
      },
      company: {
        page: 1,
        option: 0,
        text: ''
      },
      user: {
        page: 1,
        option: 0,
        text: ''
      }
    }
  },
  mutations: {
    setAuthUser (state, {
      authUser,
      isAuthenticated
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    setAccess (state, {
      userAccess
    }) {
      Vue.set(state, 'userAccess', userAccess)
    },
    updateToken (state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem('token', newToken)
      state.jwt = newToken
    },
    removeToken (state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem('token')
      state.jwt = null
      state.authUser = {}
      state.userAccess = {}
      state.isAuthenticated = false
    }
  },
  actions: {
    // obtainToken (account, password) {
    obtainToken (self, pay) {
      const payload = {
        account: pay.account,
        password: pay.password
      }
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          return this.dispatch('getAuthUser')
        })
        .then(() => {
          router.push('/gateway')
        })
        // eslint-disable-next-line
        .catch((error) => {
          // console.log('Obtain Token action error..', error)
          alert('아이디와 비밀번호를 확인해주세요.')
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          return this.dispatch('getAuthUser')
        })
        .catch((error) => {
          console.log('Refresh Token action error..', error)
        })
    },
    inspectToken () {
      console.log('Inspect')
      if (this.state.jwt != null) {
        const token = this.state.jwt
        if (token) {
          const decoded = Decoder(token)
          const exp = decoded.exp
          const orig_iat = decoded.orig_iat
          const a_day = 86400 // 7*24*60*60
          const thirty_minutes = 1800 // 30*60
          if ((Date.now() / 1000) > exp) {
            // If token expired then send to login page
            this.commit('removeToken')
            alert('로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.')
            router.push('/')
            return false
          } else if ((Date.now() / 1000) > exp - thirty_minutes && (Date.now() / 1000) < orig_iat + a_day) {
            // If token expire in less than 30 minutes but still in refresh period then refresh
            // alert('토큰이 자동 업데이트 되었습니다.')
            this.dispatch('refreshToken')
              .then(() => {
                router.push('/')
                return true
              })
              .catch((error) => {
                console.log('refresh Error - ', error)
              })
          }
          // Nor Nothing
        } else {
          // If no token then send to login page
          this.commit('removeToken')
          alert('로그인 후 이용 가능합니다.')
          console.log('No token -> login')
          router.push('/')
          return false
        }
      } else {
        this.commit('removeToken')
        alert('로그인 후 이용 가능합니다.')
        console.log('JWT missing -> login')
        router.push('/')
        return false
      }
    },
    getAuthUser () {
      console.log('Get auth')
      this.dispatch('inspectToken')
        .then((response) => {
          console.log('dispatch response', response)
          // if (this.dispatch('inspectToken')) {
          // If token is alive
          if (this.state.jwt !== null) {
            // If jwt object is really exist in local store
            const token = this.state.jwt
            const decoded = Decoder(token)
            const user_id = decoded.user_id
            const base = {
              baseURL: this.state.endpoints.baseUrl,
              headers: {
                // Set your Authorization to 'JWT', not Bearer!!!
                Authorization: `JWT ${this.state.jwt}`,
                'Content-Type': 'application/json'
              },
              xhrFields: {
                withCredentials: true
              }
            }
            // Even though the authentication returned a user object that can be
            // decoded, we fetch it again. This way we aren't super dependant on
            // JWT and can plug in something else.
            const axiosInstance = axios.create(base)
            axiosInstance({
              url: '/user/' + user_id + '/',
              method: 'get',
              params: {}
            })
              .then((response) => {
                if (response.data) {
                  let user_obj = response.data
                  delete user_obj['password']
                  this.commit('setAuthUser', {
                    authUser: user_obj,
                    isAuthenticated: true
                  })
                }
                return axios.get(this.state.endpoints.baseUrl + 'user_access/' + user_id + '/')
              })
              .then((response) => {
                this.commit('setAccess', {
                  userAccess: response.data
                })
              })
              .catch((error) => {
                console.log('get Auth user failed..', error)
              })
          }
          // } else {
          //   // If token is didn't survived, activate inspect token
          //   this.dispatch('inspectToken')
          // }
        })
        .catch((error) => {
          console.log('getauth e', error)
        })
    }
  }
  // modules: {
  //   module_auth
  // }
})

export default store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})
