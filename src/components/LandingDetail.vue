<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/landing">랜딩페이지 리스트</router-link>
      <span>></span>
      <router-link :to="'/landing/detail/' + $route.params.landing_id">랜딩페이지 정보</router-link>
    </div>

    <div class="container" style="margin-top: 20px;">

      <form>

        <h5>기본정보</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm" for="page_id">페이지 ID</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="page_id" :value="landing.id">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="company_id">업체명</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="company_id" :value="landing.company">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="manager">관리자</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="manager">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="landing">랜딩페이지 명</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="landing" :value="landing.name">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="views">페이지 조회 수</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="views" :value="landing.views">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="db">데이터 수집 수</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="db" :value="landing.hits">
          </div>
        </div>

        <hr>

        <h5>페이지 내용</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm" for="page_title">페이지 타이틀</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="page_title" :value="landing.title">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="header_script">헤더 스크립트</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="header_script" :value="landing.header_script">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="body_script">바디 스크립트</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="body_script" :value="landing.body_script">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="main_img">페이지 이미지</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="main_img">
          </div>
        </div>

        <hr>

        <h5>추가내용</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm" for="form">약관</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="form">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="url">Url</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="url">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="db_list">db</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="db_list">
          </div>
        </div>

        <hr>

        <h5>옵션</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm" for="status">활성상태</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="status" :value="landing.status">
          </div>

          <label class="col-sm-3 col-form-label-sm" for="mobile">모바일 전용</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="mobile" :value="landing.mobile_only">
          </div>

        </div>

        <div class="form-group row">
          <div class="offset-10">
            <input type="submit" class="btn btn-info">
            <button class="btn btn-link">Cancel</button>
          </div>
        </div>
      </form>

    </div>

  </div>
</template>

<script>
    export default {
      name: "landing_detail",
      data: () => ({
        page_id: 0,
        landing: {}
      }),
      mounted() {
        this.page_id = this.$route.params.landing_id
        if (this.page_id === 0) {
          this.$router.push({
            name: 'landing_list'
          })
        }
        let axios = this.$axios
        let this_url = 'landing/'

        axios.get(this.$store.state.endpoints.baseUrl + this_url + this.page_id + '/')
          .then((response) => {
            this.landing = response.data
          })
      }
    }
</script>

<style scoped>

</style>
