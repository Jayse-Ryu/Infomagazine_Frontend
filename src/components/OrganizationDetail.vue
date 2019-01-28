<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/organization">소속 리스트</router-link>
      <span>></span>
      <router-link :to="'/organization/detail/' + $route.params.organization_id">소속 정보</router-link>
    </div>

    <div v-if="original_manager == user_obj.id" class="container">
      <form class="m-auto" v-on:submit.prevent="check_organization">
        <div class="form-group row">

          <label for="org_id" class="col-form-label-sm col-sm-3 mt-3">소속 번호</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="form-control border-0" id="org_id">{{ content_obj.id }}</div>
          </div>

          <label for="org_manager" class="col-form-label-sm col-sm-3 mt-3">관리자</label>
          <div class="col-sm-9 mt-sm-3">
            <!--<div class="form-control" id="org_manager">{{ content_obj.manager_name }}</div>-->
            <select class="form-control" name="org_manager" id="org_manager" v-model="content_obj.manager">
              <option v-for="item in marketer" :value="item.user">{{ item.user_name }}</option>
            </select>
          </div>

          <label for="org_name" class="col-form-label-sm col-sm-3 mt-3">소속 이름*</label>
          <div class="col-sm-9 mt-sm-3">
            <!--<div class="error_label" v-if="errors.has('org_name')">{{errors.first('org_name')}}</div>-->
            <div class="error_label" v-if="errors.has('org_name')">이름은 필수 항목입니다.</div>
            <input type="text" class="form-control" id="org_name" name="org_name" v-model="content_obj.name"
                   required
                   placeholder="업체 이름을 입력하세요"
                   autofocus="autofocus"
                   maxlength="100"
                   v-validate="'required'">
          </div>

          <label for="org_sub" class="col-form-label-sm col-sm-3 mt-3">소속 상호명</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('org_sub')">{{errors.first('org_sub')}}</div>
            <input type="text" class="form-control" id="org_sub" name="org_sub" v-model="content_obj.sub_name"
                   placeholder="상호명을 입력하세요"
                   autofocus="autofocus"
                   maxlength="100">
          </div>

          <label for="org_header" class="col-form-label-sm col-sm-3 mt-3">대표자</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="org_header" v-model="content_obj.header"
                   placeholder="업체 대표를 입력하세요"
                   autofocus="autofocus"
                   maxlength="20">
          </div>

          <label for="org_address" class="col-form-label-sm col-sm-3 mt-3">주소</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="org_address" v-model="content_obj.address"
                   placeholder="주소를 입력하세요"
                   autofocus="autofocus"
                   maxlength="200">
          </div>

          <label for="org_corp" class="col-form-label-sm col-sm-3 mt-3">사업자번호</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="org_corp" v-model="content_obj.corp_num"
                   placeholder="사업자 번호를 입력하세요"
                   autofocus="autofocus"
                   maxlength="50">
          </div>

          <label for="org_phone" class="col-form-label-sm col-sm-3 mt-3">연락처</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('org_phone')">전화번호는 16자 이하입니다</div>
            <input type="number" class="form-control" id="org_phone" name="org_phone" v-model="content_obj.phone"
                   placeholder="연락처를 입력하세요"
                   autofocus="autofocus"
                   maxlength="16"
                   v-validate="'numeric|max:16'">
          </div>

          <label for="org_email" class="col-form-label-sm col-sm-3 mt-3">이메일</label>
          <div class="col-sm-9 mt-sm-3">
            <div class="error_label" v-if="errors.has('org_email')">이메일 형식을 확인하세요</div>
            <input type="email" class="form-control" id="org_email" name="org_email" v-model="content_obj.email"
                   placeholder="이메일을 입력하세요"
                   maxlength="50"
                   autofocus="autofocus"
                   v-validate="'email'">
          </div>

          <label for="org_desc" class="col-form-label-sm col-sm-3 mt-3">설명</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="org_desc" v-model="content_obj.desc"
                   placeholder="업체 설명을 적어주세요"
                   autofocus="autofocus"
                   maxlength="200">
          </div>

          <label for="org_create" class="col-form-label-sm col-sm-3 mt-3">생성일</label>
          <div v-if="content_obj.created_date" class="col-sm-9 mt-sm-3">
            <div type="text" class="form-control border-0" id="org_create">{{ (content_obj.created_date).substring(0, 10) }}</div>
          </div>
          <div v-else class="col-sm-9 mt-sm-3">
            <div type="text" class="form-control border-0">none</div>
          </div>

          <label for="org_update" class="col-form-label-sm col-sm-3 mt-3">수정일</label>
          <div v-if="content_obj.updated_date" class="col-sm-9 mt-sm-3">
            <div type="text" class="form-control border-0" id="org_update">{{ (content_obj.updated_date).substring(0, 10) }}</div>
          </div>
          <div v-else class="col-sm-9 mt-sm-3">
            <div type="text" class="form-control border-0">none</div>
          </div>

        </div>

        <div class="mt-1 mb-2">
          <button type="submit" class="btn btn-primary col">수정</button>
          <router-link to="/organization">
            <button class="btn btn-dark col mt-2">취소</button>
          </router-link>
        </div>

      </form>
    </div>

    <div v-else>
      nonono
    </div>

  </div>
</template>

<script>
  export default {
    name: "OrganizationDetail",
    data: () => ({
      page_id: 0,
      content_obj: [],
      marketer: [],
      original_manager: 0
    }),
    mounted() {
      // get id from url
      this.page_id = this.$route.params.organization_id * 1

      // if page int is default, push to list page
      if (this.page_id === 0) {
        this.$router.push({
          name: 'organization_list'
        })
      }
      // get object
      let axios = this.$axios
      let this_url = 'organization/'

      axios.get(this.$store.state.endpoints.baseUrl + this_url + this.page_id)
        .then((response) => {
          this.content_obj = response.data
          this.original_manager = response.data.manager
          return axios.get(this.$store.state.endpoints.baseUrl + 'user_access/' + '?organization=' + response.data.id )
        })
        .then((response) => {
          this.marketer = response.data.results
        })
        .catch((error) => {
          console.log(error)
        })
    },
    methods: {
      check_organization() {
        // Validate for make an organization
        this.$validator.validateAll()
        // or
        if(confirm('수정하시겠습니까?')) {
          if(this.content_obj.manager !== this.original_manager){
            if(confirm('관리자를 교체하시겠습니까?')) {
              this.patch_organization()
            } else {
              alert('수정이 취소되었습니다.')
            }
          } else {
            this.patch_organization()
          }
        }
      },
      patch_organization() {
        // Create an organization myself
        let axios = this.$axios
        let this_url = 'organization/'
        let formData = new FormData()
        formData.append('name', this.content_obj.name)
        formData.append('manager', this.content_obj.manager)
        if (this.content_obj.sub_name) {
          formData.append('sub_name', this.content_obj.sub_name)
        }
        if (this.content_obj.header) {
          formData.append('header', this.content_obj.header)
        }
        if (this.content_obj.address) {
          formData.append('address', this.content_obj.address)
        }
        if (this.content_obj.corp_num) {
          formData.append('corp_num', this.content_obj.corp_num)
        }
        if (this.content_obj.phone) {
          formData.append('phone', this.content_obj.phone)
        }
        if (this.content_obj.email) {
          formData.append('email', this.content_obj.email)
        }
        axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.page_id + '/', formData)
          .then((response) => {
            alert('수정되었습니다.')
            this.original_manager = this.content_obj.manager
            this.$store.dispatch('getAuthUser')
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
        // if (access.access === 1 || access.access === 2) {
        //   // console.log('If user have actual auth')
        //   this.$router.push({
        //     name: 'landing_list'
        //   })
        // }
        return access
      }
    }
  }
</script>

<style scoped>
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
