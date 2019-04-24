<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/landing">랜딩 리스트</router-link>
      <span>></span>
      <router-link to="/db/detail">DB 정보</router-link>
    </div>

    <div class="container">
      <div class="landing_info">


        <h5>선택된 랜딩페이지</h5>

        <!---->
        <!---->
        <div v-if="window_width > 1000" class="list_area">
          <div class="list_header">
            <div class="list-group-item text-center d-inline-flex justify-content-between p-1 pt-2 pb-2 text-center"
                 style="border-radius: 0; border-bottom: 0; width:100%;">
              <div class="col-3 p-0">업체</div>
              <div class="col-4 p-0">페이지</div>
              <div class="col-3 p-0">담당자</div>
              <div class="col-1 p-0 board_centre">조회수</div>
              <div class="col-1 p-0 board_centre">DB</div>
            </div>
          </div>
          <ul class="list_body text-center list-group list-group-flush col-12 pr-0 text-center">
            <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1 font-weight-bold border-0">
              <div class="col-3 p-0 col-sm-3">{{ landing_obj.LandingInfo.landing.company_name }}</div>
              <div class="col-3 p-0 col-sm-4">{{ landing_obj.LandingInfo.landing.name }}</div>
              <div class="col-3 p-0">{{ landing_obj.LandingInfo.landing.manager_name }}</div>
              <div class="col-1 p-0 board_centre">{{ landing_obj.LandingInfo.landing.views }}</div>
              <div class="col-1 p-0 board_centre">{{ landing_obj.LandingInfo.landing.collection_amount }}</div>
            </li>
          </ul>
        </div>

        <div v-else class="list_area">
          <div class="list_header">
            <div class="list-group-item text-center d-inline-flex justify-content-between p-1 pt-2 pb-2"
                 style="border-radius: 0; border-bottom: 0; width:100%;">
              <div class="col-2 p-0">업체</div>
              <div class="col-5 p-0">페이지</div>
              <div class="col-3 p-0">담당자</div>
              <div class="col-2 p-0">DB</div>
            </div>
          </div>
          <ul class="list_body text-center list-group list-group-flush col-12 pr-0">
            <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1 border-0">
              <div class="col-2 p-0">{{ landing_obj.LandingInfo.landing.company_name }}</div>
              <div class="col-5 p-0">{{ landing_obj.LandingInfo.landing.name }}</div>
              <div class="col-3 p-0">{{ landing_obj.LandingInfo.landing.manager_name }}</div>
              <div class="col-2 p-0">{{ landing_obj.LandingInfo.landing.collection_amount }}</div>
            </li>
          </ul>
        </div>
        <!---->
        <!---->

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "db_detail",
    data: () => ({
      window_width: window.innerWidth,
      landing_id: 0,
      landing_obj: {}
    }),
    mounted() {
      let axios = this.$axios

      // Window width calculator
      let that = this
      this.$nextTick(function () {
        window.addEventListener('resize', function (e) {
          that.window_width = window.innerWidth
        })
      })
      //
      this.landing_id = this.$route.params.landing_id
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/' + this.landing_id)
        .then((response) => {
          console.log(response)
          this.landing_obj = response.data
          console.log(this.landing_obj)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="scss" scoped>
  .list_header {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.14);
  }
  .list_body {
    margin-top: 10px;
    border: 0;
  }
</style>
