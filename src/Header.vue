<template>
  <nav class="navbar navbar-light bg-light navbar-expand-md">
    <!-- Logo and nav, buttons. -->
    <!--<nav class="header_section">-->

      <router-link to="/landing" class="navbar-brand">
        <span class="logo">
          <img src="./assets/logo3.png" alt="Infomag logo">
        </span>
      </router-link>

      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">

        <ul v-if="this.$store.state.jwt" class="navbar-nav ml-auto">
          <li class="navbar-item">
            <router-link to="/landing">
              <div class="nav-link">Landing List</div>
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/company">
              <div class="nav-link">Company List</div>
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/db">
              <div class="nav-link">DB List</div>
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/users">
              <div class="nav-link">User List</div>
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/myinfo">
              <div class="nav-link">{{ name }}</div>
            </router-link>
          </li>
          <li class="navbar-item">
            <input type="button" class="submit_btn btn btn-outline-dark nav-link" @click="logout" value="LogOut">
          </li>
        </ul>

        <ul v-else class="navbar-nav ml-auto">
          <li class="navbar-item">
            <router-link to="/">
              <div class="nav-link">SignIn</div>
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/signup">
              <div class="nav-link">SignUp</div>
            </router-link>
          </li>
        </ul>

      </div>

    <!--</nav>-->
  </nav>
</template>

<script>
export default {
  name: 'app-header',
  data: () => ({
    name: '',
    temp: ''
  }),
  methods: {
    logout () {
      this.$store.commit('removeToken')
      this.$router.push({
        name: 'sign_in'
      })
    }
  },
  mounted () {
    this.name = this.$data.auth_user
    if(this.$data.auth_user) {
      this.name = this.$data.auth_user
    } else {
      this.name = this.$store.state.authUser.full_name
    }
  }
}
</script>

<style scoped lang="scss">
  li .router-link-exact-active {
    color: #efefef;
    div {
      background-color: #00737a;
      color: #efefef;
      font-weight: bold;
    }
  }
</style>
