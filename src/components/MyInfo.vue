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
      <form class="m-auto" v-on:submit.prevent="check">
        <div class="form-group row">

          <label for="my_id" class="col-form-label-sm col-sm-3 mt-3">아이디</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="form-control border-0" id="my_id">{{ content_obj.account }}</div>
          </div>

          <label for="my_pw" class="col-form-label-sm col-sm-3 mt-3">비밀번호</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="pass_error">비밀번호를 확인하세요.</div>
            <div class="error_label" v-if="errors.has('password')">{{errors.first('id_password')}}</div>
            <input type="password" class="form-control" id="my_pw" v-model="password"
                   maxlength="20"
                   name="id_password"
                   required/>
          </div>

          <label for="my_pw2" class="col-form-label-sm col-sm-3 mt-3">비밀번호 재확인</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('password')">{{errors.first('re_password')}}</div>
            <input type="password" class="form-control" id="my_pw2" v-model="re_password"
                   maxlength="20"
                   name="re_password"
                   required/>
          </div>

          <label for="my_name" class="col-form-label-sm col-sm-3 mt-3">이름</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('full_name')">{{errors.first('full_name')}}</div>
            <input type="text" id="my_name" class="form-control" v-model="content_obj.full_name"
                   v-validate="'required'"
                   name="full_name"
                   maxlength="30"
                   autofocus="autofocus"
                   required/>
          </div>

          <label for="my_email" class="col-form-label-sm col-sm-3 mt-3">이메일</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('email')">{{errors.first('email')}}</div>
            <input type="email" id="my_email" class="form-control" v-model="content_obj.email"
                   v-validate="'email'"
                   name="email"
                   autofocus="autofocus"
                   maxlength="100"
                   required/>
          </div>

          <label for="my_phone" class="col-form-label-sm col-sm-3 mt-3">전화</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('phone')">{{errors.first('phone')}}</div>
            <input type="tel" id="my_phone" class="form-control" v-model="content_obj.phone"
                   v-validate="'numeric|max:16'"
                   name="phone"
                   autofocus="autofocus"
                   maxlength="16"/>
          </div>

          <label for="my_comp" class="col-form-label-sm col-sm-3 mt-3">소속</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" id="my_comp" class="form-control" v-model="content_obj.organization"
                   autofocus="autofocus"
                   maxlength="50"
                   name="organization"/>
          </div>

          <label for="my_join" class="col-form-label-sm col-sm-3 mt-3">가입일</label>
          <div class="col-sm-9 mt-sm-3">
            <div v-if="content_obj.created_date" type="text" id="my_join" class="form-control border-0">{{ (content_obj.created_date).substring(0, 10) }}</div>
            <div v-else type="text" class="form-control border-0">{{ content_obj.created_date }}</div>
          </div>

        </div>

        <button type="submit" class="btn btn-primary col-12">수정</button>
      </form>
      <button type="button" class="btn btn-danger mt-2 col-12" @click="bye">탈퇴</button>
      <router-link to="/landing">
        <button type="button" class="btn btn-dark col-12 mt-2">취소</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "my_info",
  data: () => ({
    content_obj: [],
    password: '',
    re_password: '',
    pass_error: false,
  }),
  mounted () {
    let axios = this.$axios
    let this_url = 'user/'
    let decode = this.$jwt_decode
    let decoder = decode(this.$store.state.jwt)

    axios.get(this.$store.state.endpoints.baseUrl + this_url + decoder.user_id)
      .then((response) => {
        // Calculation for page_max
        this.content_obj = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    check() {
      // check validate first
      this.$validator.validateAll()
      if (this.password !== '' || this.re_password !== '') {
        if (this.password !== this.re_password) {
          this.pass_error = true
          alert('비밀번호를 확인하세요.')
        } else {
          this.pass_error = false
          this.content_obj.password = this.password
          this.put()
        }
      } else if (this.password === '' && this.re_password === '') {
        this.pass_error = true
        alert('비밀번호는 필수 항목입니다.')
      }
    },
    put() {
      // Are you sure?
      if(confirm('정보를 수정하시겠습니까?')) {
        let decode = this.$jwt_decode
        let decoder = decode(this.$store.state.jwt)
        if (decoder.user_id) {
          let axios = this.$axios
          let this_url = 'user/'
          axios.patch(this.$store.state.endpoints.baseUrl + this_url + decoder.user_id + '/', this.content_obj)
            .then((response) => {
              // Calculation for page_max
              alert('수정되었습니다.')
              this.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    // patch() {
    //   // Are you sure?
    //   if(confirm('정보를 수정하시겠습니까?')) {
    //     let axios = this.$axios
    //     let this_url = 'user/'
    //
    //     axios.post(this.$store.state.endpoints.baseUrl + this_url, {
    //       data: this.content_obj,
    //       _method: 'patch'
    //     })
    //       .then((response) => {
    //         // Calculation for page_max
    //         console.log(response)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }
    // }
    bye() {
      if (confirm('정말 탈퇴하시겠습니까?')) {
        let decode = this.$jwt_decode
        let decoder = decode(this.$store.state.jwt)
        if (decoder.user_id) {
          let axios = this.$axios
          let this_url = 'user/'
          axios.delete(this.$store.state.endpoints.baseUrl + this_url + decoder.user_id + '/')
            .then((response) => {
              // Calculation for page_max
              alert('탈퇴되었습니다.')
              this.$store.commit('removeToken')
              this.$router.push({
                name: 'sign_in'
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }
  }
}
</script>

<style scoped>
  .error_label {
    font-family: 'Nanums_regular', sans-serif;
    font-size: 14px;
    display: inline-block;
    padding: 1px 10px;
    color: #ee5151;
    border-radius: 5px;
    margin: 4px 0;
    border: 1px solid #ee5151;
    box-sizing: border-box;
  }
</style>
