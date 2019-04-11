<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/landing">랜딩 리스트</router-link>
    </div>


    <form class="container m-auto justify-content-between row"
          v-on:submit.prevent="search(temp_option, temp_text)">
      <router-link to="/landing/create/" v-if="access_obj.access == 1" class="form-group btn btn-primary p-0 col-sm-12 col-md-1">
        <div class="create_btn_text">생성</div>
      </router-link>
      <div class="form-group search_group ml-auto text-center p-0 col-sm-12 col-md-4">
        <select class="search_option" id="src_gbn" v-model="temp_option">
          <option value="0" selected>검색 옵션</option>
          <option value="1">랜딩 이름</option>
          <option value="2">업체</option>
          <option value="3">관리자</option>
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
          <div class="list-group-item text-center d-inline-flex justify-content-between p-1 pt-2 pb-2 text-center"
               style="border-radius: 0; border-bottom: 0; width:100%;">
            <!--<div class="col-1 p-0">번호</div>-->
            <div class="col-3 p-0">업체</div>
            <div class="col-4 p-0">페이지</div>
            <div class="col-3 p-0">담당자</div>
            <div class="col-1 p-0 board_centre">조회수</div>
            <div class="col-1 p-0 board_centre">DB</div>
          </div>
        </div>
        <ul class="list_body text-center list-group list-group-flush col-12 pr-0 text-center">
          <li v-if="content_obj.length === 0"
              class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
            <div class="col-12 text-center">데이터가 존재하지 않습니다.</div>
          </li>
          <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
              v-for="content in content_obj">
            <!--<div class="col-1 p-0 col-sm-1">{{ content.id }}</div>-->
            <div class="col-3 p-0 col-sm-3">{{ content.LandingInfo.landing.company_name }}</div>
            <div class="col-3 p-0 col-sm-4">
              <router-link :to="'/landing/detail/' + content.LandingNum">{{ content.LandingName }}</router-link>
            </div>
            <div class="col-3 p-0">{{ content.LandingInfo.landing.manager_name }}</div>
            <div class="col-1 p-0 board_centre">{{ content.LandingInfo.landing.views }}</div>
            <div class="col-1 p-0 board_centre">{{ content.hit }}</div>
          </li>
        </ul>
      </div>

      <div v-else class="list_area">
        <div class="list_header">
          <div class="list-group-item text-center d-inline-flex justify-content-between p-1 pt-2 pb-2"
               style="border-radius: 0; border-bottom: 0; width:100%;">
            <div class="col-2 p-0">번호</div>
            <div class="col-3 p-0">업체</div>
            <div class="col-5 p-0">페이지</div>
            <div class="col-2 p-0">DB</div>
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
            <div class="col-3 p-0">{{ content.company_name }}</div>
            <div class="col-5 p-0">
              <router-link :to="'/landing/detail/' + content.LandingNum">{{ content.name }}</router-link>
            </div>
            <div class="col-2 p-0">{{ content.hit }}</div>
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
</template>

<script>
  export default {
    name: "landing_list",
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
          if (option == 1) {
            option_val = 'name'
          } else if (option == 2) {
            option_val = 'company'
          } else if (option == 3) {
            option_val = 'manager'
          } else {
            // console.log('Option not catched')
            alert('검색 옵션을 선택하세요.')
          }
          this.search_option = option_val
          this.search_text = text
          this.calling_all_unit()
        }
      },
      add_company(id) {
        let axios = this.$axios
        axios.get(this.$store.state.endpoints.baseUrl + 'company/' + id)
          .then((response) => {
            console.log('print company name', response.data.name)
            let res = response.data.name
            console.log('res', res)
            return res
          })
      },
      add_manager(id) {
        let axios = this.$axios
        axios.get(this.$store.state.endpoints.baseUrl + 'user_access/' + id)
          .then((response) => {
            console.log('print user access name', response.data.user_name)
            let res = response.data.user_name
            console.log('res', res)
            return res
          })
      },
      calling_all_unit: function (page) {
        // Calling landings with new values
        let axios = this.$axios
        let this_url = 'landing/'
        let offset = page
        // axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text)
        //   .then((response) => {
        //     // Calculation for page_max
        //     if (response.data.count % this.page_chunk === 0) {
        //       this.page_max = Math.floor(response.data.count / this.page_chunk)
        //     } else {
        //       this.page_max = Math.floor(response.data.count / this.page_chunk) + 1
        //     }
        //     this.content_obj = response.data.results
        //   })

        const base = {
          baseURL: this.$store.state.endpoints.baseUrl,
          headers: {
            // Set your Authorization to 'JWT', not Bearer!!!
            // Authorization: `JWT ${this.state.jwt}`,
            'Content-Type': 'application/json'
          },
          xhrFields: {
            withCredentials: true
          }
        }

        let searcher = ''
        if (this.search_text != '') {
          if(this.temp_option == 1) {
            searcher = '?name=' + this.search_text
          } else if (this.temp_option == 2) {
            searcher = '?company=' + this.search_text
          } else if (this.temp_option == 3) {
            searcher = '?manager=' + this.search_text
          }
        } else {
          searcher = ''
        }
        axios.get(this.$store.state.endpoints.baseUrl + 'landing/api' + searcher)
          .then((response) => {
            this.content_obj = response.data.Items
          })
          .catch((error) => {
            console.log('api error', error)
          })
      }
    },
    mounted() {
      // Init other pages options
      this.$store.state.pageOptions.company.page = 1
      this.$store.state.pageOptions.company.option = 0
      this.$store.state.pageOptions.company.text = ''
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
      let this_url = 'landing/'
      // Check store values
      this.page_current = this.$store.state.pageOptions.landing.page
      this.search_option = this.$store.state.pageOptions.landing.option
      this.temp_text = this.$store.state.pageOptions.landing.text
      this.search_text = this.$store.state.pageOptions.landing.text
      let offset = (this.$store.state.pageOptions.landing.page - 1) * this.page_chunk
      if(this.search_option == 'name') {
        this.temp_option = 1
      } else if (this.search_option == 'company') {
        this.temp_option = 2
      } else if (this.search_option == 'manager') {
        this.temp_option = 3
      }
      // // Axios get landings
      // axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text)
      //   .then((response) => {
      //     // Calculation for page_max
      //     if (response.data.count % this.page_chunk === 0) {
      //       this.page_max = Math.floor(response.data.count / this.page_chunk)
      //     } else {
      //       this.page_max = Math.floor(response.data.count / this.page_chunk) + 1
      //     }
      //     this.content_obj = response.data.results
      //   })

      let searcher = ''
      if (this.search_text != '') {
        if(this.temp_option == 1) {
          searcher = '?name=' + this.search_text
        } else if (this.temp_option == 2) {
          searcher = '?company=' + this.search_text
        } else if (this.temp_option == 3) {
          searcher = '?manager=' + this.search_text
        }
      } else {
        searcher = ''
      }
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api' + searcher)
        .then((response) => {
          this.content_obj = response.data.Items
        })
        .catch((error) => {
          console.log('api error', error)
        })
    },
    destroyed() {
      // Save values in the store
      this.$store.state.pageOptions.landing.page = this.page_current
      this.$store.state.pageOptions.landing.option = this.search_option
      this.$store.state.pageOptions.landing.text = this.search_text
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
