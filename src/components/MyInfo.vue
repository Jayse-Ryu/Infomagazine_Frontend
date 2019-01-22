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

          <!--
                    <label for="my_comp" class="col-form-label-sm col-sm-3 mt-3">소속</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="text" id="my_comp" class="form-control" v-model="content_obj.organization"
                             autofocus="autofocus"
                             maxlength="50"
                             name="organization"/>
                    </div>
          -->

          <label class="col-form-label-sm col-sm-3 mt-3" for="select_org">소속</label>
          <!--<div class="col-sm-9 pt-2 pb-2" id="access">
            <div class="form-check-inline">
              <input type="radio" id="access_marketer" name="access" v-model="access_obj.access" value="0"
                     class="form-check-input">
              <label for="access_marketer" class="form-check-label">마케터</label>
            </div>
            <div class="form-check-inline">
              <input type="radio" id="access_client" name="access" v-model="access_obj.access" value="1"
                     class="form-check-input">
              <label for="access_client" class="form-check-label">고객(클라이언트)</label>
            </div>
          </div>-->
          <div class="col-sm-9 mt-sm-3">
            <select v-if="access_obj.access == 1 || access_obj.access == -1" name="select_org" id="select_org"
                    class="form-control"
                    v-model="access_obj.organization">
              <option value="-1">조직을 선택하세요..</option>
              <!--<option value="-2">조직을 생성하겠습니다.</option>-->
              <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
            </select>
            <select v-else-if="access_obj.access == 2 || access_obj.access == -2" name="select_company"
                    id="select_company" class="form-control"
                    v-model="access_obj.company">
              <option value="-1">업체를 선택하세요..</option>
              <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
            </select>
          </div>


          <label for="my_join" class="col-form-label-sm col-sm-3 mt-3">가입일</label>
          <div class="col-sm-9 mt-sm-3">
            <div v-if="content_obj.created_date" type="text" id="my_join" class="form-control border-0">{{
              (content_obj.created_date).substring(0, 10) }}
            </div>
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
      access_obj: [],
      original_org: 0,
      password: '',
      re_password: '',
      pass_error: false,
      select_options: [],
    }),
    mounted() {
      let axios = this.$axios
      let this_url = 'user/'
      let decode = this.$jwt_decode
      let decoder = decode(this.$store.state.jwt)

      axios.get(this.$store.state.endpoints.baseUrl + this_url + decoder.user_id)
        .then((response) => {
          // Set user data
          this.content_obj = response.data
          // Get user access data
          this_url = 'user_access/'
          return axios.get(this.$store.state.endpoints.baseUrl + this_url + response.data.id + '/')
        })
        .then((response) => {
          // Set access data
          this.access_obj = response.data
          // Get organization or company data
          let choice = 'ready/'
          if (response.data.access === 1 || response.data.access === -1) {
            choice = 'organization/'
            if (response.data.organization) {
              this.original_org = response.data.organization
            }
          } else if (response.data.access === 2 || response.data.access === -2) {
            choice = 'company/'
            if (response.data.company) {
              this.original_org = response.data.company
            }
          }
          return axios.get(this.$store.state.endpoints.baseUrl + choice)
        })
        .then((response) => {
          this.select_options = response.data.results
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
        if (confirm('정보를 수정하시겠습니까?')) {
          let decode = this.$jwt_decode
          let decoder = decode(this.$store.state.jwt)
          if (decoder.user_id) {
            let axios = this.$axios
            let this_url = 'user/'
            axios.patch(this.$store.state.endpoints.baseUrl + this_url + decoder.user_id + '/', this.content_obj)
              .then((response) => {
                let formData = new FormData()
                formData.append('access', this.access_obj.access)
                if (this.access_obj.access === 1 || this.access_obj.access === -1) {
                  if (this.access_obj.organization !== null && this.access_obj.organization > 0) {
                    if (this.access_obj.organization === this.original_org) {
                      formData.append('organization', this.access_obj.organization)
                    } else {
                      formData.append('access', '-1')
                      formData.append('organization', this.access_obj.organization)
                    }
                  }
                } else if (this.access_obj.access === 2 || this.access_obj.access === -2) {
                  if (this.access_obj.company !== null && this.access_obj.company > 0) {
                    if (this.access_obj.company === this.original_org) {
                      formData.append('company', this.access_obj.company)
                    } else {
                      formData.append('access', '-2')
                      formData.append('company', this.access_obj.company)
                    }
                  }
                }
                return axios.patch(this.$store.state.endpoints.baseUrl + 'user_access/' + decoder.user_id + '/', formData)
              })
              .then((response) => {
                console.log(response)
                alert('수정되었습니다. 다시 로그인 하세요.')
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
      },
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
    },
    // watch: {
    //   access_obj(){
    //     if (this.access_obj.access == 0) {
    //       console.log('marketer')
    //     } else if (this.access_obj.access == 1){
    //       console.log('client')
    //     }
    //   }
    // }
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
