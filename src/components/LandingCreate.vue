<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
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
            <select class="form-control" name="company" id="company_id">
              <option value="-1">선택하세요</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="manager">관리자</label>
          <div class="col-sm-9 mt-sm-3">
            <select class="form-control" name="sel" id="manager">
              <option value="-1">선택하세요</option>
              <option value="1">2</option>
              <option value="2">3</option>
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

          <label class="col-sm-3 col-form-label-sm mt-3" for="main_layout">랜딩 레이아웃</label>
          <div class="col-sm-12">
            <div class="col-12 mb-1">
              <div class="layout_control btn btn-primary" @click="layout_post">+</div>
              <div class="layout_control btn btn-danger" @click="layout_delete">-</div>
              <div class="btn btn-dark" @click="check">check</div>
            </div>

            <grid-layout
              class="landing_layout"
              id="main_layout"
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
                         :x="0"
                         :y="item.y"
                         :w="1"
                         :h="5"
                         :i="item.i"
                         :key="index"
              >
                <div v-if="item.i === clicked" class="item_area bg-danger" @mouseup="check(item.i)">{{item.i}}</div>
                <div v-else class="item_area bg-primary" @mouseup="check(item.i)">{{item.i}}</div>
              </grid-item>
            </grid-layout>

            <div class="form-group row mb-0">

              <label class="col-sm-3 col-form-label-sm mt-3" for="layout_font">레이아웃 폰트</label>
              <div class="col-sm-9 mt-sm-3 row ml-0">
                <select class="form-control" name="layout_font" id="layout_font">
                  <option value="0">Font 1</option>
                  <option value="1">Font 2</option>
                  <option value="2">Font 3</option>
                </select>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_db">레이아웃 내 DB</label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_db">
                  <input type="checkbox" id="in_db">
                  <span class="slider round"></span>
                </label>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_company">사업자 표기</label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_company">
                  <input type="checkbox" id="in_company">
                  <span class="slider round"></span>
                </label>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_banner">띠배너</label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_banner">
                  <input type="checkbox" id="in_banner" v-model="is_banner">
                  <span class="slider round"></span>
                </label>
              </div>

              <label v-if="is_banner" class="col-sm-3 col-form-label-sm mt-3" for="url_title">띠배너 옵션</label>
              <div v-if="is_banner" class="col-sm-9 mt-sm-3 row ml-0">
                <input type="file" class="form-control col-sm-5 col-md-5 pt-1" id="in_banner_img" placeholder="이미지">
                <div class="margin_div"></div>
                <input type="text" class="form-control col-sm-7 col-md-5" id="in_banner_desc" placeholder="띠배너 주소">
                <div class="margin_div"></div>
                <button class="btn btn-primary col-md-1 p-0">추가</button>
              </div>
            </div>

          </div>
        </div>

        <hr>

        <h5>DB</h5>
        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_group">DB 폼 그룹</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <input type="text" class="input_one_btn form-control col-md-11" id="form_group" placeholder="폼 그룹 이름">
            <button class="btn btn-primary col-md-1 p-0">추가</button>
          </div>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_group_del"></label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <select class="input_one_btn form-control col-md-11" name="form_del" id="form_group_del" v-model="is_group">
              <option value="-1">그룹을 선택하세요</option>
              <option value="0">form_1</option>
              <option value="1">form_2</option>
              <option value="2">form_3</option>
            </select>
            <button class="btn btn-danger col-md-1 p-0">삭제</button>
          </div>

          <!-- Somehow !== is not responsible -->
          <label v-if="is_group != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_bg">폼 배경색</label>
          <div v-if="is_group != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="color_wrap form-control col-1" id="form_group_bg">
              <input type="color" v-model="bg_color" class="color_picker">
            </div>
            <div class="margin_div"></div>
            <input type="text" v-model="bg_color" class="form-control col-2" maxlength="7">
          </div>

          <label v-if="is_group != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_col">폼 폰트색</label>
          <div v-if="is_group != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="color_wrap form-control col-1" id="form_group_col">
              <input type="color" v-model="tx_color" class="color_picker">
            </div>
            <div class="margin_div"></div>
            <input type="text" v-model="tx_color" class="form-control col-2" maxlength="7">
          </div>

        </div>

        <hr>

        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="db_field">DB 필드</label>
          <div class="col-sm-2 mt-sm-3">
            <select class="form-control" name="company" id="db_field">
              <option value="-1">선택하세요</option>
              <option value="1">Text</option>
              <option value="2">Number</option>
              <option value="3">Select</option>
              <option value="4">Radio</option>
              <option value="5">Check</option>
              <option value="6">Date</option>
              <option value="7">Url</option>
              <option value="8">Tel</option>
            </select>
            <input type="text">
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
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                  v-for="url in url_obj">
                <div class="col-3 p-2">{{ url.url }}</div>
                <div class="col-5 p-2">{{ url.description }}</div>
                <div class="col-2 p-2 text-center">{{ url.views }}</div>
                <button type="button" class="btn btn-outline-danger p-0 col-2" @click="delete_url">삭제</button>
              </li>
            </ul>
          </div>

          <hr>

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

          <!--
                    <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지</label>

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
            <button type="submit" class="btn btn-primary col-12">생성</button>
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
      term_image: false,
      term_text: [],
      url_obj: {},
      clicked: -1,
      layout: [
        {"x": 0, "y": 0, "w": 1, "h": 5, "i": "0"},
        {"x": 0, "y": 1, "w": 1, "h": 5, "i": "1"},
        {"x": 0, "y": 2, "w": 1, "h": 5, "i": "2"},
        {"x": 0, "y": 3, "w": 1, "h": 5, "i": "3"},
        {"x": 0, "y": 4, "w": 1, "h": 5, "i": "4"},
      ],
      len: 0,
      is_banner: false,
      is_group: 1,
      bg_color: '#c3c83a',
      tx_color: '#414141'
    }),
    methods: {
      back_to_list() {
        this.$router.push({name: 'landing_list'})
      },
      check(num) {
        this.clicked = num
        let sort = this.layout
        console.log('max test', sort.i)
        sort.sort((a, b) => (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0))
        console.log('sorted tmp', sort)
      },
      layout_post() {
        let len = this.len
        this.layout.push({"x": 0, "y": 0, "w": 1, "h": 5, "i": len + 1})
        this.len += 1
        this.check()
      },
      layout_delete() {
        for (let i = 0; i < this.layout.length; i++) {
          if (this.layout[i].i === this.clicked) {
            console.log('get i obj?', this.layout[i])
            if (i === 0) {
              this.layout.shift()
              this.clicked = -1
            } else {
              this.layout.splice(i, 1)
              this.clicked = -1
            }
          }
        }
        this.check()
      },
      // get_item(num) {
      //   this.clicked = num
      // },
      delete_url() {
        console.log('del function!')
      },
    },
    mounted() {
      this.len = this.layout.length
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
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    },
    watch: {
      // is_group() {
      //   console.log('Checked!!', this.layout)
      // }
    }
  }
</script>

<style scoped>
  hr {
    width: 100%;
  }

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

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .term_label {
    display: inline-block;
  }
  /*====*/

  /* margin dummy div */
  .margin_div {
    display: inline-block;
    width: 4%;
  }
  @media (max-width: 768px) {
    .margin_div {
      display: none;
    }
  }
  /*==*/

  .input_one_btn {
    max-width: 720px;
    margin-right: auto;
  }

  .layout_control {
    width: 60px;
    height: 30px;
    padding: 0;
    margin: 5px 0 5px 5px;
    font-size: 19px;
    font-weight: bold;
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
    transition: all 250ms ease-out;
  }

  .color_wrap {
    overflow: hidden;
  }

  .color_picker {
    position: relative;
    width: 200%;
    height: 200%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
