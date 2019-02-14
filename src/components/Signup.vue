<template>
  <div>
    <div class="main"></div>
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/signup">회원가입</router-link>
    </div>
    <!-- back to signin button input forms logo -->
    <div class="login_box container">
      <div class="login_border">

        <form class="login_form form-horizontal" id="LoginForm" @submit.prevent="sign_up">

          <div class="form-group block">
            <label for="id_username" class="col-sm-12 control-label">아이디*
              <div class="error_label" v-if="errors.has('username')">{{errors.first('id_username')}}</div>
            </label>
            <div class="col-sm-12">
              <input class="form-control"
                     required
                     v-model="account"
                     type="text"
                     placeholder="아이디를 입력하세요."
                     autofocus="autofocus"
                     maxlength="20"
                     v-validate="'required'"
                     name="id_username"
                     id="id_username">
            </div>
          </div>

          <div class="form-group row col-md-12 password_form block">
            <div class="col-md-6 password_area">
              <label for="id_password" class="control-label">비밀번호*
                <div class="error_label" v-if="errors.has('password')">{{errors.first('id_password')}}</div>
              </label>
              <div>
                <input class="form-control"
                       required
                       v-model="password"
                       type="password"
                       placeholder="비밀번호를 입력하세요."
                       maxlength="20"
                       v-validate="'required'"
                       name="id_password"
                       id="id_password">
              </div>
            </div>

            <div class="col-md-6 password_area">
              <label for="re_password" class="control-label">비밀번호 재입력*
                <div class="error_label" v-if="errors.has('re_pass')">{{errors.first('re_password')}}</div>
              </label>
              <div>
                <input class="form-control"
                       required
                       v-model="re_pass"
                       type="password"
                       placeholder="비밀번호를 재입력 하세요."
                       maxlength="20"
                       v-validate="'required'"
                       name="re_password"
                       id="re_password">
              </div>
            </div>
          </div>

          <div class="form-group block">
            <label for="full_name" class="col-sm-12 control-label">사용자 이름*
              <div class="error_label" v-if="errors.has('full_name')">{{errors.first('full_name')}}</div>
            </label>
            <div class="col-sm-12">
              <input class="form-control"
                     required
                     v-model="full_name"
                     type="text"
                     placeholder="이름을 입력하세요."
                     autofocus="autofocus"
                     maxlength="30"
                     name="full_name"
                     id="full_name">
            </div>
          </div>

          <div class="form-group block">
            <label for="email" class="col-sm-12 control-label">이메일*
              <div class="error_label" v-if="errors.has('email')">{{errors.first('email')}}</div>
            </label>
            <div class="col-sm-12">
              <input class="form-control"
                     required
                     v-model="email"
                     type="email"
                     placeholder="이메일을 입력하세요."
                     autofocus="autofocus"
                     maxlength="100"
                     v-validate="'email'"
                     name="email"
                     id="email">
            </div>
          </div>

          <!--
                    <div class="form-group block">
                      <label for="organization" class="col-sm-3 control-label">소속</label>
                      <div class="col-sm-12">
                        <input class="form-control"
                               v-model="organization"
                               type="text"
                               placeholder="소속회사를 입력하세요."
                               autofocus="autofocus"
                               maxlength="50"
                               id="organization">
                      </div>
                    </div>
          -->

          <div class="form-group block">
            <label for="phone" class="col-sm-12 control-label">전화번호
              <div class="error_label" v-if="errors.has('phone')">{{errors.first('phone')}}</div>
            </label>
            <div class="col-sm-12">
              <input class="form-control"
                     v-model="phone"
                     type="number"
                     placeholder="연락처를 입력하세요."
                     autofocus="autofocus"
                     maxlength="16"
                     v-validate="'numeric|max:16'"
                     name="phone"
                     id="phone">
            </div>
          </div>

          <div class="form-group block">
            <label for="access" class="col-sm-12 control-label">소속*</label>
            <div class="col-sm-12 pt-2 pb-2" id="access">
              <div class="form-check-inline">
                <input type="radio" id="access_marketer" name="access" v-model="access" value="-1"
                       class="form-check-input">
                <label for="access_marketer" class="form-check-label">마케터</label>
              </div>
              <div class="form-check-inline">
                <input type="radio" id="access_client" name="access" v-model="access" value="-2"
                       class="form-check-input">
                <label for="access_client" class="form-check-label">고객(클라이언트)</label>
              </div>
            </div>
            <div class="col-sm-12 pt-1">
              <select v-if="access == -1" name="select_org" id="select_org" class="form-control" v-model="organization">
                <option value="-1">조직을 선택하세요..</option>
                <option value="-2">조직을 생성하겠습니다.</option>
                <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
              </select>
              <select v-else-if="access == -2" name="select_company" id="select_company" class="form-control"
                      v-model="company">
                <option value="-1">업체를 선택하세요..</option>
                <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
          </div>

          <div class="form-group block">
            <div class="col-sm-offset-2 col click">
              <button type="submit" class="submit_btn btn btn-info col">회원가입</button>
              <button type="button" class="btn btn-dark col mt-2" @click="go_back">취소</button>
            </div>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'sign_up',
    data: () => ({
      account: '',
      password: '',
      re_pass: '',
      full_name: '',
      email: '',
      phone: '',
      access: 0,
      organization: -1,
      company: -1,
      select_options: [],
    }),
    methods: {
      sign_up() {
        this.$validator.validateAll()
        if (this.password !== this.re_pass) {
          alert('비밀번호를 확인해주세요.')
          document.getElementById('re_password').focus()
        } else if (this.access === 0 || this.organization === -1 && this.company === -1) {
          alert('소속을 확인해주세요.')
        } else {
          let axios = this.$axios
          ///////
          let formData = new FormData()
          formData.append('account', this.account)
          formData.append('password', this.password)
          formData.append('full_name', this.full_name)
          formData.append('email', this.email)
          formData.append('phone', this.phone)
          const baseURI = 'http://127.0.0.1:8000'  //'http://13.209.67.94/'
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }

          /* Do axios post */
          axios.post(`${baseURI}/user/`, formData, config)
            .then((response) => {
              let get_id = response.data.id
              let formData = new FormData()
              formData.append('user', response.data.id)
              formData.append('access', this.access)
              if (this.organization >= 0) {
                formData.append('organization', this.organization)
              }
              if (this.company !== -1) {
                formData.append('company', this.company)
              }
              return axios.patch(`${baseURI}/user_access/` + get_id + '/', formData, config)
            })
            .then((response) => {
              alert('회원가입 되었습니다.')
              this.$router.currentRoute.meta.protect_leave = 'no'
              this.$router.push({
                name: 'sign_in',
              })
            })
            .catch((error) => {
              console.log(error)
              if (error.response.data.account) {
                alert(error.response.data.account)
              } else {
                alert('전송 중 문제가 발생하였습니다. 다시시도 해주세요.')
              }
            })
          ///////////////

        }
      },
      go_back() {
        // if (confirm('취소하시겠습니까?')) {
        this.$router.push({
            name: 'sign_in',
          })
        // }
      }
    },
    watch: {
      access() {
        this.organization = -1
        this.company = -1
        if (this.access == -1) {
          let axios = this.$axios
          let this_url = 'organization/'
          axios.get(this.$store.state.endpoints.baseUrl + this_url)
            .then((response) => {
              this.select_options = response.data.results
            })
            .catch((error) => {
              console.log(error)
            })
        } else if (this.access == -2) {
          let axios = this.$axios
          let this_url = 'company/'
          axios.get(this.$store.state.endpoints.baseUrl + this_url)
            .then((response) => {
              this.select_options = response.data.results
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    mounted() {
      this.$parent.$data.header_flag = 0
    },
    destroyed() {
      this.$parent.$data.header_flag = 1
    }
  }
</script>

<style scoped lang="scss">

  .main {
    position: fixed;
    width: 100%;
    min-height: 100%;
    overflow: auto;
    top: 0;
    z-index: -1;
    background: linear-gradient(217deg, rgba(2, 0, 36, .8), rgba(255, 0, 0, 0) 70.71%),
    linear-gradient(127deg, rgba(141, 168, 185, .8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 212, 255, .8), rgba(0, 0, 255, 0) 70.71%);
  }

  .login_border {
    // max-height: 100vh;
    // min-height: 100vh;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 10vh 30px 30px;
    margin-bottom: 10vh;
    font-family: 'Nanum Gothic', 'sans-serif';
    // font-weight: bold;
    border-radius: 10px;
  }

  .password_form {
    padding-right: 0;
    margin-bottom: 0;
  }

  .password_area {
    padding: 0 0 15px 15px;
  }

  .click {
    padding-top: 20px;
  }

  .error_label {
    font-family: 'Nanums_regular', sans-serif;
    font-size: 14px;
    display: inline-block;
    padding: 0 10px;
    color: #ee5151;
    border-radius: 5px;
    margin: 0 15px;
    border: 1px solid #ee5151;
    box-sizing: border-box;
  }

</style>
