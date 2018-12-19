<template>
  <div class="main">
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
            <label for="id_username" class="col-sm-12 control-label">아이디*<div class="error_label" v-if="errors.has('username')">{{errors.first('id_username')}}</div></label>
            <div class="col-sm-12">
              <input class="form-control"
                     required
                     v-model="username"
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
              <label for="id_password" class="control-label">비밀번호*<div class="error_label" v-if="errors.has('password')">{{errors.first('id_password')}}</div></label>
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
              <label for="re_password" class="control-label">비밀번호 재입력*<div class="error_label" v-if="errors.has('re_pass')">{{errors.first('re_password')}}</div></label>
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
            <label for="full_name" class="col-sm-12 control-label">사용자 이름*<div class="error_label" v-if="errors.has('full_name')">{{errors.first('full_name')}}</div></label>
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
            <label for="email" class="col-sm-12 control-label">이메일*<div class="error_label" v-if="errors.has('email')">{{errors.first('email')}}</div></label>
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

          <div class="form-group block">
            <label for="phone" class="col-sm-12 control-label">전화번호<div class="error_label" v-if="errors.has('phone')">{{errors.first('phone')}}</div></label>
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
            <div class="col-sm-offset-2 col-sm-10 click">
              <button type="submit" class="submit_btn btn btn-info">회원가입</button>
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
    username: '',
    password: '',
    re_pass: '',
    full_name: '',
    email: '',
    organization: '',
    phone: ''
  }),
  methods: {
    sign_up () {
      this.$validator.validateAll()
      if (this.password !== this.re_pass) {
        alert('check the password')
        document.getElementById('re_password').focus()
      } else {
        let axios = this.$axios
        ///////
        let formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)
        formData.append('full_name', this.full_name)
        formData.append('email', this.email)
        formData.append('organization', this.organization)
        formData.append('phone', this.phone)
        const baseURI = 'http://127.0.0.1:8000'  //'http://13.209.67.94/'
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        /////////////

        /* Do axios post */
        axios.post(`${baseURI}/users/`, formData, config)
          .then((response) => {
            /*console.log(response)*/
            alert('회원가입 되었습니다.')
            this.$router.push({
              name: 'sign_in'
            })
          })
          .catch((e) => {
            console.error(e)
            alert('전송 중 문제가 발생하였습니다. 다시시도 해주세요.')
          })
        ///////////////

      }
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
    linear-gradient(127deg, rgba(141,168,185,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,212,255,.8), rgba(0,0,255,0) 70.71%);
  }

  .login_border {
    max-height: 100vh;
    min-height: 100vh;
    overflow: auto;
    background-color: rgba(255,255,255,0.4);
    padding: 10vh 30px 30vh;
    font-family: 'Nanum Gothic', 'sans-serif';
    // font-weight: bold;
  }

  .password_form {
    padding-right:0;
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
