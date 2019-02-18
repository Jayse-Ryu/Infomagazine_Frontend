<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/company">업체 리스트</router-link>
    </div>

    <div v-if="user_obj.is_staff == true || access_obj.access == 1">
      <form class="container m-auto justify-content-between row"
            v-on:submit.prevent="search(temp_option, temp_text)">

        <router-link to="/landing/create/" v-if="access_obj.access == 1" class="form-group btn btn-primary p-0 col-sm-12 col-md-1">
          <div class="create_btn_text">생성</div>
        </router-link>

        <div class="form-group search_group ml-auto text-center p-0 col-sm-12 col-md-4">
          <select class="search_option" id="src_gbn" v-model="temp_option">
            <option value="0" selected>검색 옵션</option>
            <option value="1">업체</option>
            <option value="2">관리자</option>
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
              <div class="col-2 p-0">업체</div>
              <div class="col-2 p-0">상호명</div>
              <div class="col-2 p-0">담당자</div>
              <div class="col-2 p-0">연락처</div>
              <div class="col-3 p-0 board_centre">생성일</div>
            </div>
          </div>
          <ul class="list_body list-group list-group-flush col-12 pr-0 text-center">
            <li v-if="content_obj.length === 0"
                class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
              <div class="col-12 p-0 text-center">데이터가 존재하지 않습니다.</div>
            </li>
            <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                v-for="content in content_obj">
              <div class="col-1 p-0 col-sm-1">{{ content.id }}</div>
              <div class="col-2 p-0 col-sm-2">
                <router-link :to="'/company/detail/' + content.id">{{ content.name }}</router-link>
              </div>
              <div class="col-2 p-0 col-sm-2">
                <router-link :to="'/company/detail/' + content.id">{{ content.sub_name }}</router-link>
              </div>
              <div class="col-2 p-0">{{ content.manager_name }}</div>
              <div v-if="content.phone" class="col-2 p-0">{{ content.phone }}</div>
              <div v-else-if="content.email" class="col-2 p-0">{{ content.email }}</div>
              <div v-else class="col-2 p-0">없음</div>
              <div class="col-3 p-0 board_centre">{{ (content.created_date).substring(0, 10) }}</div>
            </li>
          </ul>
        </div>

        <div v-else class="list_area">
          <div class="list_header">
            <div class="list-group-item text-center d-inline-flex justify-content-between p-1 pt-2 pb-2"
                 style="border-radius: 0; border-bottom: 0; width:100%;">
              <div class="col-2 p-0">번호</div>
              <div class="col-3 p-0">업체</div>
              <div class="col-4 p-0">연락처</div>
              <div class="col-3 p-0 board_centre">생성일</div>
            </div>
          </div>
          <ul class="list_body text-center list-group list-group-flush col-12 pr-0">
            <li v-if="content_obj.length === 0"
                class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
              <div class="col-12 p-0 text-center">데이터가 존재하지 않습니다.</div>
            </li>
            <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                v-for="content in content_obj">
              <div class="col-2 p-0">{{ content.id }}</div>
              <div class="col-3 p-0">
                <router-link :to="'/company/detail/' + content.id">{{ content.name }}</router-link>
              </div>
              <div v-if="content.phone" class="col-4 p-0">{{ content.phone }}</div>
              <div v-else-if="content.email" class="col-4 p-0">{{ content.email }}</div>
              <div v-else class="col-4 p-0">없음</div>
              <div class="col-3 p-0 board_centre">{{ (content.created_date).substring(0, 10) }}</div>
            </li>
          </ul>
        </div>

      </div>

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

    <!-- If no one try to access to this list -->
    <div v-else>
      <div class="m-auto text-center pt-3">권한이 없습니다.</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "company_list",
    created() {
      if (this.$store.state.authUser) {
        if (this.$store.state.userAccess.access !== 1 && this.$store.state.userAccess.access === -2) {
          this.$router.push({
            name: 'gateway'
          })
        } else if (this.$store.state.userAccess.access == 2) {
          this.$router.push({
            path: '/company/detail/' + this.$store.state.userAccess.company
          })
        }
      } else {
        alert('로그인이 필요합니다.')
        this.$router.push({
          name: 'gateway'
        })
      }
    },
    data: () => ({
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
            option_val = 'manager'
          } else {
            console.log('Option not catched')
          }
          this.search_option = option_val
          this.search_text = text
          this.calling_all_unit()
        }
      },
      calling_all_unit: function (page) {
        // Calling landings with new values
        let axios = this.$axios
        let this_url = 'company/'
        let offset = page
        let def = ''
        if (!this.user_obj.is_staff && this.access_obj.access == 1) {
          def = '&organization=' + this.access_obj.organization
        }
        axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text + def)
          .then((response) => {
            // Calculation for page_max
            if (response.data.count % this.page_chunk === 0) {
              this.page_max = Math.floor(response.data.count / this.page_chunk)
            } else {
              this.page_max = Math.floor(response.data.count / this.page_chunk) + 1
            }
            this.content_obj = response.data.results
            console.log(this.content_obj)
          })
      }
    },
    mounted() {
      // Init other pages options
      this.$store.state.pageOptions.landing.page = 1
      this.$store.state.pageOptions.landing.option = 0
      this.$store.state.pageOptions.landing.text = ''
      this.$store.state.pageOptions.user.page = 1
      this.$store.state.pageOptions.user.option = 0
      this.$store.state.pageOptions.user.text = ''
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
      let this_url = 'company/'
      let def = ''
      // Check store values
      this.page_current = this.$store.state.pageOptions.company.page
      this.search_option = this.$store.state.pageOptions.company.option
      this.temp_text = this.$store.state.pageOptions.company.text
      this.search_text = this.$store.state.pageOptions.company.text
      let offset = (this.$store.state.pageOptions.company.page - 1) * this.page_chunk
      if(this.search_option == 'name') {
        this.temp_option = 1
      } else if (this.search_option == 'manager') {
        this.temp_option = 2
      }
      // Axios get landings
      if (!this.user_obj.is_staff && this.access_obj.access == 1) {
        def = '&organization=' + this.access_obj.organization
      }
      axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text + def)
        .then((response) => {
          // Calculation for page_max
          if (response.data.count % this.page_chunk === 0) {
            this.page_max = Math.floor(response.data.count / this.page_chunk)
          } else {
            this.page_max = Math.floor(response.data.count / this.page_chunk) + 1
          }
          this.content_obj = response.data.results
        })
    },
    destroyed() {
      // Save values in the store
      this.$store.state.pageOptions.company.page = this.page_current
      this.$store.state.pageOptions.company.option = this.search_option
      this.$store.state.pageOptions.company.text = this.search_text
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
