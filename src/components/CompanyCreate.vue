<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/company">업체 리스트</router-link>
      <span>></span>
      <router-link to="/company/create">업체 생성</router-link>
    </div>

    <div class="container">
      <form class="m-auto" v-on:submit.prevent="create_organization">
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
            <input class="form-control" id="org_phone" name="org_phone" type="number" v-model="create_obj.phone"
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
            <input class="form-control" id="org_email" name="org_email" type="email" v-model="create_obj.email"
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
        <button type="submit" class="btn btn-primary col-12 mt-2 mb-2">업체 생성</button>
        <router-link to="/company">
          <button type="button" class="btn btn-dark col-12 mb-3">취소</button>
        </router-link>
      </form>
    </div>


  </div>
</template>

<script>
  export default {
    name: "company_create",
    data: () => ({
      // For organization create
      create_obj: []
    }),
    methods: {
      create_organization() {
        // Create an organization myself
        this.$validator.validateAll()
        if(confirm('업체를 생성하시겠습니까?')) {
          let axios = this.$axios
          let this_url = 'company/'
          let formData = new FormData()
          formData.append('manager', this.user_obj.id)
          formData.append('organization', this.access_obj.organization)
          formData.append('name', this.create_obj.name)
          if (this.create_obj.sub_name) {
            formData.append('sub_name', this.create_obj.sub_name)
          }
          if (this.create_obj.header) {
            formData.append('header', this.create_obj.header)
          }
          if (this.create_obj.address) {
            formData.append('address', this.create_obj.address)
          }
          if (this.create_obj.corp_num) {
            formData.append('corp_num', this.create_obj.corp_num)
          }
          if (this.create_obj.phone) {
            formData.append('phone', this.create_obj.phone)
          }
          if (this.create_obj.email) {
            formData.append('email', this.create_obj.email)
          }
          if (this.create_obj.desc) {
            formData.append('desc', this.create_obj.desc)
          }
          // console.log(this.create_obj.corp_num)
          // console.log('create formdata is? ', formData)
          axios.post(this.$store.state.endpoints.baseUrl + this_url, formData)
            .then(() => {
              alert('업체가 생성되었습니다.')
              this.$router.currentRoute.meta.protect_leave = 'no'
              this.$router.push({
                name: 'company_list'
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
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
        return access
      }
    }
  }
</script>

<style lang="scss">

</style>
