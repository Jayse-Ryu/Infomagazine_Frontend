import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import Decoder from 'jwt-decode'
// import Bootstrap from 'bootstrap-vue'
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
    }
  }
  /* actions: {
    obtainToken (username, password) {
      const payload = {
        username: username,
        password: password
      }
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  } */
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
