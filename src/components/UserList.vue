<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/users">유저 리스트</router-link>
    </div>

    <form class="container m-auto d-flex justify-content-between flex-row" v-on:submit.prevent="search(temp_option, temp_text)">
      <router-link to="/users/create" class="btn-sm h-75 btn-primary p-1 col-md-1 col-sm-2 col text-center">생성</router-link>
      <div class="form-group search_group">
        <select class="search_option" id="src_gbn" v-model="temp_option">
          <option value="0" selected>검색 옵션</option>
          <option value="1">이름</option>
        </select>
        <input type="text" class="search_text" v-model="temp_text" placeholder="검색">
        <button type="submit" class="search_btn">
          <img src="../assets/common/search.png" />
        </button>
      </div>
    </form>

    <div class="container">

      <div v-if="window_width > 1000" class="list_area">
        <div>
          <div class="list-group-item  d-inline-flex justify-content-between p-1 pt-2 pb-2 text-center" style="border-radius: 0; border-bottom: 0; width:100%;">
            <div class="col-1">번호</div>
            <div class="col-2 text-center">계정</div>
            <div class="col-2 text-center">이름</div>
            <div class="col-1 text-center">관리자</div>
            <div class="col-1 text-center">방문자</div>
            <div class="col-1 text-center">활성상태</div>
            <div class="col-2 board_centre">마지막 로그인</div>
            <div class="col-2 board_centre">생성일</div>
          </div>
        </div>
        <ul class="list-group list-group-flush col-12 pr-0 text-center">
          <li v-if="content_obj.length === 0" class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
            <div class="col-12 text-center">데이터가 존재하지 않습니다.</div>
          </li>
          <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1" v-for="content in content_obj">
            <div class="col-1">{{ content.id }}</div>
            <div class="col-2 text-center">{{ content.account }}</div>
            <div class="col-2 text-center"><router-link :to="'/landing/detail/' + content.id">{{ content.full_name }}</router-link></div>
            <div class="col-1 text-center">{{ content.is_staff }}</div>
            <div class="col-1 text-center">{{ content.is_guest }}</div>
            <div class="col-1 text-center">{{ content.is_active }}</div>
            <div v-if="content.last_login" class="col-2 board_centre">{{ (content.last_login).substring(0, 10) }}</div>
            <div v-else class="col-2 board_centre">없음</div>
            <div class="col-2 board_centre">{{ (content.created_date).substring(0, 10) }}</div>
          </li>
        </ul>
      </div>

      <div v-else class="list_area">
        <div>
          <div class="list-group-item  d-inline-flex justify-content-between p-1 pt-2 pb-2" style="border-radius: 0; border-bottom: 0; width:100%;">
            <div class="col-1">번호</div>
            <div class="col-3 text-center">계정</div>
            <div class="col-3 text-center">이름</div>
            <div class="col-5 board_centre">생성일</div>
          </div>
        </div>
        <ul class="list-group list-group-flush col-12 pr-0">
          <li v-if="content_obj.length === 0" class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
            <div class="col-12 text-center">데이터가 존재하지 않습니다.</div>
          </li>
          <li v-else class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1" v-for="content in content_obj">
            <div class="col-1">{{ content.id }}</div>
            <div class="col-3 text-center">{{ content.account }}</div>
            <div class="col-3 text-center"><router-link :to="'/landing/detail/' + content.id">{{ content.full_name }}</router-link></div>
            <div class="col-5 board_centre">{{ (content.created_date).substring(0, 10) }}</div>
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
      page_chunk: 5,
      content_obj: [],
      temp_option: 0,
      temp_text: '',
      search_option: 0,
      search_text: '',
    }),
    methods: {
      pagination: function(pageNum) {
        // when page is first, max ~ max-(chunk*current)+1
        // when page is max, max-(chunk*(current-1)) ~ 1
        // when page is middle, max-(chunk*(current-1)) ~ max-(chunk*current)+1
        let offset = (pageNum - 1)*this.page_chunk
        this.calling_all_unit(offset)
      },
      search: function(option, text) {
        if (option !== 0 || text !== '') {
          let option_val
          this.page_current = 1
          if (option === '1') {
            option_val = 'name'
          } else {
            console.log('Option not catched')
          }
          this.search_option = option_val
          this.search_text = text
          this.calling_all_unit()
        }
      },
      calling_all_unit: function(page) {
        // Calling landings with new values
        let axios = this.$axios
        let this_url = 'user/'
        let offset = page
        axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text)
          .then((response) => {
            // Calculation for page_max
            if(response.data.count % this.page_chunk === 0) {
              this.page_max = Math.floor(response.data.count/this.page_chunk)
            } else {
              this.page_max = Math.floor(response.data.count/this.page_chunk) + 1
            }
            this.content_obj = response.data.results
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
      let this_url = 'user/'
      // Check store values
      this.page_current = this.$store.state.pageOptions.user.page
      this.search_option = this.$store.state.pageOptions.user.option
      this.temp_text = this.$store.state.pageOptions.user.text
      this.search_text = this.$store.state.pageOptions.user.text
      let offset = (this.$store.state.pageOptions.user.page - 1)*(3)
      // Axios get landings
      axios.get(this.$store.state.endpoints.baseUrl + this_url + '?offset=' + offset + '&' + this.search_option + '=' + this.search_text)
        .then((response) => {
          // Calculation for page_max
          if(response.data.count % this.page_chunk === 0) {
            this.page_max = Math.floor(response.data.count/this.page_chunk)
          } else {
            this.page_max = Math.floor(response.data.count/this.page_chunk) + 1
          }
          this.content_obj = response.data.results
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
    }
  }
</script>

<style lang="scss">
  /* Search bar */

/*  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .search_group {
    text-align: right;
  }

  .search_option {
    display: inline-block;
    width: 75px;
    height: 30px;
    text-align: center;
    font-size: 0.8em;
    line-height: 1em;
    outline: 0;
    border: 1px solid #c1c1c1;
    border-radius: 5px 0 0 5px;
    background-color: #ffffff;
    vertical-align: top;
    padding: 0 0 0 10px;
  }

  .search_text {
    display: inline-block;
    width: 160px;
    height: 30px;
    font-size: 0.8em;
    line-height: 0.8em;
    vertical-align: top;
    border: 1px solid #c1c1c1;
    padding: 10px;
    margin-left: -6px;
  }

  .search_btn {
    display: inline-block;
    width: 30px;
    height: 30px;
    padding: 0;
    text-align: center;
    border: 1px solid #c1c1c1;
    border-radius: 0 5px 5px 0;
    margin-left: -6px;
    img {
      width: 55%;
      height: 60%;
    }
  }
  !* Search box ended *!

  !* Pagination *!
  .pagination {
    display: block;
    text-align: center;
    margin: 0 auto;
    font-size: 0;
    padding: 10px 0;
  }
  .page-item {
    font-size: 14px;
    border-radius: 0;
  }
  .page-link {
    display: inline-block;
    border-radius: 0 !important;
    padding: 0 !important;
    a {
      display: block;
      width: 35px;
      height: 35px;
      text-align: center;
      line-height: 35px;
    }
  }
  .page-link.active {
    background-color: #007bcc;
    a {
      color: #efefef;
    }
  }
  .page-link.disabled {
    a {
      color: #c1c1c1;
    }
  }
  .page-link.prev, .page-link.next {
    border: none;
  }
  !*Pagination End*!

  .board_container {
    width: 100%;
    padding: 10px 0;
  }

  .board_wrap {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    border-top: 2px solid #eaeaea;
    border-bottom: 2px solid #eaeaea;
    padding: 10px 15px 0 15px;
    transition: all 200ms ease-in-out;
  }

  .board_header {
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 10px;
  }

  .board_ul {

  }

  .board_li {
    padding: 5px 0;
    border-bottom: 1px solid #eaeaea;
  }
  .board_li:last-child {
    border: none;
  }
  .board_centre {
    text-align: center;
  }*/

</style>
