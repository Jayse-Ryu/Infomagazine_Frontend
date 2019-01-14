<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/landing">랜딩 리스트</router-link>
      <span>></span>
      <router-link to="/landing/create">랜딩페이지 생성</router-link>
    </div>

    <div class="container" style="margin-top: 20px;">

      <form>

        <h5>기본정보</h5>
        <div class="form-group row">

          <label class="col-sm-3 col-form-label-sm mt-3" for="company_id">업체</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="company_id">
            <select class="form-control" name="company" id="company_">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="manager">관리자</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="manager">
            <select class="form-control" name="sel" id="sel">
              <option value="1">1</option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="landing">랜딩페이지 이름</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="landing">
          </div>

        </div>

        <hr>

        <h5>페이지 내용</h5>
        <div class="form-group row">
          <label class="col-sm-12 col-form-label-sm mt-3" for="page_title">페이지 타이틀</label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="page_title">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="header_script">헤더 스크립트</label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="header_script" rows="4"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="body_script">바디 스크립트</label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="body_script" rows="4"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="main_img">랜딩 레이아웃</label>
          <div class="col-sm-12">
            <div class="btn btn-dark" @click="check">check</div>
            <!--<input type="text" class="form-control" id="main_img">-->
            <div class="btn btn-primary" @click="layout_post">+</div>
            <div class="btn btn-primary" @click="layout_delete">-</div>
            <!--  -->
            <grid-layout
              class="landing_layout"
              :layout="layout"
              :col-num="1"
              :row-height="10"
              :is-draggable="true"
              :is-resizable="false"
              :is-mirrored="false"
              :auto-size="true"
              :vertical-compact="true"
              :margin="[15, 15]"
              :use-css-transforms="true"
            >

              <grid-item v-for="(item, index) in layout"
                         class="layout_item"
                         :x="item.x"
                         :y="item.y"
                         :w="item.w"
                         :h="item.h"
                         :i="item.i"
                         :key="index"
              >
                <div v-if="index === clicked" class="item_area bg-danger" @click="get_item(index)" @mouseup="check">{{item.i}}</div>
                <div v-else class="item_area bg-primary" @click="get_item(index)" @mouseup="check">{{item.i}}</div>
              </grid-item>
            </grid-layout>



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
              <!--<li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                  v-for="url in url_obj">
                <div class="col-3 p-2">{{ url.url }}</div>
                <div class="col-5 p-2">{{ url.description }}</div>
                <div class="col-2 p-2 text-center">{{ url.views }}</div>
                <button type="button" class="btn btn-outline-danger p-0 col-2" @click="delete_url">삭제</button>
              </li>-->
            </ul>
          </div>

          <hr style="width: 100%;">

<!--
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
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                  v-for="url in url_obj">
                &lt;!&ndash;DB part. not functioning yet&ndash;&gt;
                <div class="col-3 p-2">{{ url.url }}</div>
                <div class="col-7 p-2">{{ url.description }}</div>
                <button type="button" class="btn btn-outline-danger p-0 col-2">삭제</button>
              </li>
            </ul>
          </div>
-->


          <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지</label>
<!--

          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_switch">
              <input type="checkbox" id="term_switch" v-model="landing.image_switch">
              <span class="slider round"></span>
            </label>
          </div>
-->
        </div>
<!--

        <div class="form-group row" v-if="landing.image_switch">
          <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지 파일</label>

          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="form">
          </div>
        </div>
-->
<!--

        <div class="form-group row" v-else>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_title">약관 제목</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="form_title" placeholder="title" v-model="term_text.title">
          </div>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_cont">약관 내용</label>
          <div class="col-sm-9 mt-sm-3">
            <textarea type="text" class="form-control" id="form_cont" rows="4" placeholder="content"
                      v-model="term_text.content"></textarea>
          </div>
        </div>

-->
        <hr>
<!--

        <h5>옵션</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm mt-3" for="status">활성상태</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="status">
              <input type="checkbox" id="status" v-model="landing.status">
              <span class="slider round"></span>
            </label>
            &lt;!&ndash;<input type="text" class="form-control" id="status" v-model="landing.status">&ndash;&gt;
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="mobile">모바일 전용</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="mobile">
              <input type="checkbox" id="mobile" v-model="landing.mobile_only">
              <span class="slider round"></span>
            </label>
            &lt;!&ndash;<input type="text" class="form-control" id="mobile" v-model="landing.mobile_only">&ndash;&gt;
          </div>

        </div>

-->
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
  export default {
    name: "landing_create",
    data: () => ({
      landing_obj: {},
      landing_company: [],
      landing_manager: [],
      // layout: [],
      term_image: false,
      term_text: [],
      url_obj: {},
      clicked: -1,
      layout: [
        {"x":0,"y":0,"w":1,"h":5,"i":"0"},
        {"x":0,"y":1,"w":1,"h":5,"i":"1"},
        {"x":0,"y":2,"w":1,"h":5,"i":"2"},
        {"x":0,"y":3,"w":1,"h":5,"i":"3"},
        {"x":0,"y":4,"w":1,"h":5,"i":"4"},
      ]
    }),
    methods: {
      back_to_list() {
        this.$router.push({name: 'landing_list'})
      },
      check() {
        console.log('Checked!!', this.layout)
        let tmp = this.layout
      },
      layout_post() {
        let len = this.layout.length
        this.layout.push({"x":0,"y":0,"w":1,"h":5,"i":len})
        this.check()
      },
      layout_delete() {
        if(this.clicked !== -1) {
          if (this.clicked === 0) {
            this.layout.shift()
            this.clicked = -1
          } else {
            this.layout.splice(this.clicked, 1)
            this.clicked = -1
          }
        }
        this.check()
      },
      get_item(num) {
        this.clicked = num
      },
      delete_url() {
        console.log('del function!')
      },
    },
    mounted() {
      // Get company, manager
      let axios = this.$axios
      axios.get(this.$store.state.endpoints.baseUrl + 'company/')
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
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

  .landing_layout {
    background-color: #dedede;
    border-radius: 4px;
    min-height: 140px;
  }

  .layout_item {
    background-color: #efefef;
    border-radius: 8px;
    overflow: hidden;
  }

  .item_area {
    width: 100%;
    height: 100%;
  }
</style>
