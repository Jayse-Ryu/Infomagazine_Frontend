<template>
  <nav class="navbar navbar-light bg-light navbar-expand-md">
    <!-- Logo and nav, buttons. -->
    <!--<nav class="header_section">-->

    <router-link to="/landing" class="logo_wrap navbar-brand">
        <span class="logo">
          <img src="./assets/logo3.png" alt="Infomag logo">
        </span>
    </router-link>

    <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">

      <ul v-if="this.$store.state.jwt" class="navbar-nav ml-auto">
        <li v-if="access_obj.access != -2" class="navbar-item">
          <router-link to="/landing">
            <div class="nav-link">Landings</div>
          </router-link>
        </li>
        <li v-if="user_obj.is_staff == true" class="navbar-item">
          <router-link to="/organization">
            <div class="nav-link">Organizations</div>
          </router-link>
        </li>
        <li v-if="user_obj.is_staff == false && access_obj.access == 1">
          <router-link :to="'/organization/detail/' + access_obj.organization">
            <div class="nav-link">Organization</div>
          </router-link>
        </li>
        <li v-if="access_obj.access == 1" class="navbar-item">
          <router-link to="/company">
            <div class="nav-link">Companies</div>
          </router-link>
        </li>
        <li v-if="access_obj.access == 1" class="navbar-item">
          <router-link to="/users">
            <div class="nav-link">Users</div>
          </router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/myinfo">
            <div class="nav-link current_user font" v-model="header_name">{{ header_name }}</div>
          </router-link>
        </li>
        <li class="navbar-item">
          <input type="button" class="btn btn-dark pb-1 pt-1" @click="logout" value="LogOut">
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
    created(){
      //
    },
    data: () => ({
      //
    }),
    methods: {
      logout() {
        this.$store.commit('removeToken')
        this.$router.push({
          name: 'sign_in'
        })
      }
    },
    mounted() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      } else {
        // alert('Where is JWT?')
        // this.$router.push('/')
      }
    },
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      } else {
        // alert('Where is JWT?')
        // this.$router.push('/')
      }
    },
    computed: {
      header_name: function () {
        return this.$store.state.authUser.full_name
      },
      user_obj () {
        if(this.$store.state.authUser) {
          return this.$store.state.authUser
        }
      },
      access_obj() {
        if(this.$store.state.userAccess) {
          return this.$store.state.userAccess
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  li .router-link-exact-active {
    color: #287BFF;

    div {
      // background-color: #00737a;
      color: #287BFF !important;
      font-weight: bold;
    }
  }

  .current_user {
    color: cadetblue !important;
  }

  @media (max-width: 350px) {
    .logo_wrap {
      max-width: 210px !important;

      .logo {
        img {
          width: 80%;
        }
      }
    }
  }
</style>
