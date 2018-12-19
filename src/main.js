import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import Decoder from 'jwt-decode'
import Paginate from 'vuejs-paginate'

// Routers
import Header from './Header'

Vue.config.productionTip = false
Vue.component('app-header', Header)
Vue.component('paginate', Paginate)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VeeValidate)
Vue.use(axios)

Vue.prototype.$jwt_decode = Decoder
Vue.prototype.$axios = axios
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

/* Vuex with token */
// eslint-disable-next-line
const store = new Vuex.Store({
  state: {
    authUser: {},
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
        current: 0,
        option: 0,
        text: ''
      },
      company: {
        current: 0,
        option: 0,
        text: ''
      },
      user: {
        current: 0,
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
      state.isAuthenticated = false
    }
  },
  actions: {
    // obtainToken (username, password) {
    obtainToken (self, pay) {
      const payload = {
        username: pay.username,
        password: pay.password
      }
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          this.dispatch('getAuthUser')
          router.push('/landing')
        })
        .catch((error) => {
          console.log('Obtain Token action error..', error)
          alert('아이디와 비밀번호를 확인해주세요.')
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          alert('Refreshing Token! happy?')
          this.commit('updateToken', response.data.token)
          this.dispatch('getAuthUser')
        })
        .catch((error) => {
          console.log('Refresh Token action error..', error)
        })
    },
    inspectToken () {
      if (this.state.jwt !== null) {
        const token = this.state.jwt
        if (token) {
          const decoded = Decoder(token)
          const exp = decoded.exp
          const orig_iat = decoded.orig_iat
          const a_day = 86400 // 7*24*60*60
          const thirty_minutes = 1800 // 30*60
          if ((Date.now() / 1000) > exp) {
            // IF TOKEN EXPIRED THEN SEND TO LOGIN PAGE
            this.commit('removeToken')
            alert('토큰이 만료되었습니다. 다시 로그인 해 주세요.')
            router.push('/')
            return false
          } else if ((Date.now() / 1000) > exp - thirty_minutes && (Date.now() / 1000) < orig_iat + a_day) {
            // IF TOKEN EXPIRE IN LESS THAN 30MN BUT STILL IN REFRESH PERIOD THEN REFRESH
            alert('We have been catch Token before expired. happy?')
            this.dispatch('refreshToken')
            router.push('/')
            return true
          }
          // Nor Nothing
        } else {
          // NO TOKEN THEN SEND TO LOGIN PAGE
          this.commit('removeToken')
          alert('로그인 후 이용 가능합니다.')
          router.push('/')
          return false
        }
      }
    },
    getAuthUser () {
      if (this.dispatch('inspectToken')) {
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
            url: '/users/' + user_id + '/',
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
              console.log('(Auth)', this.state.authUser.full_name)
              // this.auth_user = this.state.authUser.full_name
              // Auto move to inner main page.
              // this.$router.push({name: 'landing_list'})
            })
            .catch((error) => {
              console.log('get Auth user failed..', error)
            })
        }
      } else {
        // If token is didn't survived, activate inspect token
        this.dispatch('inspectToken')
      }
    }
  }
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
