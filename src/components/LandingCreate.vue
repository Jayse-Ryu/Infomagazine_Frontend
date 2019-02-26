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

      <form v-on:submit.prevent="landing_check">
        <h5>기본정보</h5>
        <div class="form-group row">

          <label class="col-sm-3 col-form-label-sm mt-3" for="company_id">업체*</label>
          <div class="col-sm-9 mt-sm-3">
            <select class="form-control" name="company" id="company_id" v-model="landing_obj.company">
              <option value="-1">선택하세요</option>
              <option v-for="content in landing_company" :value="content.id">
                {{content.name }} - {{ content.sub_name }}
              </option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="manager">관리자*</label>
          <div class="col-sm-9 mt-sm-3">
            <select class="form-control" name="sel" id="manager" v-model="landing_obj.manager">
              <option value="-1">선택하세요</option>
              <option v-for="content in landing_manager" :value="content.user">
                {{content.account }} - {{ content.user_name }}
              </option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="landing">랜딩페이지 이름*</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="landing" maxlength="50" v-model="landing_obj.name">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="base_url"><span>메인 URL*</span>
            <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768" v-tooltip="{content: msg.base_url, placement: 'right',
                            offset: 5,
                            trigger: 'hover',
                            }">?</span>
            <span class="question badge btn-secondary p-1 align-middle" v-else v-tooltip="{content: msg.base_url, placement: 'right',
                            offset: 5,
                            trigger: 'click',
                            }">?</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="base_url" maxlength="30" v-model="landing_obj.base_url">
          </div>

        </div>

        <hr>

        <h5>페이지 내용</h5>
        <div class="form-group row">
          <label class="col-sm-12 col-form-label-sm mt-3" for="page_title"><span>페이지 타이틀</span>
            <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768" v-tooltip="{content: msg.title, placement: 'right',
                            offset: 5,
                            trigger: 'hover',
                            }">?</span>
            <span class="question badge btn-secondary p-1" v-else v-tooltip="{content: msg.title, placement: 'right',
                            offset: 5,
                            trigger: 'click',
                            }">?</span>
          </label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="page_title" maxlength="50" v-model="landing_obj.title">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="header_script">헤더 스크립트</label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="header_script" rows="4" v-model="landing_obj.header_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="body_script">바디 스크립트</label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="body_script" rows="4" v-model="landing_obj.body_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="main_layout">랜딩 레이아웃</label>
          <div class="col-sm-12">
            <!--
            <div class="col-12 mb-1">
              <div class="layout_control btn btn-primary" @click="layout_post">+</div>
              <div class="layout_control btn btn-danger" @click="layout_delete">-</div>
              <div class="btn btn-dark" @click="check">check</div>
            </div>
            -->

            <!--
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
            -->

            <div id="main_layout">
              <div class="basket">
                <vue-draggable-resizable v-for="item in layout"
                                         parent=".basket"
                                         class="drag_thing"
                                         class-name-dragging="drag_thing_drag"
                                         class-name-handle="drag_handle"
                                         :parent="true"
                                         :key="item.z"
                                         :min-width="100"
                                         :min-height="100"
                                         :grid=[5,5]
                                         :lock-aspect-ratio="true">
                  <p>Drag box</p>
                </vue-draggable-resizable>

                <vue-draggable-resizable class="drag_thing"
                                         class-name-dragging="drag_thing_drag"
                                         class-name-handle="drag_handle"
                                         :parent="true"
                                         :grid=[5,5]>
                  <form class="form-group">
                    <label class="col-sm-3 col-form-label-sm mt-3" for="form_g">DB 폼 그룹</label>
                    <div class="col-sm-9 mt-sm-3 row ml-0">
                      <input type="text" class="input_one_btn form-control col-md-11" id="form_g" placeholder="폼 그룹 이름">
                      <button class="btn btn-primary col-md-1 p-0">추가</button>
                    </div>
                  </form>
                </vue-draggable-resizable>

              </div>
            </div>

            <div class="form-group row mb-0">

              <label class="col-sm-3 col-form-label-sm mt-3" for="layout_font">레이아웃 폰트</label>
              <div class="col-sm-9 mt-sm-3 row ml-0">
                <select class="form-control" name="layout_font" id="layout_font" v-model="layout_obj.font">
                  <option value="-1">OS 기본</option>
                  <option value="1">Font 2</option>
                  <option value="2">Font 3</option>
                </select>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_db"><span>레이아웃 내 DB</span>
                <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768" v-tooltip="{content: msg.in_db, placement: 'right',
                            offset: 5,
                            trigger: 'hover',
                            }">?</span>
                <span class="question badge btn-secondary p-1 align-middle" v-else v-tooltip="{content: msg.in_db, placement: 'right',
                            offset: 5,
                            trigger: 'click',
                            }">?</span>
              </label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_db">
                  <input type="checkbox" id="in_db" v-model="layout_obj.inner_db">
                  <span class="slider round"></span>
                </label>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_company">사업자 표기</label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_company" v-model="layout_obj.show_company">
                  <input type="checkbox" id="in_company">
                  <span class="slider round"></span>
                </label>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_banner"><span>띠배너</span>
                <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768" v-tooltip="{content: msg.in_banner, placement: 'right',
                            offset: 5,
                            trigger: 'hover',
                            }">?</span>
                <span class="question badge btn-secondary p-1 align-middle" v-else v-tooltip="{content: msg.in_banner, placement: 'right',
                            offset: 5,
                            trigger: 'click',
                            }">?</span>
              </label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_banner">
                  <input type="checkbox" id="in_banner" v-model="layout_obj.is_banner">
                  <span class="slider round"></span>
                </label>
              </div>

              <label v-if="layout_obj.is_banner" class="col-sm-3 col-form-label-sm mt-3" for="url_title">띠배너 옵션</label>
              <div v-if="layout_obj.is_banner" class="col-sm-9 mt-sm-3 row ml-0">
                <input type="file" class="form-control col-sm-5 col-md-5 pt-1" id="in_banner_img" placeholder="이미지">
                <div class="margin_div"></div>
                <input type="text" class="form-control col-sm-7 col-md-5" id="in_banner_desc" placeholder="띠배너 주소" v-model="layout_obj.banner_url">
                <div class="margin_div"></div>
                <button type="button" class="btn btn-primary col-md-1 p-0">추가</button>
              </div>
            </div>

          </div>
        </div>

        <hr>

        <h5>DB</h5>
        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_group">DB 폼 그룹</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <input type="text" class="input_one_btn form-control col-md-11" id="form_group" placeholder="폼 그룹 이름" maxlength="50" v-model="form_temp">
            <button type="button" class="btn btn-primary col-md-1 p-0" @click.prevent="form_group_add">추가</button>
          </div>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_group_list"></label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <select class="input_one_btn form-control col-md-11" name="form_group_list" id="form_group_list" v-model="form_arrow" @change="form_changed(form_arrow)">
              <option value="-1">그룹을 선택하세요</option>
              <option v-for="item in form_obj" :value="item.sign">{{ item.name }}</option>
            </select>
            <button type="button" class="btn btn-danger col-md-1 p-0" @click.prevent="form_group_delete(form_selected.sign)">삭제</button>
          </div>

          <!-- Somehow !== is not responsible -->
          <label v-if="form_selected.sign != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_bg">폼 배경색</label>
          <div v-if="form_selected.sign != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="color_wrap form-control col-sm-2" id="form_group_bg">
              <input type="color" v-model="form_selected.bg_color" class="color_picker">
            </div>
            <div class="margin_div"></div>
            <input type="text" v-model="form_selected.bg_color" class="form-control col-sm-3" maxlength="7">
          </div>

          <label v-if="form_selected.sign != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_col">폼 폰트색</label>
          <div v-if="form_selected.sign != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="color_wrap form-control col-sm-2" id="form_group_col">
              <input type="color" v-model="form_selected.tx_color" class="color_picker">
            </div>
            <div class="margin_div"></div>
            <input type="text" v-model="form_selected.tx_color" class="form-control col-sm-3" maxlength="7">
          </div>
        </div>

        <div class="form-group row mb-0" v-if="form_selected.sign != -1">
          <label class="col-sm-3 col-form-label-sm mt-3" for="db_field">DB 필드</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <select class="form-control col-sm-5 col-md-5" name="company" id="db_field" v-model="field_selected">
              <option value="-1">타입을 선택하세요</option>
              <option value="1">텍스트</option>
              <option value="2">번호</option>
              <option value="3">선택 스크롤</option>
              <option value="4">선택 버튼</option>
              <option value="5">체크박스</option>
              <option value="6">날짜</option>
              <option value="7">링크</option>
              <option value="8">전화걸기</option>
            </select>
            <div class="margin_div"></div>
            <input type="text" class="form-control col-sm-7 col-md-5" placeholder="필드이름" maxlength="10" v-model="field_temp_name">
            <div class="margin_div"></div>
            <button class="btn btn-primary col-md-1 p-0" @click.prevent="field_add">추가</button>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="form_field_list">필드 리스트</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <ul class="list-group list-group-flush col-12 pr-0" id="form_field_list">
              <li class="list-group-item list-group-item-action d-inline-flex p-1 font-weight-bold">
                <div class="col-3 p-2 text-center" style="word-break: keep-all;">필드 타입</div>
                <div class="col-3 p-2 text-center" style="word-break: keep-all;">필드 이름</div>
                <div class="col-6 p-2 text-center">옵션</div>
              </li>
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                  v-for="content in field_obj">
                <div class="col-3 p-2 text-center" v-if="content.type == 1">텍스트</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 2">번호</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 3">선택 스크롤</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 4">선택 버튼</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 5">체크박스</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 6">날짜</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 7">링크</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 8">전화걸기</div>
                <div class="col-3 p-2 text-center">{{ content.name }}</div>
                <button type="button" class="btn btn-outline-info p-0 col-3 col-sm-2 m-auto" data-toggle="collapse" v-bind:href="'#collapse_option'+ content.sign" aria-expanded="false">설정</button>
                <button type="button" class="btn btn-outline-danger p-0 col-3 col-sm-2 m-auto" @click="field_delete(content.sign)">삭제</button>
                <div class="field_option_wrap collapse" v-bind:id="'collapse_option'+ content.sign" data-parent="#form_field_list">
                  <div>
                    <div class="form-group row p-4">
                      <label class="col-sm-3 col-form-label-sm mt-3" for="f_name">필드 이름*</label>
                      <div class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_name" maxlength="10" v-model="content.name">
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr>

        <h5>추가내용</h5>
        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="url_title">Url</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <input type="text" class="form-control col-sm-5 col-md-5" id="url_title" placeholder="Url 주소" v-model="url_temp.url">
            <div class="margin_div"></div>
            <input type="text" class="form-control col-sm-7 col-md-5" id="url_desc" placeholder="Url 설명" v-model="url_temp.desc">
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
                      <button type="button" class="btn btn-primary col-md-1 p-0">추가</button>
                    </div>

                    <label class="col-sm-3 col-form-label-sm mt-3" for="field_list">DB 리스트</label>
                    <div class="col-sm-9 mt-sm-3 row ml-0">
                      <ul class="list-group list-group-flush col-12 pr-0" id="field_list">
                        <li class="list-group-item list-group-item-action d-inline-flex p-1 font-weight-bold">
                          <div class="col-3 p-2">DB 형식</div>
                          <div class="col-7 p-2">DB 필드</div>
                        </li>
                        <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                            v-for="url in landing_obj">
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
                        <input type="checkbox" id="term_switch" v-model="layout_obj.image_term">
                        <span class="slider round"></span>
                      </label>
                    </div>
        </div>

                <div class="form-group row" v-if="term_obj.image">
                  <label class="col-sm-3 col-form-label-sm mt-3" for="form">약관 이미지 파일</label>

                  <div class="col-sm-9 mt-sm-3">
                    <input type="text" class="form-control" id="form">
                  </div>
                </div>

                <div class="form-group row" v-else>
                  <label class="col-sm-3 col-form-label-sm mt-3" for="form_title">약관 제목</label>
                  <div class="col-sm-9 mt-sm-3">
                    <input type="text" class="form-control" id="form_title" placeholder="title" v-model="term_obj.title">
                  </div>
                  <label class="col-sm-3 col-form-label-sm mt-3" for="form_cont">약관 내용</label>
                  <div class="col-sm-9 mt-sm-3">
                    <textarea type="text" class="form-control" id="form_cont" rows="4" placeholder="content"
                              v-model="term_obj.content"></textarea>
                  </div>
                </div>

        <hr>

                <h5>옵션</h5>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label-sm mt-3" for="status">활성상태</label>
                  <div class="col-sm-9 mt-sm-3">
                    <label class="switch" for="status">
                      <input type="checkbox" id="status" v-model="landing_obj.status">
                      <span class="slider round"></span>
                    </label>
                  </div>

                  <label class="col-sm-3 col-form-label-sm mt-3" for="mobile">모바일 전용</label>
                  <div class="col-sm-9 mt-sm-3">
                    <label class="switch" for="mobile">
                      <input type="checkbox" id="mobile" v-model="landing_obj.mobile_only">
                      <span class="slider round"></span>
                    </label>
                  </div>

                </div>

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
      window_width: window.innerWidth,
      // msg is Tooltip messages. Static name by api.
      msg: {
        base_url: '기본 주소를 지정합니다.',
        title: '사이트 내부 제목입니다.',
        in_db: '레이아웃 내부에 DB 폼그룹을 위치시키거나 팝업으로 대체합니다.',
        in_banner: '스크롤 시 따라다니는 배너를 생성합니다.'
      },
      // Get org's companies and managers
      landing_company: [],
      landing_manager: [],
      // // // Actual obj data what will be saved
      // // Landing db
      landing_obj: {
        company: -1,
        manager: -1
      },
      // // Layout db
      layout_obj: {
        font: -1
      },
      // Temp order
      layout: [
        {"x": 0, "y": 0, "w": 1, "h": 5, "z": "0"},
        {"x": 0, "y": 1, "w": 1, "h": 5, "z": "1"},
        {"x": 0, "y": 2, "w": 1, "h": 5, "z": "2"},
        {"x": 0, "y": 3, "w": 1, "h": 5, "z": "3"},
        {"x": 0, "y": 4, "w": 1, "h": 5, "z": "4"},
      ],
      // // Order db
      order_obj: [],
      // // Form-group db
      // Form name for make one
      form_temp: '',
      // Form colors, fields
      form_arrow: -1,
      form_selected: {
        sign: -1,
        bg_color: '#f9f9f9',
        tx_color: '#313131'
      },
      form_obj: [],
      // // Set fields for form group
      field_selected: -1,
      field_temp_name: '',
      field_obj: [],
      // // // Term info
      term_image: false,
      term_text: [],
      url_temp: {},
      url_obj: {},
      term_obj: {},
      clicked: -1,
      len: 0,
      is_group: 1,
    }),
    methods: {
      back_to_list() {
        this.$router.push({name: 'landing_list'})
      },
      // Temporary layout grid system
      check(num) {
        this.clicked = num
        let sort = this.layout
        // console.log('max test', sort.i)
        sort.sort((a, b) => (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0))
        // console.log('sorted tmp', sort)
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
      }, // temp grid system ended
      // // // URL Functions
      url_delete() {
        console.log('del function!')
      },
      // // // Form groups
      // add form group
      form_group_add() {
        if (this.form_temp) {
          let len = this.form_obj.length
          let flag = true
          if (len) {
            for(let i = 0; i < len; i++) {
              if (this.form_obj[i].name === this.form_temp) {
                alert('폼 그룹 이름이 이미 존재합니다.')
                flag = false
                return flag
              }
            }
            if(flag) {
              let highest = 0
              for(let i = 0; i < len; i++) {
                if (this.form_obj[i].sign > highest) {
                  highest = this.form_obj[i].sign
                }
              }
              this.form_obj.push({sign: highest+1, name: this.form_temp, bg_color: '#f0f0f0', tx_color: '#313131'})
              this.form_temp = ''
              alert('폼 그룹이 생성되었습니다.')
            }
          } else {
            this.form_obj.push({sign: 1, name: this.form_temp, bg_color: '#f0f0f0', tx_color: '#313131'})
            this.form_temp = ''
            alert('폼 그룹이 생성되었습니다.')
          }
        } else {
          alert('폼 그룹 이름을 입력하세요!')
        }
      },
      // delete form group
      form_group_delete(id) {
        if(id !== -1) {
          if(confirm('이 폼그룹을 삭제하시겠습니까?')){
            this.form_obj = this.form_obj.filter(el => el.sign != id)
            this.form_arrow = -1
            this.form_selected = {sign: -1, tx_color: '#313131', bg_color:'#f9f9f9'}
          }
        } else {
          alert('그룹을 먼저 선택하세요.')
        }
      },
      // catch when form is changed
      form_changed(id) {
        if(id == -1) {
          this.form_selected = {sign: -1, tx_color: '#313131', bg_color: '#f0f0f0'}
        } else {
          for(let i = 0; i < this.form_obj.length; i++) {
            if(this.form_obj[i].sign == id) {
              this.form_selected = this.form_obj[i]
            }
          }
        }
      },
      // // add field
      field_add() {
        // get form group sign
        if(this.form_selected.sign != -1) {
          // get field type and field name
          if(this.field_selected != -1 && this.field_temp_name) {
            // if field object is not empty
            if(this.field_obj.length != 0) {
              let highest = 0
              let flag = true
              for(let i = 0; i < this.field_obj.length; i++) {
                if(this.field_temp_name == this.field_obj[i].name) {
                  alert('이미 존재하는 필드 이름입니다.')
                  flag = false
                  return flag
                }
              }
              if (flag) {
                for(let i = 0; i < this.field_obj.length; i++) {
                  if (this.field_obj[i].sign > highest) {
                    highest = this.field_obj[i].sign
                  }
                }
              }
              this.field_obj.push({sign: highest + 1, type: this.field_selected, name: this.field_temp_name})
              this.field_temp_name = ''
            } else {
              this.field_obj.push({sign: 1, type: this.field_selected, name: this.field_temp_name})
              this.field_temp_name = ''
            }
            this.field_obj.push()
          } else {
            alert('필드 타입과 내용을 입력하세요.')
            document.getElementById('db_field').focus()
          }
        } else {
          alert('폼 그룹을 먼저 선택하세요.')
          document.getElementById('form_group_list').focus()
        }
      },
      field_delete(id) {
        console.log(id)
      },
      // // // Check for make landing obj
      landing_check() {
        // Start validate before create
        this.$validator.validateAll()
        // Empty filtering first
        if (this.landing_obj.company == -1) {
          alert('업체를 선택하세요!')
          document.getElementById('company_id').focus()
        } else if (this.landing_obj.manager == -1) {
          alert('관리자를 선택하세요!')
          document.getElementById('manager').focus()
        } else if (!this.landing_obj.name) {
          alert('랜딩페이지 이름을 입력하세요!')
          document.getElementById('landing').focus()
        } else if (!this.landing_obj.base_url) {
          alert('메인 URL을 입력하세요!')
          document.getElementById('base_url').focus()
        } else {
          console.log('landing obj = ', this.landing_obj)
          this.landing_create()
        }
      },
      landing_create() {
        console.log('create landing function!')
      },
    },
    mounted() {
      // Window width calculator
      this.$nextTick(function () {
        window.addEventListener('resize', function (e) {
          this.window_width = window.innerWidth
        })
      })
      this.len = this.layout.length
      // Get company, manager
      let axios = this.$axios
      // Get companies from logged in user's organization
      let this_url = 'company/'
      axios.get(this.$store.state.endpoints.baseUrl + this_url + '?organization=' + this.access_obj.organization)
        .then((response) => {
          this.landing_company = response.data.results
        })
        .catch((error) => {
          console.log(error)
        })
      // Get manager from logged in user's organization
      this_url = 'user_access/'
      axios.get(this.$store.state.endpoints.baseUrl + this_url + '?organization=' + this.access_obj.organization)
        .then((response) => {
          this.landing_manager = response.data.results
        })
        .catch((error) => {
          console.log(error)
        })
    },
    computed: {
      user_obj() {
        // Get user information
        let user = this.$store.state.authUser
        return user
      },
      access_obj() {
        // Get access information the user
        let access = this.$store.state.userAccess
        return access
      }
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
    width: 500%;
    height: 300%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .basket {
    border: 1px solid #414141;
    width: 1200px;
    min-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }

  .drag_thing {
    /*position: absolute;*/
    /*display: inline-block;*/
    background-color: #eaeaea;
    border: 1px solid #818181;
  }

  .field_option_wrap {
    position: absolute;
    width: calc(100% - 10px);
    background-color: #f5f5f5;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    margin: auto;
    top: 40px;
    z-index: 900;
  }

</style>
