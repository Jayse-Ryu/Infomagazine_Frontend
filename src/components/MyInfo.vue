<template>
  <div class="main">
    <div class="main">
      <div class="text_navigation">
        <router-link to="/">로그인</router-link>
        <span>></span>
        <router-link to="/myinfo">내 정보</router-link>
      </div>
    </div>
  <div>My info page</div>
    <div>
      <input type="button" @click="show" value="Who am I?">
    </div>
    <div>{{ id }}</div>
    <div>{{ name }}</div>
    <div>{{ email }}</div>
    <div>{{ phone }}</div>
    <div>{{ org }}</div>
    <div>{{ creda }}</div>
    <div>{{ upda }}</div>
  </div>
</template>

<script>
export default {
  name: "my_info",
  data: () => ({
    id: '',
    name: '',
    email: '',
    phone: '',
    org: '',
    creda: '',
    upda: ''
  }),
  methods: {
    show () {
      let axios = this.$axios
      let decode = this.$jwt_decode
      console.log('jwttttttttttttttttttt')
      let decoder = decode(this.$store.state.jwt)
      // this.$store.state.authUser = decoder
      // get and set auth user
      const base = {
        baseURL: this.$store.state.endpoints.baseUrl,
        headers: {
          // Set your Authorization to 'JWT', not Bearer!!!
          Authorization: `JWT ${this.$store.state.jwt}`,
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
        url: '/users/',
        method: 'get',
        params: {}
      })
        .then((response) => {
          // Make sure this token user detail only
          for(let i = 0; i < response.data.length; i++) {
            let usr_obj = response.data[i]
            if (usr_obj.id === decoder.user_id) {
              this.$store.commit('setAuthUser',
                {authUser: usr_obj, isAuthenticated: true}
              )
              break
            }
          }
          this.name = this.$store.state.authUser.full_name
          this.id = this.$store.state.authUser.username
          this.name = this.$store.state.authUser.full_name
          this.email = this.$store.state.authUser.email
          this.phone = this.$store.state.authUser.phone
          this.org = this.$store.state.authUser.organization
          this.creda = this.$store.state.authUser.created_date
          this.upda = this.$store.state.authUser.updated_date
          // Auto move to inner main page.
          // this.$router.push({name: 'landing_list'})
        })
        .catch((error) => {
          console.log(error)
          console.debug(error)
          console.dir(error)
          alert('No information.')
        })
    }
  }
}
</script>

<style scoped>

</style>
