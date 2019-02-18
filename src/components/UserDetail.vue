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

        <!-- Grade handler -->
        <label for="user_access" class="col-form-label-sm col-sm-3 mt-3">등급</label>
        <div class="col-sm-9 mt-sm-3 justify-content-between">
          <div v-if="content_obj.access == 1">
            <div class="form-control border-0 p-0" id="user_access">
              <div class="badge alert alert-primary">마케터</div>
              <button v-if="content_obj.user !== user_obj.id && !more_info.is_staff" type="button"
                      class="btn btn-outline-danger" @click.prevent="grade_set(-1)">강등
              </button>
              <div v-else class="btn btn-secondary disabled">변경 권한없음</div>
            </div>
          </div>
          <div v-else-if="content_obj.access == -1">
            <div class="form-control border-0 p-0" id="user_access">
              <div class="badge alert alert-danger">미인증 마케터</div>
              <button v-if="content_obj.user !== user_obj.id && !more_info.is_staff" type="button"
                      class="btn btn-outline-primary" @click.prevent="grade_set(1)">승인
              </button>
              <div v-else class="btn btn-secondary disabled">변경 권한없음</div>
            </div>
          </div>
          <div v-else-if="content_obj.access == 2">
            <div class="form-control border-0 p-0" id="user_access">
              <div class="badge alert alert-success">고객</div>
              <button v-if="content_obj.user !== user_obj.id" type="button" class="btn btn-outline-danger"
                      @click.prevent="grade_set(-2)">강등
              </button>
              <div v-else class="btn btn-secondary disabled">변경 권한없음</div>
            </div>
          </div>
          <div v-else-if="content_obj.access == -2">
            <div class="form-control border-0 p-0" id="user_access">
              <div class="badge alert alert-danger">미인증 고객</div>
              <button v-if="content_obj.user !== user_obj.id" type="button" class="btn btn-outline-success"
                      @click.prevent="grade_set(2)">승인
              </button>
              <div v-else class="btn btn-secondary disabled">변경 권한없음</div>
            </div>
          </div>
        </div>

        <label v-if="content_obj.organization" for="user_companion" class="col-form-label-sm col-sm-3 mt-3">소속</label>
        <label v-else-if="content_obj.company" for="user_companion" class="col-form-label-sm col-sm-3 mt-3">업체</label>
        <label v-else for="user_companion" class="col-form-label-sm col-sm-3 mt-3">업체</label>
        <div class="col-sm-9 mt-sm-3">
          <div v-if="content_obj.organization" class="form-control" id="user_companion">{{ content_obj.organization_name
            }}
          </div>
          <div v-else-if="content_obj.company" class="form-control" id="user_companion">{{ content_obj.company_name }}
          </div>
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

      <div v-if="content_obj.user !== user_obj.id">
        <!---->
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
          <button type="button" class="btn btn-outline-warning w-100 mb-2 mb-md-3" v-if="more_info.is_active"
                  @click.prevent="user_stall('stall')">유저 정지
          </button>
          <button type="button" class="btn btn-outline-primary w-100 mb-2 mb-md-3" v-else
                  @click.prevent="user_stall('restart')">정지 해제
          </button>
          <button type="button" class="btn btn-outline-danger w-100 mb-sm-2 mb-md-3" @click.prevent="user_delete">유저
            삭제
          </button>
        </div>

        <!---->
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
          <button type="button" class="btn btn-outline-warning w-100 mb-2 mb-md-3" v-if="more_info.is_active"
                  @click.prevent="user_stall('stall')">유저 정지
          </button>
          <button type="button" class="btn btn-outline-primary w-100 mb-2 mb-md-3" v-else
                  @click.prevent="user_stall('restart')">정지 해제
          </button>
          <button type="button" class="btn btn-outline-danger w-100 mb-sm-2 mb-md-3" @click.prevent="user_delete">유저
            삭제
          </button>
        </div>
      </div>
      <div v-else>
        <button type="button" class="btn btn-primary w-100 mb-2 mb-md-3" @click.prevent="edit_my_info">내 정보 수정하기
        </button>
      </div>

    </div>
    <!--container-->
  </div>
</template>

<script>
  export default {
    name: "user_detail",
    // created() {
    //   if (this.user_obj.id == this.$route.params.user_id) {
    //     // How to give before paramater to next? //
    //     // this.$router.currentRoute.meta.protect_leave = 'no'
    //     this.$router.before
    //     this.$router.push({
    //       name: 'my_info'
    //     })
    //   }
    // },
    data: () => ({
      content_obj: [],
      more_info: []
    }),
    mounted() {
      let axios = this.$axios
      let this_url = 'user_access/'
      if (this.$route.params.user_id) {
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
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    methods: {
      set_refresh() {
        let axios = this.$axios
        let this_url = 'user_access/'
        if (this.$route.params.user_id) {
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
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },
      grade_set(option) {
        let axios = this.$axios
        let this_url = 'user_access/'
        let formData = new FormData()
        if(confirm('유저등급을 변경하시겠습니까?')) {
          formData.append('access', option)
          axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
            .then(() => {
              this.set_refresh()
            })
            .catch((error) => {
              alert('등급변경 중 오류가 발생하였습니다.')
              console.log(error)
            })
        }
      },
      staff_set(option) {
        let axios = this.$axios
        let this_url = 'user/'
        let formData = new FormData()
        if (option == 'promote') {
          if (confirm('이 유저를 운영자로 승급 시키시겠습니까?')) {
            formData.append('is_staff', '1')
            axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
              .then(() => {
                this.set_refresh()
              })
              .catch((error) => {
                alert('승급 과정에서 오류가 발생하였습니다.')
                console.log(error)
              })
          }
        } else if (option == 'demote') {
          if (confirm('이 유저를 일반 유저로 강등 시키시겠습니까?')) {
            formData.append('is_staff', '0')
            axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
              .then(() => {
                this.set_refresh()
              })
              .catch((error) => {
                alert('강등 과정에서 오류가 발생하였습니다.')
                console.log(error)
              })
          }
        }
      },
      user_stall(option) {
        let axios = this.$axios
        let this_url = 'user/'
        let formData = new FormData()
        if (option == 'stall') {
          formData.append('is_active', '0')
          axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
            .then(() => {
              this.set_refresh()
            })
            .catch((error) => {
              console.log('User stall error = ', error)
            })
        } else if (option == 'restart') {
          formData.append('is_active', '1')
          axios.patch(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id + '/', formData)
            .then(() => {
              this.set_refresh()
            })
            .catch((error) => {
              console.log('User restart error = ', error)
            })
        }
      },
      user_delete() {
        let axios = this.$axios
        let this_url = 'user/'
        if (confirm('이 유저를 정말 삭제하시겠습니까?')) {
          axios.delete(this.$store.state.endpoints.baseUrl + this_url + this.more_info.id)
            .then(() => {
              alert('삭제되었습니다.')
              this.$router.push({
                name: 'user_list'
              })
            })
            .catch((error) => {
              alert('삭제 과정에서 오류가 발생하였습니다.')
              console.log(error)
            })
        }
      },
      edit_my_info() {
        if (confirm('정보수정 페이지로 이동할까요?')) {
          this.$router.push({
            name: 'my_info'
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

<style scoped>

</style>
