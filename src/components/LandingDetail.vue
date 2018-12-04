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
          <label class="col-sm-3 col-form-label-sm mt-3" for="page_id">페이지 ID</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" disabled class="form-control" id="page_id" v-model="landing.id">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="company_id">업체명</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" disabled class="form-control" id="company_id" v-model="landing_company">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="manager">관리자</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" disabled class="form-control" id="manager" v-model="landing_manager">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="landing">랜딩페이지 명</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="landing" v-model="landing.name">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="views">페이지 조회 수</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" disabled class="form-control" id="views" v-model="landing.views">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="db">데이터 수집 수</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" disabled class="form-control" id="db" v-model="landing.hits">
          </div>
        </div>

        <hr>

        <h5>페이지 내용</h5>
        <div class="form-group row">
          <label class="col-sm-12 col-form-label-sm mt-3" for="page_title">페이지 타이틀</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="page_title" v-model="landing.title">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="header_script">헤더 스크립트</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="header_script" v-model="landing.header_script">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="body_script">바디 스크립트</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="body_script" v-model="landing.body_script">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="main_img">페이지 이미지</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="main_img">
            <input type="file" class="form-control-file" id="main_">
          </div>
        </div>

        <hr>

        <h5>추가내용</h5>
        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="url">Url</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="url">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="db_list">DB</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="db_list">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 (이미지 On)</label>

          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_switch">
              <input type="checkbox" id="term_switch" v-model="landing.image_switch">
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="form-group row" v-if="landing.image_switch">
          <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지</label>

          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="form">
          </div>
        </div>

        <div class="form-group row" v-else>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_title">약관 제목</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="form_title" placeholder="title" v-model="term_text.title">
          </div>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_cont">약관 내용</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="form_cont" placeholder="content" v-model="term_text.content">
          </div>
        </div>

        <hr>

        <h5>옵션</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm mt-3" for="status">활성상태</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="status">
              <input type="checkbox" id="status" v-model="landing.status">
              <span class="slider round"></span>
            </label>
            <!--<input type="text" class="form-control" id="status" v-model="landing.status">-->
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="mobile">모바일 전용</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="mobile">
              <input type="checkbox" id="mobile" v-model="landing.mobile_only">
              <span class="slider round"></span>
            </label>
            <!--<input type="text" class="form-control" id="mobile" v-model="landing.mobile_only">-->
          </div>

        </div>

        <div class="form-group row">
          <div class="offset-10">
            <input type="submit" class="btn btn-info">
            <button class="btn btn-link" @click="back_to_list">Cancel</button>
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
        landing: {},
        landing_company: '',
        landing_manager: '',
        term_image: false,
        term_text: ''
      }),
      methods: {
        back_to_list: function() {
          this.$router.push({name: 'landing_list'})
        }
      },
      mounted() {
        // get id from url
        this.page_id = this.$route.params.landing_id

        // if page int is default, push to list page
        if (this.page_id === 0) {
          this.$router.push({
            name: 'landing_list'
          })
        }

        // nor, start loading page contents
        let axios = this.$axios
        let this_url = ''

        // get page contents as url id
        this_url = 'landing/'
        this.$nextTick(function () {
            axios.get(this.$store.state.endpoints.baseUrl + this_url + this.page_id + '/')
              .then((response) => {
                let res_contents = response
                this.landing = res_contents.data
                this.landing.company_name = ''
                this.landing.manager_name = ''
                console.log('inner landing', this.landing)
                this_url = 'company/'
                return axios.get(this.$store.state.endpoints.baseUrl + this_url + res_contents.data.company + '/')
              })
              .then((response) => {
                let res_company = response
                this.landing_company = res_company.data.name
                this_url = 'users/'
                return axios.get(this.$store.state.endpoints.baseUrl + this_url + res_company.data.manager + '/')
              })
              .then((response) => {
                let res_manager = response
                this.landing_manager = res_manager.data.full_name
              })
              .catch((err) => {
                console.log('FAIL', err)
              })
            this_url = 'term/'
            axios.get(this.$store.state.endpoints.baseUrl + this_url + this.page_id + '/')
              .then((response) => {
                this.term_text = response.data
                console.log(this.term_text)
              })
        })
      }
    }
</script>

<style scoped>
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .term_label {
    display: inline-block;
  }
</style>
