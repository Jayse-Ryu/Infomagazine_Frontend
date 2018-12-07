<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/landing">랜딩페이지 리스트</router-link>
    </div>

    <form class="container">
      {{ search_option }}
      {{ search_filter }}
      <div class="form-group search_group">
        <select class="search_option" id="src_gbn" v-model="search_option">
          <option value="-1" selected>검색 옵션</option>
          <option value="0">랜딩 이름</option>
          <option value="1">업체</option>
          <option value="2">관리자</option>
        </select>
        <input type="text" class="search_text" v-model="search_filter" placeholder="구현전">
        <button type="submit" class="search_btn">
          <img src="../assets/common/search.png" />
        </button>
      </div>
    </form>

    <!-- ID/Company/Landing name/manager/view/db -->
<!--    <div class="board_container container">
      <div class="board_wrap">
        <div class="board_header row">
          <div class="col-1">번호</div>
          <div class="col-2">업체</div>
          <div class="col-5">랜딩페이지</div>
          <div class="col-2">담당자</div>
          <div class="col-1 board_centre">조회수</div>
          <div class="col-1 board_centre">DB</div>
        </div>
        <ul class="board_ul">
          <li class="board_li row" v-for="result in result_obj">
            <div class="col-1">{{ result.id }}</div>
            <div class="col-2">{{ result.company_name }}</div>
            <div class="col-5"><router-link :to="'/landing/detail/' + result.id">{{ result.name }}</router-link></div>
            <div class="col-2">{{ result.manager_name }}</div>
            <div class="col-1 board_centre">{{ result.views }}</div>
            <div class="col-1 board_centre">{{ result.hits }}</div>
          </li>
        </ul>
      </div>
    </div>-->

    <div class="container">
      <div class="">
        <!--<ul class="list-group list-group-flush col-12 pr-0">
          <div class="col-1">번호</div>
          <div class="col-2">업체</div>
          <div class="col-5">랜딩페이지</div>
          <div class="col-2">담당자</div>
          <div class="col-1 board_centre">조회수</div>
          <div class="col-1 board_centre">DB</div>
        </ul>-->
        <ul class="list-group list-group-flush col-12 pr-0">
          <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1">
            <div class="col-1">번호</div>
            <div class="col-2">업체</div>
            <div class="col-5">랜딩페이지</div>
            <div class="col-2">담당자</div>
            <div class="col-1 board_centre">조회수</div>
            <div class="col-1 board_centre">DB</div>
          </li>
          <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1" v-for="result in result_obj">
            <div class="col-1 col-sm-1">{{ result.id }}</div>
            <div class="col-3 col-sm-2">{{ result.company_name }}</div>
            <div class="col-3 col-sm-4"><router-link :to="'/landing/detail/' + result.id">{{ result.name }}</router-link></div>
            <div class="col-3">{{ result.manager_name }}</div>
            <div class="col-1 board_centre">{{ result.views }}</div>
            <div class="col-1 board_centre">{{ result.hits }}</div>
          </li>
        </ul>
      </div>
    </div>

    <paginate class="pagination"
      v-model="page_current"
      :page-count="this.page_max"
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
    search_option: -1,
    search_filter: '',
    page_current: 1,
    page_max: 0,
    page_chunk: 5,
    landing_obj: [],
    result_obj: [],
    index_max: 0,
    index_top: 0,
    index_bottom: 0,
    company_obj: []
  }),
  methods: {
    pagination: function(pageNum) {
      // Keep this page number
      this.$parent.global_page = pageNum
      // Actual pagination
      if(pageNum === 1) {
        // when page is first, max ~ max-(chunk*current)+1
        // console.log('first page!')
        this.index_top = this.index_max
        this.index_bottom = this.index_max - (this.page_chunk * this.page_current) + 1
        this.landing_result()
      }
      else if(pageNum === this.page_max) {
        // when page is max, max-(chunk*(current-1)) ~ 1
        // console.log('max page!')
        this.index_top = this.index_max - this.page_chunk * (this.page_current - 1)
        this.index_bottom = 1
        this.landing_result()
      }
      else {
        // when page is middle, max-(chunk*(current-1)) ~ max-(chunk*current)+1
        // console.log('middle page!')
        this.index_top = this.index_max - (this.page_chunk * (this.page_current - 1))
        this.index_bottom = this.index_max - (this.page_chunk * this.page_current) + 1
        this.landing_result()
      }
    },
    landing_result() {
      let temp_arr = this.landing_obj
      let res_arr = []
      // Get obj for a chunk
      for(let i = this.index_top - 1; i >= this.index_bottom - 1; i--) {
        // Put company name, manager name to each company object
        for(let j = 0; j < this.company_obj.length; j++) {
          if(temp_arr[i].company === this.company_obj[j].id) {
            temp_arr[i].company_name = this.company_obj[j].name
            temp_arr[i].manager_name = this.company_obj[j].manager_name
          }
        }
        res_arr.push(temp_arr[i])
      }
      this.result_obj = res_arr
      // console.log(this.result_obj)
    },
  },
  mounted() {
    // Check previous page position
    if(this.$parent.global_page !== 1){
      this.page_current = this.$parent.global_page
    } else {
      this.page_current = 1
    }
    // Start Contents handler
    let axios = this.$axios
    let this_url = 'landing/'

    // Get actual landing pages by using axios
    axios.get(this.$store.state.endpoints.baseUrl + this_url)
      .then((response) => {
        // init
        this.landing_obj = response.data
        this.index_max = response.data.length
        // Calculation for page_max
        if(response.data.length % this.page_chunk === 0) {
          this.page_max = Math.floor(response.data.length/this.page_chunk)
        } else {
          this.page_max = Math.floor(response.data.length/this.page_chunk) + 1
        }

        // Get company names
        this_url = 'company/'
        axios.get(this.$store.state.endpoints.baseUrl + this_url)
          .then((response) => {
            this.company_obj = response.data
            // Add manager name into company object
            this_url = 'users/'
            axios.get(this.$store.state.endpoints.baseUrl + this_url)
              .then((response) => {
                // make obj in here for security
                for (let i = 0; i < this.company_obj.length; i++) {
                  for(let j = 0; j < response.data.length; j++) {
                    if (this.company_obj[i].manager === response.data[j].id) {
                      this.company_obj[i].manager_name = response.data[j].full_name
                    }
                  }
                }
                this.pagination(this.page_current)
              })
              // .catch((error) => {
              //   console.log(error)
              // })
          })
          // .catch((error) => {
          //   console.log(error)
          // })
      })
      .catch((error) => {
        console.log(error)
      })
    // axios is done.
  }
}
</script>

<style lang="scss">
  /* Search bar */
  select {
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
  /* Search box ended */

  /* Pagination */
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
  /*Pagination End*/

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
  }

</style>
