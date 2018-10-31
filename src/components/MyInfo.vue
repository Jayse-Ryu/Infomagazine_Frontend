<template>
  <div>
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
      const axios = this.$axios

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
          this.$store.commit('setAuthUser',
            {authUser: response.data, isAuthenticated: true}
          )
          console.log(response.data)
          this.id = response.data[0].account
          this.name = response.data[0].name
          this.email = response.data[0].email
          this.phone = response.data[0].phone
          this.org = response.data[0].organization
          this.creda = response.data[0].created_date
          this.upda = response.data[0].updated_date
          // this.$router.push({name: 'Signup'})
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
