<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
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
            <textarea type="text" class="form-control" id="header_script" rows="4" v-model="landing.header_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="body_script">바디 스크립트</label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="body_script" rows="4" v-model="landing.body_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="main_img">페이지 이미지</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="main_img">
            <!--<input type="file" class="form-control-file" id="main_">-->
            <!--<upload-image :url="$store.state.endpoints.baseUrl + 'files/'" />-->

            <!--<dropzone id="6" ref="el" :options="options" :destroyDropzone="true"></dropzone>-->

            <!--<dropzone/>-->

          </div>
        </div>

        <hr>

        <h5>추가내용</h5>
        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="url_title">Url</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <input type="text" class="form-control col-sm-5 col-md-5" id="url_title" placeholder="Url 주소">
            <div class="margin_div"></div>
            <input type="text" class="form-control col-sm-7 col-md-5" id="url_desc" placeholder="Url 설명">
            <div class="margin_div"></div>
            <button class="btn btn-primary col-md-1 p-0">추가</button>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="url_list">Url 리스트</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <ul class="list-group list-group-flush col-12 pr-0" id="url_list">
              <li class="list-group-item list-group-item-action d-inline-flex p-1 font-weight-bold">
                <div class="col-3 p-2">Url 주소</div>
                <div class="col-5 p-2">Url 설명</div>
                <div class="col-2 p-2 text-center">조회수</div>
              </li>
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1" v-for="url in url_obj">
                <div class="col-3 p-2">{{ url.url }}</div>
                <div class="col-5 p-2">{{ url.description }}</div>
                <div class="col-2 p-2 text-center">{{ url.views }}</div>
                <button type="button" class="btn btn-outline-danger p-0 col-2" @submit.prevent="delete_url">삭제</button>
              </li>
            </ul>
          </div>

          <hr style="width: 100%;">

          <label class="col-sm-3 col-form-label-sm mt-3" for="db_list">DB</label>
          <div class="col-sm-9 mt-sm-3  row ml-0">
            <select class="custom-select col-sm-5" id="db_select">
              <option value="0">DB 필드</option>
              <option value="1">전화번호</option>
              <option value="2">Url</option>
            </select>
            <div class="margin_div"></div>
            <input type="text" class="form-control col-sm-7 col-md-5" id="db_list">
            <div class="margin_div"></div>
            <button class="btn btn-primary col-md-1 p-0">추가</button>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="field_list">DB 리스트</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <ul class="list-group list-group-flush col-12 pr-0" id="field_list">
              <li class="list-group-item list-group-item-action d-inline-flex p-1 font-weight-bold">
                <div class="col-3 p-2">DB 형식</div>
                <div class="col-7 p-2">DB 필드</div>
              </li>
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1" v-for="url in url_obj">
                <!--DB part. not functioning yet-->
                <div class="col-3 p-2">{{ url.url }}</div>
                <div class="col-7 p-2">{{ url.description }}</div>
                <button type="button" class="btn btn-outline-danger p-0 col-2">삭제</button>
              </li>
            </ul>
          </div>


          <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지</label>

          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_switch">
              <input type="checkbox" id="term_switch" v-model="landing.image_switch">
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="form-group row" v-if="landing.image_switch">
          <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지 파일</label>

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
            <textarea type="text" class="form-control" id="form_cont" rows="4" placeholder="content" v-model="term_text.content"></textarea>
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

        <hr>

        <div class="form-group row">
          <div class="col-12">
            <button type="submit" class="btn btn-primary col-12">저장</button>
            <router-link to="/landing">
              <button type="button" class="btn btn-dark col-12 mt-2">취소</button>
            </router-link>
          </div>
        </div>
      </form>

    </div>

  </div>
</template>

<script>
  // import Dropzone from 'nuxt-dropzone'
  // import 'nuxt-dropzone/dropzone.css'
  // import Dropzone from 'nuxt-dropzone'
    export default {
      name: "landing_detail",
      // components: {
      //   Dropzone
      // },
      data: () => ({
        // options: this.$store.state.endpoints.baseUrl + 'files/',
        page_id: 0,
        landing: {},
        landing_company: '',
        landing_manager: '',
        term_image: false,
        term_text: [],
        url_obj: [],
      }),
      methods: {
        back_to_list: function() {
          this.$router.push({name: 'landing_list'})
        }
      },
      method: {
        delete_url() {
          console.log('del function!')
          // this.$nextTick(function () {
          //   console.log(url_id)
          //   let axios = this.$axios
          //   let this_url = 'urls/'
          //   axios.delete(this.$store.state.endpoints.baseUrl + this_url + url_id + '/')
          //     .then((response) => {
          //       console.log(response)
          //     })
          //     .catch((err) => {
          //       console.log(err)
          //     })
          // })
        }
      },
      mounted() {
        // get id from url
        this.page_id = this.$route.params.landing_id * 1

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
        // this.$nextTick(function () {
          axios.get(this.$store.state.endpoints.baseUrl + this_url + this.page_id + '/')
            .then((response) => {
              let res_contents = response
              this.landing = res_contents.data
              this.landing.company_name = ''
              this.landing.manager_name = ''
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
          // Get term
          this_url = 'term/'
          axios.get(this.$store.state.endpoints.baseUrl + this_url)
            .then((response) => {
              for(let i = 0; i < response.data.length; i++) {
                if (response.data[i].landing_page * 1 === this.page_id) {
                  this.term_text = response.data[i]
                }
              }
            })
            .catch((err) => {
              console.log('FAIL', err)
            })
          // Get urls
          this_url = 'urls/'
          axios.get(this.$store.state.endpoints.baseUrl + this_url)
            .then((response) => {
              let res_url = response.data
              for (let i = 0; i < res_url.length; i ++) {
                if (res_url[i].landing_page === this.page_id) {
                  this.url_obj.push(res_url[i])
                }
              }
            })
            .catch((err) => {
              console.log('Failed', err)
            })
        // })
      },
      update() {
        if (this.$store.state.jwt !== null) {
          this.$store.dispatch('getAuthUser')
        }
      }
    }
</script>

<style scoped>
  /* ios switch */
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
    background-color: #287BFF;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #287BFF;
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
  /* ios Switch */

  .term_label {
    display: inline-block;
  }

  .margin_div {
    display: inline-block;
    width: 4%;
  }

  @media (max-width: 768px) {
    .margin_div {
      display: none;
    }
  }


</style>
