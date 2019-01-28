<template>
  <div class="main">

    <!-- If authUser(Login) is Marketer -->
    <div v-if="access_obj.access == -1">

      <!-- Do transition under the elements -->
      <transition name="fade_up">

        <!-- When switch(marketer buttons) not selected -->
        <div v-if="marketer_switch == 0" class="container text-center mt-md-5 mt-sm-3 mt-1 p-3">
          <h3><span class="text-info">{{ user_obj.full_name }}</span><span> 님은 현재 소속된 업체가 없습니다!</span></h3>
          <div class="desc_text pt-2 mb-3">
            <div v-if="access_obj.organization">
              <div>현재 가입 신청한 업체는</div>
              <div><span class="text-info font-weight-bold">{{ access_obj.organization_name }}</span> 입니다.</div>
            </div>
            <div v-else>
              <div>현재 가입 신청한 업체도 없습니다.</div>
            </div>
            <div>
              <div>마케터가 속하는 업체는</div>
              <div>다른 마케터들과 함께</div>
            </div>
            <div>
              <div>고객들을 관리하고,</div>
              <div>랜딩 페이지를 관리 할 수 있습니다.</div>
            </div>
            <div>
              <div>업체에 소속되거나</div>
              <div>자신의 업체를 생성하세요!</div>
            </div>
          </div>
        </div>

      </transition>

      <!-- Buttons are exist always -->
      <div class="container text-center mb-3">
        <button class="btn btn-primary mt-2" @click="marketer_signal(1)">생성하기</button>
        <button class="btn btn-info mt-2" @click="marketer_signal(2)">소속되기</button>
      </div>

      <!-- Follow buttons option -->
      <transition name="fade">

        <!-- Organization create myself -->
        <div v-if="marketer_switch == 1">
          <div class="container">

            <h4>소속업체 생성</h4>

            <form class="m-auto" v-on:submit.prevent="check_organization">
              <div class="form-group row">

                <label for="org_name" class="col-form-label-sm col-sm-3 mt-3">
                  <span>업체 이름*</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <div class="error_label" v-if="errors.has('org_name')">{{errors.first('org_name')}}</div>
                  <input class="form-control" id="org_name" name="org_name" type="text" v-model="create_obj.name"
                         required
                         placeholder="업체 이름을 입력하세요"
                         autofocus="autofocus"
                         maxlength="100"
                         v-validate="'required'">
                </div>

                <label for="org_sub" class="col-form-label-sm col-sm-3 mt-3">
                  <span>상호명</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <div class="error_label" v-if="errors.has('org_sub')">{{errors.first('org_sub')}}</div>
                  <input class="form-control" id="org_sub" name="org_sub" type="text" v-model="create_obj.sub_name"
                         placeholder="상호명을 입력하세요"
                         autofocus="autofocus"
                         maxlength="100"
                  >
                </div>

                <label for="org_header" class="col-form-label-sm col-sm-3 mt-3">
                  <span>대표자</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <input class="form-control" id="org_header" name="org_header" type="text" v-model="create_obj.header"
                         placeholder="업체 대표를 입력하세요"
                         autofocus="autofocus"
                         maxlength="20">
                </div>

                <label for="org_addr" class="col-form-label-sm col-sm-3 mt-3">
                  <span>주소</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <input class="form-control" id="org_addr" name="org_addr" type="text" v-model="create_obj.address"
                         placeholder="주소를 입력하세요"
                         autofocus="autofocus"
                         maxlength="200">
                </div>

                <label for="org_corp" class="col-form-label-sm col-sm-3 mt-3">
                  <span>사업자 번호</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <input class="form-control" id="org_corp" name="org_corp" type="text" v-model="create_obj.corp_num"
                         placeholder="사업자 번호를 입력하세요"
                         autofocus="autofocus"
                         maxlength="50">
                </div>

                <label for="org_phone" class="col-form-label-sm col-sm-3 mt-3">
                  <span>연락처</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <div class="error_label" v-if="errors.has('org_phone')">{{errors.first('org_phone')}}</div>
                  <input class="form-control" id="org_phone" name="org_phone" type="text" v-model="create_obj.phone"
                         placeholder="연락처를 입력하세요"
                         autofocus="autofocus"
                         maxlength="16"
                         v-validate="'numeric|max:16'">
                </div>

                <label for="org_email" class="col-form-label-sm col-sm-3 mt-3">
                  <span>이메일</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <div class="error_label" v-if="errors.has('org_email')">{{errors.first('org_email')}}</div>
                  <input class="form-control" id="org_email" name="org_email" type="text" v-model="create_obj.email"
                         placeholder="이메일을 입력하세요"
                         maxlength="50"
                         autofocus="autofocus"
                         v-validate="'email'">
                </div>

                <label for="org_desc" class="col-form-label-sm col-sm-3 mt-3">
                  <span>업체설명</span>
                </label>
                <div class="col-sm-9 mt-sm-3">
                  <input class="form-control" id="org_desc" type="text" v-model="create_obj.desc"
                         placeholder="업체 설명을 적어주세요"
                         autofocus="autofocus"
                         maxlength="200">
                </div>

              </div>
              <button type="submit" class="btn btn-primary col-12 mb-3">업체 생성</button>
            </form>

          </div>
        </div>

        <!-- Choose organization -->
        <div v-else-if="marketer_switch == 2">
          <div class="container text-center">
            <h4>소속업체 선택</h4>
            <select name="select_company" id="select_organization" class="form-control col-sm-6 m-auto"
                    v-model="selected">
              <option value="-1">업체를 선택하세요..</option>
              <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
            </select>
            <button class="btn btn-info col-sm-6 mt-2 mb-2" @click="change">변경하기</button>
          </div>
        </div>

      </transition>
    </div>
    <!-- marketer section finish -->


    <!-- If authUser is client -->
    <div v-if="access_obj.access == -2">

      <!-- Do transition under the elements -->
      <transition name="fade_up">

        <!-- When switch(marketer buttons) not selected -->
        <div v-if="client_switch != 2" class="container text-center mt-4 p-3">
          <h3><span class="text-info">{{ user_obj.full_name }}</span><span> 님은 현재 소속된 업체가 없습니다!</span>
          </h3>
          <div class="desc_text pt-2 mb-3">
            <div>
              <div>현재 가입 신청한 업체는</div>
              <div><span class="text-info font-weight-bold">{{ access_obj.company_name }}</span> 입니다.</div>
            </div>
            <div>
              <div>담당 업체에게</div>
              <div>승인을 재요청하거나,</div>
            </div>
            <div>
              <div>혹시 잘못 선택하셨다면</div>
              <div>업체를 변경하세요!</div>
            </div>
          </div>
        </div>

      </transition>

      <!-- Buttons are exist always -->
      <div class="container text-center mb-3">
        <button class="btn btn-primary mt-2" @click="client_signal(1)" value="1">승인요청</button>
        <button class="btn btn-info mt-2" @click="client_signal(2)" value="2">업체변경</button>
      </div>


      <!-- Follow buttons option -->
      <transition name="fade">

        <!-- Remind my request -->
        <div v-if="client_switch == 1">
          <div class="container text-center">
            <h4>승인요청이 재전송 되었습니다.</h4>
          </div>
        </div>

        <!-- Choose company -->
        <div v-else-if="client_switch == 2">
          <div class="container text-center">
            <h4>소속업체 선택</h4>
            <select name="select_company" id="select_company" class="form-control col-sm-6 m-auto"
                    v-model="selected">
              <option value="-1">업체를 선택하세요..</option>
              <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
            </select>
            <button class="btn btn-info col-sm-6 mt-2 mb-2" @click="change">변경하기</button>
          </div>
        </div>

      </transition>

    </div>
    <!-- client section finish -->

  </div>
</template>

<script>
  export default {
    name: "Gateway",
    // LogIn check
    created() {
      if (!this.$store.state.authUser) {
        alert('로그인이 필요합니다.')
        this.$router.push({
          name: 'sign_in'
        })
      }
    },
    data: () => ({
      // For organization create
      create_obj: [],
      // Selected storage
      selected: -1,
      select_options: [],
      // Get user button options
      marketer_switch: 0,
      client_switch: 0,
    }),
    methods: {
      // When user is marketer, get button value
      marketer_signal(request) {
        // If same request, the method turned to cancel method
        if (this.marketer_switch === request) {
          this.marketer_switch = 0
        } else {
          this.marketer_switch = request
        }
        // If change organization button clicked, get organizations
        if (this.marketer_switch === 2) {
          this.get_orgaznization()
        } else if (this.marketer_switch === 1) {
          // Else, If try to create organization,
          // Disengage from organization or not.
          // but let them proceed whatever user wanted
          if (this.access_obj.organization) {
            if (confirm('이미 가입 신청한 업체가 있습니다. 취소할까요?')) {
              // Disengage from Organization
              let axios = this.$axios
              let this_url = 'user_access/'
              let formData = new FormData()
              formData.append('organization', '')
              axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.user_obj.id + '/', formData)
                .then((response) => {
                  return this.$store.dispatch('getAuthUser')
                })
                .catch((error) => {
                  console.log(error)
                })
            } else {
              // Or just proceed without disengage
              alert('가입을 취소하지 않고 진행합니다.')
            }
          }
        }
      },
      // When user is client, get button value
      client_signal(request) {
        // If same request, the method turned to cancel method
        if (this.client_switch === request) {
          this.client_switch = 0
        } else {
          this.client_switch = request
        }
        // If change company button clicked, get companies
        if (this.client_switch === 2) {
          this.get_company()
        }
      },
      get_orgaznization() {
        // Get organizations for select options
        let axios = this.$axios
        let this_url = 'organization/'
        axios.get(this.$store.state.endpoints.baseUrl + this_url)
          .then((response) => {
            this.select_options = response.data.results
          })
      },
      get_company() {
        // Get companies for select options
        let axios = this.$axios
        let this_url = 'company/'
        axios.get(this.$store.state.endpoints.baseUrl + this_url)
          .then((response) => {
            this.select_options = response.data.results
          })
      },
      change() {
        // Change their organization or company access option
        if (this.selected != -1) {
          let access = this.access_obj.access
          // If the user is marketer
          if (access === -1) {
            if (this.selected === this.access_obj.organization) {
              alert('기존의 업체와 동일합니다. :)')
            } else {
              if (confirm('다시 인증대기상태로 돌아갑니다. 수정하시겠습니까?')) {
                let axios = this.$axios
                let this_url = 'user_access/'
                let formData = new FormData()
                formData.append('organization', this.selected)
                axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.user_obj.id + '/', formData)
                  .then((response) => {
                    alert('수정되었습니다.')
                    this.marketer_switch = 0
                    return this.$store.dispatch('getAuthUser')
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            }
          } else if (access === -2) {
            // If the user is client
            if (this.selected === this.access_obj.company) {
              alert('기존의 업체와 동일합니다. :)')
            } else {
              if (confirm('다시 인증대기상태로 돌아갑니다. 수정하시겠습니까?')) {
                let axios = this.$axios
                let this_url = 'user_access/'
                let formData = new FormData()
                formData.append('company', this.selected)
                axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.user_obj.id + '/', formData)
                  .then((response) => {
                    alert('수정되었습니다.')
                    this.client_switch = 0
                    return this.$store.dispatch('getAuthUser')
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            }
          }
        } else {
          // If select option was -1,
          // It means user didn't choose any option
          alert('업체를 선택하지 않으셨습니다.')
        }
      },
      check_organization() {
        // Validate for make an organization
        this.$validator.validateAll()
        // console.log(this.create_obj)
        if (this.access_obj.organization) {
          // If the user have organization request
          if (confirm('이미 가입신청한 업체가 있습니다. 취소하고 업체를 생성할까요?')) {
            this.create_organization()
          } else {
            alert('생성이 취소되었습니다.')
          }
        } else {
          // Just create
          this.create_organization()
        }

      },
      create_organization() {
        // Create an organization myself
        let axios = this.$axios
        let this_url = 'organization/'
        let formData = new FormData()
        formData.append('manager', this.user_obj.id)
        formData.append('name', this.create_obj.name)
        formData.append('sub_name', this.create_obj.sub_name)
        formData.append('header', this.create_obj.header)
        formData.append('address', this.create_obj.address)
        formData.append('corp_num', this.create_obj.corp_num)
        formData.append('phone', this.create_obj.phone)
        formData.append('email', this.create_obj.email)
        // console.log(this.create_obj.corp_num)
        // console.log('create formdata is? ', formData)
        axios.post(this.$store.state.endpoints.baseUrl + this_url, formData)
          .then((response) => {
            // If post success, change my organization number and access type
            formData = new FormData()
            formData.append('organization', response.data.id)
            formData.append('access', '1')
            return axios.patch(this.$store.state.endpoints.baseUrl + 'user_access/' + this.user_obj.id + '/', formData)
          })
          .then((response) => {
            // Done! Go to langind list.
            alert('업체가 생성되었습니다!')
            this.$router.push({
              name: 'landing_list'
            })
            return this.$store.dispatch('getAuthUser')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    },
    computed: {
      user_obj() {
        // Get user information
        let user = this.$store.state.authUser
        return user
      },
      access_obj() {
        // Get access information the user
        let access = this.$store.state.userAccess
        if (access.access === 1 || access.access === 2) {
          // console.log('If user have actual auth')
          this.$router.push({
            name: 'landing_list'
          })
        }
        return access
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all 200ms ease-out;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    position: absolute;
    width: 100%;
    margin: auto;
    // transform: translateY(10px);
  }

  .fade_up-enter-active, .fade_up-leave-active {
    transition: all 200ms ease-out;
  }

  .fade_up-leave-active {
    transition: none;
  }

  .fade_up-enter, .fade_up-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    margin: auto;
    transform: translateY(-15px);
  }

  .desc_text {
    font-size: 16px;

    div {
      div {
        display: inline-block;
        padding: 5px 0;
        margin: auto;
      }
    }
  }

  .error_label {
    font-family: 'Nanums_regular', sans-serif;
    font-size: 14px;
    display: inline-block;
    padding: 1px 5px;
    color: #ee5151;
    border-radius: 5px;
    margin: 5px 0;
    border: 1px solid #ee5151;
    box-sizing: border-box;
  }

</style>
