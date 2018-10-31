<template>
  <div class="main" id="main_signin">
    <!-- Login fields login button signup button logo -->
    <div class="login_box container">
      <div class="login_border">
        <div class="logo_wrap">
          <router-link to="/">
            <div class="logo"><img src="../assets/logo3.png" alt="Logo"></div>
          </router-link>
        </div>

        <form class="login_form form-horizontal" id="LoginForm" @submit.prevent="login">
          <div class="form-group">
            <label for="id_username" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-12">
              <input class="form-control"
                     required
                     v-model="username"
                     type="text"
                     placeholder="Username"
                     autofocus="autofocus"
                     maxlength="150"
                     id="id_username">
            </div>
          </div>
          <div class="form-group">
            <label for="id_password" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-12">
              <input class="form-control"
                     required
                     v-model="password"
                     type="password"
                     placeholder="Password"
                     id="id_password">
            </div>
          </div>
          <!--<div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Remember me
                </label>
              </div>
            </div>
          </div>-->
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="submit_btn btn btn-info">Sign in</button>
              <router-link to="signup" class="btn btn-link">Sign up</router-link>
            </div>
          </div>
        </form>
      </div>

      <div class="warn_wrap">
        <div class="warn_1">•경고</div>
        <ol>
          <li>본 사이트는 인포맥 디비시스템 사이트로써 관련자가 아닌 사람은 사용하실 수 없습니다.</li>
          <li>관계자가 아닌 사람이 부정 사용 시 법적 제제 및 민형사 상의 처벌을 받을 수 있음을 알립니다.</li>
        </ol>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'sign_in',
  data: () => ({
    username: '',
    password: '',
  }),
  mounted() {
    this.$parent.$data.header_flag = 0
  },
  destroyed() {
    this.$parent.$data.header_flag = 1
  },
  methods: {
    login () {
      let axios = this.$axios
      const payload = {
        username: this.username,
        password: this.password
      }
      axios.post(this.$store.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.$store.commit('updateToken', response.data.token)
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
              this.$store.commit('setAuthUser',
                {authUser: response.data, isAuthenticated: true}
              )
              this.$router.push({name: 'landing_list'})
            })
        })
        .catch((error) => {
          console.log(error)
          // console.debug(error)
          // console.dir(error)
          alert('아이디와 비밀번호를 확인해주세요.')
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .main {
    position: fixed;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    background: linear-gradient(217deg, rgba(2,0,36,.8), rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, rgba(121,9,114,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,212,255,.8), rgba(0,0,255,0) 70.71%);
  }

  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 500px;
    margin: auto;
  }

  .login_border {
    background-color: rgba(255,255,255,0.4);
    padding: 30px 30px 10vh;
    border-radius: 10px;
  }
  @media (max-height: 400px) {
    .login_box {
      top: 2px;
      transform: translate(-50%, 0%);
    }
  }

  .logo_wrap {
    width: 100%;
    .logo {
      width: 250px;
      margin: calc(10vh - 28px) auto;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }

  label {
    font-size: 15px;
    color: #414141;
  }

  .submit_btn {
    margin: 20px 0;
  }

  .warn_wrap {
    position: absolute;
    width: 40%;
    max-width: 470px;
    width: 100%;
    margin: 10px auto;
    font-family: 'Nanum Gothic', 'sans-serif';
    font-size: 15px;
    .warn_1 {
      color: firebrick;
      font-weight: bold;
      padding: 10px 0;
    }
    ol {
      padding-left: 20px;
      font-weight: bold;
      color: #616161;
      li {
        list-style: unset;
        padding: 5px 0;
      }
    }
  }
</style>
