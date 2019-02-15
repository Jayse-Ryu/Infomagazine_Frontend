<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/users">유저 리스트</router-link>
      <span>></span>
      <router-link to="/users/detail/{{}}">유저 정보</router-link>
    </div>

    <div class="container pb-4">
      <div class="form-group row">

        <label for="user_num" class="col-form-label-sm col-sm-3 mt-3">번호</label>
        <div class="col-sm-9 mt-sm-3">
          <div class="form-control" id="user_num">{{ content_obj.user }}</div>
        </div>

        <label for="user_id" class="col-form-label-sm col-sm-3 mt-3">아이디</label>
        <div class="col-sm-9 mt-sm-3">
          <div class="form-control" id="user_id">{{ content_obj.account }}</div>
        </div>

        <label for="user_name" class="col-form-label-sm col-sm-3 mt-3">이름</label>
        <div class="col-sm-9 mt-sm-3">
          <div class="form-control" id="user_name">{{ content_obj.user_name }}</div>
        </div>

        <label for="user_phone" class="col-form-label-sm col-sm-3 mt-3">연락처</label>
        <div class="col-sm-9 mt-sm-3">
          <div v-if="content_obj.phone" class="form-control" id="user_phone">{{ content_obj.phone }}</div>
          <div v-else class="form-control">없음</div>
        </div>

        <label for="user_mail" class="col-form-label-sm col-sm-3 mt-3">메일</label>
        <div class="col-sm-9 mt-sm-3">
          <div class="form-control" id="user_mail">{{ content_obj.email }}</div>
        </div>

        <label for="user_access" class="col-form-label-sm col-sm-3 mt-3">등급</label>
        <div class="col-sm-9 mt-sm-3">
          <div v-if="content_obj.access == 1" class="form-control alert-primary" id="user_access">
            <div class="alert-primary">마케터</div>
          </div>
          <div v-else-if="content_obj.access == -1" class="form-control alert-danger" id="user_access">
            <div class="alert-danger">미인증 마케터</div>
          </div>
          <div v-else-if="content_obj.access == 2" class="form-control alert-success" id="user_access">
            <div class="alert-success">고객</div>
          </div>
          <div v-else-if="content_obj.access == -2" class="form-control alert-danger" id="user_access">
            <div class="alert-danger">미인증 고객</div>
          </div>
        </div>

        <label v-if="content_obj.organization" for="user_companion" class="col-form-label-sm col-sm-3 mt-3">소속</label>
        <label v-else-if="content_obj.company" for="user_companion" class="col-form-label-sm col-sm-3 mt-3">업체</label>
        <label v-else for="user_companion" class="col-form-label-sm col-sm-3 mt-3">업체</label>
        <div class="col-sm-9 mt-sm-3">
          <div v-if="content_obj.organization" class="form-control" id="user_companion">{{ content_obj.organization_name }}</div>
          <div v-else-if="content_obj.company" class="form-control" id="user_companion">{{ content_obj.company_name }}</div>
          <div v-else class="form-control" id="user_companion">생성예정</div>
        </div>

        <label for="my_join" class="col-form-label-sm col-sm-3 mt-3">가입일</label>
        <div class="col-sm-9 mt-sm-3">
          <div v-if="content_obj.created_date" type="text" id="my_join" class="form-control border-0">
            {{ (content_obj.created_date).substring(0, 10) }}
          </div>
          <div v-else type="text" class="form-control border-0">{{ content_obj.created_date }}</div>
        </div>

      </div>

      <!-- I'm a superuser and this user is manager side -->
      <div class="form-group row" v-if="user_obj.is_superuser && Math.abs(content_obj.access) == 1">
        <label for="user_super_set" class="col-form-label-sm col-sm-3 mt-3">권한관리</label>

        <!-- if this user is 'NOT' staff -->
        <div v-if="!more_info.is_staff" class="col-sm-9 mt-sm-3">
          <div id="user_super_set">
            <button type="button" class="btn btn-info w-100" @click.prevent="staff_set('promote')">운영자로 승급</button>
          </div>
        </div>

        <!-- Or if this user 'IS' staff -->
        <div v-else class="col-sm-9 mt-sm-3">
          <div id="user_super_set">
            <button type="button" class="btn btn-danger w-100" @click.prevent="staff_set('demote')">운영자 자격 박탈</button>
          </div>
        </div>

      </div>

      <div v-if="user_obj.is_superuser">
        <button class="btn btn-outline-warning w-100 mb-sm-2 mb-md-3" v-if="more_info.is_active" @click.prevent="user_stall('stall')">유저 정지</button>
        <button class="btn btn-outline-primary w-100 mb-sm-2 mb-md-3" v-else @click.prevent="user_stall('restart')">정지 해제</button>
        <button class="btn btn-outline-danger w-100 mb-sm-2 mb-md-3" @click.prevent="user_delete">유저 삭제</button>
      </div>


      <!-- I'm a staff and this user is manager side -->
      <div class="form-group row" v-else-if="user_obj.is_staff && Math.abs(content_obj.access) == 1">

        <label for="user_super_set" class="col-form-label-sm col-sm-3 mt-3">권한관리</label>

        <!-- if this user is 'NOT' staff -->
        <div v-if="!more_info.is_staff" class="col-sm-9 mt-sm-3">
          <div id="user_super_set">
            <button type="button" class="btn btn-info w-100" @click.prevent="staff_set('promote')">운영자로 승급</button>
          </div>
        </div>

        <!-- Or if this user 'IS' staff -->
        <div v-else class="col-sm-9 mt-sm-3">
          <div class="alert alert-danger col-12">이 유저는 운영자입니다.</div>
        </div>
      </div>

      <div v-if="!user_obj.is_superuser && user_obj.is_staff && !more_info.is_staff">
        <button class="btn btn-outline-warning w-100 mb-sm-2 mb-md-3" v-if="more_info.is_active" @click.prevent="user_stall('stall')">유저 정지</button>
        <button class="btn btn-outline-primary w-100 mb-sm-2 mb-md-3" v-else @click.prevent="user_stall('restart')">정지 해제</button>
        <button class="btn btn-outline-danger w-100 mb-sm-2 mb-md-3" @click.prevent="user_delete">유저 삭제</button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "user_detail",
    created() {
      if (this.user_obj.id == this.$route.params.user_id) {
        this.$router.push({
          name: 'my_info'
        })
      }
    },
    data: () => ({
      content_obj: [],
      more_info: []
    }),
    mounted() {
      let axios = this.$axios
      let this_url = 'user_access/'
      if(this.$route.params.user_id) {
        axios.get(this.$store.state.endpoints.baseUrl + this_url + this.$route.params.user_id + '/')
          .then((response) => {
            this.content_obj = response.data
            this_url = 'user/'
            return axios.get(this.$store.state.endpoints.baseUrl + this_url + this.$route.params.user_id + '/')
          })
          .then((response) => {
            let res = response.data
            delete res.password
            this.more_info = res
            console.log(this.more_info)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    methods: {
      staff_set: function(option) {
        let axios = this.$axios
        let this_url = 'user/'
        if(option == 'promote') {
          console.log('promote!')
        } else if (option == 'demote') {
          console.log('demote!')
        }
      },
      user_stall: function(option) {
        let axios = this.$axios
        let this_url = 'user/'
        let formData = new FormData()
        console.log(this.$route.params.user_id)
        if (option == 'stall') {
          formData.append('is_active', '0')
          axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
            .then((response) => {
              console.log('active stop', response)
            })
            .catch((error) => {
              console.log('User stall error = ', error)
            })
        } else if (option == 'restart') {
          formData.append('is_active', '1')
          axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
            .then((response) => {
              console.log('active start', response)
            })
            .catch((error) => {
              console.log('User restart error = ', error)
            })
        }
      },
      user_delete: function() {
        let axios = this.$axios
        let this_url = 'user/'
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

<style scoped>

</style>
