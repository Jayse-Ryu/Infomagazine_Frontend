<template>
  <header class="header">
    <!-- Logo and nav, buttons. -->
    <section class="header_section">

      <router-link to="/landing" class="logo_wrap"><div class="logo_inner"><img src="./assets/logo3.png" alt="Infomag logo"></div></router-link>

      <ul v-if="this.$store.state.jwt" class="header_ul">
        <li>
          <router-link to="/landing"><div class="menu_btn">Landing List</div></router-link>
        </li>
        <li>
          <router-link to="/company"><div class="menu_btn">Company List</div></router-link>
        </li>
        <li>
          <router-link to="/db"><div class="menu_btn">DB List</div></router-link>
        </li>
        <li>
          <router-link to="/users"><div class="menu_btn">User List</div></router-link>
        </li>

        <li>
          <router-link to="/myinfo">
            <div class="user_info">{{ name }}</div>
          </router-link>
        </li>
        <li>
          <input type="button" class="logout" @click="logout" value="LogOut">
        </li>
      </ul>

      <ul v-else class="header_ul">
        <li>
          <router-link to="/"><div class="menu_btn">SignIn</div></router-link>
        </li>
        <li>
          <router-link to="/signup"><div class="menu_btn">SignUp</div></router-link>
        </li>
      </ul>

    </section>
  </header>
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
    if (this.$data.header_name) {
      this.temp = this.$data.header_name
    }

    if (this.$store.state.jwt) {
      this.flag = 'Logined'
    } else {
      this.flag = 'out'
    }

    // const axios = this.$axios
    // console.log('clicked')
    //
    // const base = {
    //   baseURL: this.$store.state.endpoints.baseUrl,
    //   headers: {
    //     // Set your Authorization to 'JWT', not Bearer!!!
    //     Authorization: `JWT ${this.$store.state.jwt}`,
    //     'Content-Type': 'application/json'
    //   },
    //   xhrFields: {
    //     withCredentials: true
    //   }
    // }
    // // Even though the authentication returned a user object that can be
    // // decoded, we fetch it again. This way we aren't super dependant on
    // // JWT and can plug in something else.
    // const axiosInstance = axios.create(base)
    // axiosInstance({
    //   url: "/users/",
    //   method: "get",
    //   params: {}
    // })
    //   .then((response) => {
    //     this.$store.commit("setAuthUser",
    //       {authUser: response.data, isAuthenticated: true}
    //     )
    //     console.log(response.data)
    //     this.name = response.data[0].full_name
    //     this.$router.push({name: 'sign_up'})
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.debug(error);
    //     console.dir(error);
    //   })
  }
}
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    padding: 5px 0;
    // background-color: #efefef;
    border-bottom: 2px solid #efefef;
  }
  .header_section {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .logo_wrap {
    float: left;
    .logo_inner {
      padding: 20px;
    }
  }

  .header_ul {
    width: calc(100% - 260px);
    float: left;
    li {
      float: left;
      width: 15%;
      padding: 28px;
      text-align: center;
      .menu_btn {
        text-align: center;
        padding: 4px;
        border: 1px solid;
        border-radius: 5px;
      }
      .user_info {
        text-align: center;
        padding: 4px;
      }
      .logout {
        padding: 4px;
        background-color: #ffffff;
        border: 1px solid #c1c1c1;
        border-radius: 4px;
        padding: 4px;
      }
    }
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>
