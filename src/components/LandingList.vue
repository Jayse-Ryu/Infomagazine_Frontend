<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/landing">랜딩페이지</router-link>
    </div>

    <!-- ID/Company/Landing name/manager/view/db -->
    <div class="board_container">
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
            <div class="col-5"><a href="">{{ result.name }}</a></div>
            <div class="col-2">{{ result.manager_name }}</div>
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
        // console.log('index_max', this.index_max)
        // console.log('index_top', this.index_top)
        // console.log('index_bottom', this.index_bottom)
        this.landing_result()
      }
      else if(pageNum === this.page_max) {
        // when page is max, max-(chunk*(current-1)) ~ 1
        // console.log('max page!')
        this.index_top = this.index_max - this.page_chunk * (this.page_current - 1)
        this.index_bottom = 1
        // console.log('index_max', this.index_max)
        // console.log('index_top', this.index_top)
        // console.log('index_bottom', this.index_bottom)
        this.landing_result()
      }
      else {
        // when page is middle, max-(chunk*(current-1)) ~ max-(chunk*current)+1
        // console.log('middle page!')
        this.index_top = this.index_max - (this.page_chunk * (this.page_current - 1))
        this.index_bottom = this.index_max - (this.page_chunk * this.page_current) + 1
        // console.log('index_max', this.index_max)
        // console.log('index_top', this.index_top)
        // console.log('index_bottom', this.index_bottom)
        this.landing_result()
      }
    },
    landing_result() {
      let temp_arr = this.landing_obj
      let res_arr = []
      for(let i = this.index_top - 1; i >= this.index_bottom - 1; i--) {
        for(let j = 0; j < this.company_obj.length; j++) {
          if(temp_arr[i].company === this.company_obj[j].id) {
            temp_arr[i].company_name = this.company_obj[j].name
            temp_arr[i].manager_name = this.company_obj[j].manager_name
            // console.log(temp_arr[i])
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
        // Init
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
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
    // axios is done.
  }
}
</script>

<style lang="scss">
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
