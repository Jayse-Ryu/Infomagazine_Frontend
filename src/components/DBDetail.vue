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

      <!-- Selected page -->
      <section class="section">
        <div class="landing_info">
          <h5>선택된 랜딩페이지</h5>
          <div v-if="window_width > 1000" class="list_area">
            <div class="list_header">
              <div class="list-group-item text-center d-inline-flex justify-content-between p-1 pt-2 pb-2 text-center"
                   style="border-radius: 0; width:100%;">
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
                <div class="col-3 p-0">업체</div>
                <div class="col-6 p-0">페이지</div>
                <!--<div class="col-3 p-0">담당자</div>-->
                <div class="col-3 p-0">DB</div>
              </div>
            </div>
            <ul class="list_body text-center list-group list-group-flush col-12 pr-0">
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1 border-0">
                <div class="col-3 p-0">{{ landing_obj.LandingInfo.landing.company_name }}</div>
                <div class="col-6 p-0">{{ landing_obj.LandingInfo.landing.name }}</div>
                <!--<div class="col-3 p-0">{{ landing_obj.LandingInfo.landing.manager_name }}</div>-->
                <div class="col-3 p-0">{{ landing_obj.LandingInfo.landing.collection_amount }}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <!-- /Selected page -->

      <section class="section section_box">
        <h5>Url 상태</h5>
        <div>url, 조회수, 콜 수 </div>
      </section>

      <section class="section section_box">
        <h5>DB 필터</h5>
        <div>DB filter as Date, url/ save button</div>
      </section>

      <section class="section section_box">
        <h5>DB 리스트</h5>

        <div class="list_area">

          <div class="list_header">
            <div class="list-group-item text-center d-inline-flex justify-content-around p-1 pt-2 pb-2 text-center border-bottom-0"
                 style="border-radius: 0; width:100%;">
              <div class="p-0 w-100">업체</div>
              <div class="p-0 w-100">페이지</div>
              <div class="p-0 w-100">담당자</div>
              <div class="p-0 w-100">조회수</div>
              <div class="p-0 w-100">DB</div>
            </div>
          </div>

          <ul class="text-center list-group list-group-flush text-center">
            <li class="list-group-item list-group-item-action d-inline-flex justify-content-around p-1">
              <div class="p-0 w-100">{{ landing_obj.LandingInfo.landing.company_name }}</div>
              <div class="p-0 w-100">{{ landing_obj.LandingInfo.landing.name }}</div>
              <div class="p-0 w-100">{{ landing_obj.LandingInfo.landing.manager_name }}</div>
              <div class="p-0 w-100">{{ landing_obj.LandingInfo.landing.views }}</div>
              <div class="p-0 w-100">{{ landing_obj.LandingInfo.landing.collection_amount }}</div>
            </li>
          </ul>

        </div>

      </section>

    </div>
    <!-- /Container -->
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
  .section {
    margin: 3% auto;
  }

  .list_header {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.14);
  }

  .list_body {
    margin-top: 10px;
    border: 0;
  }

  .section_box {
    /*box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.14);*/
  }
</style>
