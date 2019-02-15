<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/users">유저 리스트</router-link>
    </div>

    <form class="container m-auto justify-content-between row" v-on:submit.prevent="search(temp_option, temp_text)">
      <!--<router-link to="/users/create" class="btn-sm h-75 btn-primary p-1 col-md-1 col-sm-2 col text-center">생성</router-link>-->
      <div class="form-group search_group text-center ml-auto p-0 col-sm-12 col-md-4">
        <select class="search_option" id="src_gbn" v-model="temp_option">
          <option value="0" selected>검색 옵션</option>
          <option value="1">이름</option>
          <option value="2">계정</option>
        </select>
        <input type="text" class="search_text" v-model="temp_text" placeholder="검색">
        <button type="submit" class="search_btn">
          <img src="../assets/common/search.png"/>
        </button>
      </div>
    </form>

    <div class="container">

      <div v-if="window_width > 1000" class="list_area">
        <div class="list_header">
          <div class="list-group-item  d-inline-flex justify-content-between p-1 pt-2 pb-2 text-center"
               style="border-radius: 0; border-bottom: 0; width:100%;">
            <div class="col-1 p-0">번호</div>
            <div class="col-2 p-0text-center">계정</div>
            <div class="col-3 p-0 text-center">이름</div>
            <div class="col-2 p-0 text-center">등급</div>
            <!--<div class="col-1 text-center">활성상태</div>-->
            <div class="col-2 p-0 board_centre">연락처</div>
            <div class="col-2 p-0 board_centre">생성일</div>
          </div>
        </div>
        <ul class="list_body list-group list-group-flush col-12 pr-0 text-center">
          <li v-if="content_obj.length === 0"
              class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
            <div class="col-12 text-center">데이터가 존재하지 않습니다.</div>
          </li>
          <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
              v-for="content in content_obj">
            <div class="col-1 p-0">{{ content.user }}</div>
            <div class="col-2 p-0 text-center">
              <router-link :to="'/users/detail/' + content.user">{{ content.account }}</router-link>
            </div>
            <div class="col-3 p-0 text-center">
              <router-link :to="'/users/detail/' + content.user">{{ content.user_name }}</router-link>
            </div>
            <div v-if="user_obj.id == content.user" class="col-2 p-0 text-center">
              <div class="badge badge-dark">본인</div>
            </div>
            <div v-else-if="content.access == 1" class="col-2 p-0 text-center">
              <div class="badge badge-primary">마케터</div>
            </div>
            <div v-else-if="content.access == -1" class="col-2 p-0 text-center">
              <div class="badge badge-danger">미인증 마케터</div>
            </div>
            <div v-else-if="content.access == 2" class="col-2 p-0 text-center">
              <div class="badge badge-success">고객</div>
            </div>
            <div v-else-if="content.access == -2" class="col-2 p-0 text-center">
              <div class="badge badge-danger">미인증 고객</div>
            </div>
            <!--<div class="col-1 text-center">{{ content.is_active }}</div>-->
            <div v-if="content.phone" class="col-2 p-0 board_centre">{{ content.phone }}</div>
            <div v-else class="col-2 p-0 board_centre">없음</div>
            <div class="col-2 p-0 board_centre">{{ (content.created_date).substring(0, 10) }}</div>
          </li>
        </ul>
      </div>

      <div v-else class="list_area">
        <div class="list_header">
          <div class="list-group-item  d-inline-flex justify-content-between p-1 pt-2 pb-2"
               style="border-radius: 0; border-bottom: 0; width:100%;">
            <div class="col-2 p-0">번호</div>
            <div class="col-3 p-0 text-center">계정</div>
            <div class="col-3 p-0 text-center">이름</div>
            <div class="col-4 p-0 board_centre">연락처</div>
          </div>
        </div>
        <ul class="list_body list-group list-group-flush col-12 pr-0">
          <li v-if="content_obj.length === 0"
              class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
            <div class="col-12 text-center">데이터가 존재하지 않습니다.</div>
          </li>
          <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
              v-for="content in content_obj">
            <div class="col-2 p-0">{{ content.user }}</div>
            <div class="col-3 p-0 text-center">
              <router-link :to="'/users/detail/' + content.user">{{ content.account }}</router-link>
            </div>
            <div class="col-3 p-0 text-center">
              <router-link :to="'/users/detail/' + content.user">{{ content.user_name }}</router-link>
            </div>
            <div v-if="content.phone" class="col-4 p-0 board_centre">{{ content.phone }}</div>
            <div v-else class="col-4 p-0 board_centre">없음</div>
          </li>
        </ul>
      </div>

    </div>
    <!-- Container end -->

    <paginate class="pagination"
              v-model="page_current"
              :page-count="page_max"
              :page-range="5"
              :margin-pages="1"
              :click-handler="pagination"
              :prev-text="'<'"
              :next-text="'>'"
              :container-class="'page-item'"
              :page-class="'page-link'"
              :prev-class="'page-link prev'"
              :next-class="'page-link next'"
              :active-class="'active'"
              :disabled-class="'disabled'">
    </paginate>

  </div>
</template>

<script>
  export default {
    name: "user_list",
    data: () => ({
      // Get width
      window_width: window.innerWidth,
      // Page = options, contents
      page_current: 1,
      page_max: 0,
      page_chunk: 10,
      content_obj: [],
      temp_option: 0,
      temp_text: '',
      search_option: 0,
      search_text: '',
    }),
    methods: {
      pagination: function (pageNum) {
        // when page is first, max ~ max-(chunk*current)+1
        // when page is max, max-(chunk*(current-1)) ~ 1
        // when page is middle, max-(chunk*(current-1)) ~ max-(chunk*current)+1
        let offset = (pageNum - 1) * this.page_chunk
        this.calling_all_unit(offset)
      },
      search: function (option, text) {
        if (option !== 0 || text !== '') {
          let option_val
          this.page_current = 1
          if (option === '1') {
            option_val = 'name'
          } else if (option === '2') {
            option_val = 'account'
          } else {
            // console.log('Option not catched')
            alert('검색 옵션이 없습니다.')
          }
          this.search_option = option_val
          this.search_text = text
          this.calling_all_unit()
        } else if (text == '') {
          this.search_option = '0'
        }
      },
      calling_all_unit: function (page) {
        // Calling landings with new values
        let axios = this.$axios
        let this_url = 'user_access/'
        let offset = page
        let def = ''
        // if (!this.user_obj.is_staff && this.access_obj.access == 1) {
        //   def = '&organization=' + this.access_obj.organization
        // }
        //
        //
        // axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text + def)
        //   .then((response) => {
        //     // Calculation for page_max
        //     if(response.data.count % this.page_chunk === 0) {
        //       this.page_max = Math.floor(response.data.count/this.page_chunk)
        //     } else {
        //       this.page_max = Math.floor(response.data.count/this.page_chunk) + 1
        //     }
        //     this.content_obj = response.data.results
        //   })
        if (this.user_obj.is_staff) {
          // collect all
        } else if (this.access_obj.access == 1) {
          // organization == access
          def = '&organization=' + this.access_obj.organization
        } else if (this.access_obj.access == 2) {
          // company === company
          def = '&company=' + this.access_obj.company
        } else {
          // Emergency break
          def = '&organization=f'
        }
        axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&sort=1' + '&' + this.search_option + '=' + this.search_text + def)
          .then((response) => {
            // console.log('access response = ', response)
            if (response.data.count % this.page_chunk === 0) {
              this.page_max = Math.floor(response.data.count / this.page_chunk)
            } else {
              this.page_max = Math.floor(response.data.count / this.page_chunk) + 1
            }
            this.content_obj = response.data.results
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    mounted() {
      // Init other pages options
      this.$store.state.pageOptions.company.page = 1
      this.$store.state.pageOptions.company.option = 0
      this.$store.state.pageOptions.company.text = ''
      this.$store.state.pageOptions.landing.page = 1
      this.$store.state.pageOptions.landing.option = 0
      this.$store.state.pageOptions.landing.text = ''
      this.$store.state.pageOptions.organization.page = 1
      this.$store.state.pageOptions.organization.option = 0
      this.$store.state.pageOptions.organization.text = ''

      // Window width calculator
      let that = this
      this.$nextTick(function () {
        window.addEventListener('resize', function (e) {
          that.window_width = window.innerWidth
        })
      })

      // Calling contents at first with store
      let axios = this.$axios
      let this_url = 'user_access/'
      let def = ''
      // Check store values
      this.page_current = this.$store.state.pageOptions.user.page
      this.search_option = this.$store.state.pageOptions.user.option
      this.temp_text = this.$store.state.pageOptions.user.text
      this.search_text = this.$store.state.pageOptions.user.text
      let offset = (this.$store.state.pageOptions.user.page - 1) * (this.page_chunk)
      // if (!this.user_obj.is_staff && this.access_obj.access == 1) {
      //   def = '&organization=' + this.access_obj.organization
      // }
      // Axios get landings
      // axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text + def)
      //   .then((response) => {
      //     // Calculation for page_max
      //     if(response.data.count % this.page_chunk === 0) {
      //       this.page_max = Math.floor(response.data.count/this.page_chunk)
      //     } else {
      //       this.page_max = Math.floor(response.data.count/this.page_chunk) + 1
      //     }
      //     this.content_obj = response.data.results
      //   })
      //
      //
      //
      //
      if (this.user_obj.is_staff) {
        // collect all
      } else if (this.access_obj.access == 1) {
        // organization == access
        def = '&organization=' + this.access_obj.organization
      } else if (this.access_obj.access == 2) {
        // company === company
        def = '&company=' + this.access_obj.company
      } else {
        // Emergency break
        def = '&organization=f'
      }
      axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&sort=1' + def)
        .then((response) => {
          // console.log('access response = ', response)
          if (response.data.count % this.page_chunk === 0) {
            this.page_max = Math.floor(response.data.count / this.page_chunk)
          } else {
            this.page_max = Math.floor(response.data.count / this.page_chunk) + 1
          }
          this.content_obj = response.data.results
        })
        .catch((error) => {
          console.log(error)
        })
    },
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    },
    destroyed() {
      // Save values in the store
      this.$store.state.pageOptions.user.page = this.page_current
      this.$store.state.pageOptions.user.option = this.search_option
      this.$store.state.pageOptions.user.text = this.search_text
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

<style scoped lang="scss">

</style>
