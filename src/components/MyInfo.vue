<template>
  <div class="main">

    <div class="main">
      <div class="text_navigation">
        <router-link to="/">로그인</router-link>
        <span>></span>
        <router-link to="/myinfo">내 정보</router-link>
      </div>
    </div>

    <div class="container">
      <form class="m-auto">
        <div class="form-group row">

          <label for="my_id" class="col-form-label-sm col-sm-3 mt-3">아이디</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="form-control border-0" id="my_id">{{ id }}</div>
          </div>

          <label for="my_pw" class="col-form-label-sm col-sm-3 mt-3">비밀번호</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="my_pw" />
          </div>

          <label for="my_pw2" class="col-form-label-sm col-sm-3 mt-3">비밀번호 재확인</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="my_pw2" />
          </div>

          <label for="my_name" class="col-form-label-sm col-sm-3 mt-3">이름</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" id="my_name" class="form-control" v-model="name"/>
          </div>

          <label for="my_email" class="col-form-label-sm col-sm-3 mt-3">이메일</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="email" id="my_email" class="form-control" v-model="email" />
          </div>

          <label for="my_phone" class="col-form-label-sm col-sm-3 mt-3">전화</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="tel" id="my_phone" class="form-control" v-model="phone" />
          </div>

          <label for="my_comp" class="col-form-label-sm col-sm-3 mt-3">소속</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" id="my_comp" class="form-control" v-model="org" />
          </div>

          <label for="my_join" class="col-form-label-sm col-sm-3 mt-3">가입일</label>
          <div class="col-sm-9 mt-sm-3">
            <div type="text" id="my_join" class="form-control border-0">{{ creda }}</div>
          </div>

        </div>

        <button type="submit" class="btn btn-primary col-12">수정</button>
        <router-link to="/landing">
          <button type="button" class="btn btn-dark col-12 mt-2">취소</button>
        </router-link>
      </form>
    </div>
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
  mounted () {
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
      url: '/user/',
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
        this.id = this.$store.state.authUser.account
        this.name = this.$store.state.authUser.full_name
        this.email = this.$store.state.authUser.email
        this.phone = this.$store.state.authUser.phone
        this.org = this.$store.state.authUser.organization
        this.creda = this.$store.state.authUser.created_date.substr(0, 10)
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
</script>

<style scoped>

</style>
