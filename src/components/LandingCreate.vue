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

          <label class="col-sm-3 col-form-label-sm mt-3" for="company_id">
            <span>업체*</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <select class="form-control" name="company" id="company_id" v-model="landing_obj.company">
              <option value="-1">선택하세요</option>
              <option v-for="content in landing_company" :value="content.id">
                {{content.name }} - {{ content.sub_name }}
              </option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="manager">
            <span>관리자*</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <select class="form-control" name="sel" id="manager" v-model="landing_obj.manager">
              <option value="-1">선택하세요</option>
              <option v-for="content in landing_manager" :value="content.user">
                {{content.account }} - {{ content.user_name }}
              </option>
            </select>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="landing">
            <span>랜딩페이지 이름*</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" :class="duplicated_class" id="landing" maxlength="50" v-model="landing_obj.name"
                   @keyup="check_name">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="base_url">
            <span>메인 URL*</span>
            <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                  v-tooltip="{
                  content: msg.base_url,
                  placement: 'right',
                  offset: 5,
                  trigger: 'hover',
                  }">?</span>
            <span class="question badge btn-secondary p-1 align-middle" v-else
                  v-tooltip="{
                  content: msg.base_url,
                  placement: 'right',
                  offset: 5,
                  trigger: 'click',
                  }">?</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="base_url" maxlength="30" v-model="landing_obj.base_url">
          </div>

        </div>

        <hr>

        <h5>DB 폼</h5>
        <div class="form-group row mb-0">
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_group">DB 폼 그룹</label>
          <form class="col-sm-9 mt-sm-3 row ml-0" v-on:submit.prevent="form_group_add">
            <input type="text" class="input_one_btn form-control col-md-11" id="form_group" name="form_group"
                   placeholder="폼 그룹 이름" maxlength="50" v-model="form_temp">
            <button type="submit" class="btn btn-primary col-md-1 p-0" name="form_group">추가</button>
          </form>
          <label class="col-sm-3 col-form-label-sm mt-3" for="form_group_list"></label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <select class="input_one_btn form-control col-md-11" name="form_group_list" id="form_group_list"
                    v-model="form_arrow" @change="form_changed(form_arrow)">
              <option value="-1">그룹을 선택하세요</option>
              <option v-for="item in form_obj" :value="item.sign">{{ item.name }}</option>
            </select>
            <button type="button" class="btn btn-danger col-md-1 p-0"
                    @click.prevent="form_group_delete(form_selected.sign)">
              삭제
            </button>
          </div>

          <!-- Somehow !== is not responsible -->
          <label v-if="form_selected.sign != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_bg">
            폼 배경색
          </label>
          <div v-if="form_selected.sign != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="color_wrap form-control col-sm-2" id="form_group_bg">
              <input type="color" v-model="form_selected.bg_color" class="color_picker">
            </div>
            <div class="margin_div"></div>
            <input type="text" v-model="form_selected.bg_color" class="form-control col-sm-3" maxlength="7">
          </div>

          <label v-if="form_selected.sign != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_col">
            폼 폰트색
          </label>
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
          <form class="col-sm-9 mt-sm-3 row ml-0" v-on:submit.prevent="field_add">
            <select class="form-control col-sm-5 col-md-5" name="company" id="db_field" v-model="field_selected">
              <option value="-1">타입을 선택하세요</option>
              <option value="1">텍스트 입력</option>
              <option value="2">번호 입력</option>
              <option value="3">선택 스크롤</option>
              <option value="4">선택 버튼</option>
              <option value="5">체크 박스</option>
              <option value="6">날짜</option>
              <option value="7">링크 버튼</option>
              <option value="8">전화 버튼</option>
              <option value="9">완료 버튼</option>
            </select>
            <div class="margin_div"></div>
            <input type="text" class="form-control col-sm-7 col-md-5" placeholder="필드이름" maxlength="10"
                   v-model="field_temp_name">
            <div class="margin_div"></div>
            <button type="submit" class="btn btn-primary col-md-1 p-0">추가</button>
          </form>

          <label class="col-sm-3 col-form-label-sm mt-3" for="form_field_list">필드 리스트</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <ul class="list-group list-group-flush col-12 pr-0" id="form_field_list">
              <li class="list-group-item list-group-item-action d-inline-flex p-1 font-weight-bold">
                <div class="col-3 p-2 text-center" style="word-break: keep-all;">필드 타입</div>
                <div class="col-3 p-2 text-center" style="word-break: keep-all;">필드 이름</div>
                <div class="col-6 p-2 text-center">옵션</div>
              </li>
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                  v-for="content in filtered_fields">
                <div class="col-3 p-2 text-center" v-if="content.type == 1">텍스트 입력</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 2">번호 입력</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 3">선택 스크롤</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 4">선택 버튼</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 5">체크 박스</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 6">날짜</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 7">링크 버튼</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 8">전화 버튼</div>
                <div class="col-3 p-2 text-center" v-if="content.type == 9">완료 버튼</div>
                <div class="col-3 p-2 text-center">{{ content.name }}</div>
                <button type="button" class="btn btn-outline-info p-0 col-3 col-sm-2 m-auto" data-toggle="collapse"
                        v-bind:href="'#collapse_option'+ content.sign" aria-expanded="false">
                  설정
                </button>
                <button type="button" class="btn btn-outline-danger p-0 col-3 col-sm-2 m-auto"
                        @click="field_delete(content.sign)">
                  삭제
                </button>
                <div class="field_option_wrap collapse" v-bind:id="'collapse_option'+ content.sign"
                     data-parent="#form_field_list">
                  <form v-on:submit.prevent="field_option_close">
                    <div class="form-group row p-4 mb-0">

                      <label class="col-sm-3 col-form-label-sm mt-3" for="f_type">타입*</label>
                      <div class="col-sm-9 mt-sm-3">
                        <!--<input type="text" class="form-control" id="f_name" maxlength="10" v-model="content.type">-->
                        <select class="form-control" id="f_type" v-model="content.type">
                          <option value="1">텍스트 입력</option>
                          <option value="2">번호 입력</option>
                          <option value="3">선택 스크롤</option>
                          <option value="4">선택 버튼</option>
                          <option value="5">체크 박스</option>
                          <option value="6">날짜</option>
                          <option value="7">링크 버튼</option>
                          <option value="8">전화 버튼</option>
                          <option value="9">완료 버튼</option>
                        </select>
                      </div>

                      <label class="col-sm-3 col-form-label-sm mt-3" for="f_name">필드 이름*</label>
                      <div class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_name" maxlength="10" v-model="content.name">
                      </div>

                      <label v-if="content.type != 4 && content.type != 5 && content.type != 6"
                             class="col-sm-3 col-form-label-sm mt-3" for="f_holder">
                        <span>안내문</span>
                        <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                              v-tooltip="{
                              content: msg.holder,
                              placement: 'right',
                              offset: 5,
                              trigger: 'hover',
                              }">?</span>
                        <span class="question badge btn-secondary p-1 align-middle" v-else
                              v-tooltip="{
                              content: msg.holder,
                              placement: 'right',
                              offset: 5,
                              trigger: 'click',
                              }">?</span>
                      </label>
                      <div v-if="content.type != 4 && content.type != 5 && content.type != 6" class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_holder" maxlength="10" v-model="content.holder">
                      </div>

                      <label v-if="content.type == 8" class="col-sm-3 col-form-label-sm mt-3" for="f_val">전화번호</label>
                      <div v-if="content.type == 8" class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_val" maxlength="10" v-model="content.value">
                      </div>

                      <label v-if="content.type == 7" class="col-sm-3 col-form-label-sm mt-3" for="f_link">링크</label>
                      <div v-if="content.type == 7" class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_link" maxlength="10" v-model="content.url">
                      </div>

                      <label v-if="content.type == 3 || content.type == 4 || content.type == 5"
                             class="col-sm-3 col-form-label-sm mt-3" for="f_list"><span>리스트</span>
                        <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                              v-tooltip="{
                              content: msg.list,
                              placement: 'right',
                              offset: 5,
                              trigger: 'hover',
                            }">?</span>
                        <span class="question badge btn-secondary p-1 align-middle" v-else
                              v-tooltip="{
                              content: msg.list,
                              placement: 'right',
                              offset: 5,
                              trigger: 'click',
                              }">?</span>
                      </label>
                      <div v-if="content.type == 3 || content.type == 4 || content.type == 5" class="col-sm-9 mt-sm-3">
                        <button type="button" @click.prevent="field_list_add(content.sign)"
                                class="btn btn-primary pl-3 pr-3 pt-1 pb-1">추가
                        </button>
                        <div v-for="(item, index) in content.list" class="row pl-3 pr-3 pt-2 pb-2">
                          <input type="text" class="form-control col-10" v-model="content.list[index]" id="f_list">
                          <button type="button" @click.prevent="field_list_delete(content.sign, index)"
                                  class="btn btn-danger col-2 p-0">삭제
                          </button>
                        </div>
                      </div>

                      <label v-if="content.type == 7 || content.type == 8 || content.type == 9"
                             class="col-sm-3 col-form-label-sm mt-3"
                             for="f_back">배경색</label>
                      <div v-if="content.type == 7 || content.type == 8 || content.type == 9" class="col-sm-9 mt-sm-3">
                        <div class="color_wrap form-control col">
                          <input type="color" v-model="content.back_color" class="color_picker">
                        </div>
                        <input type="text" class="form-control" id="f_back" maxlength="10" v-model="content.back_color">
                      </div>

                      <label v-if="content.type == 7 || content.type == 8 || content.type == 9"
                             class="col-sm-3 col-form-label-sm mt-3"
                             for="f_color">글씨색</label>
                      <div v-if="content.type == 7 || content.type == 8 || content.type == 9" class="col-sm-9 mt-sm-3">
                        <div class="color_wrap form-control col">
                          <input type="color" v-model="content.text_color" class="color_picker">
                        </div>
                        <input type="text" class="form-control" id="f_color" maxlength="10"
                               v-model="content.text_color">
                      </div>
                      <label v-if="content.type == 7 || content.type == 8 || content.type == 9"
                             class="col-sm-3 col-form-label-sm mt-3"
                             for="f_img">이미지</label>
                      <div v-if="content.type == 7 || content.type == 8 || content.type == 9" class="col-sm-9 mt-sm-3">
                        <input type="file" class="input_one_btn form-control col-md-11 pt-1" id="f_img"
                               placeholder="이미지" :id="'field_file_input'+content.sign"
                               ref="field_file_input" @change="field_file_add(content.sign)" :value="content.image"
                               accept="image/*">
                        <button type="button" class="btn btn-danger w-100 mt-1" id="f_imgg"
                                @click.prevent="field_file_delete(content.sign)">
                          파일삭제
                        </button>
                      </div>
                    </div>
                    <button type="button" class="btn btn-info col-12 m-auto" data-toggle="collapse"
                            v-bind:href="'#collapse_option'+ content.sign" aria-expanded="false">
                      닫기
                    </button>
                  </form>
                </div>
              </li>
              <li v-if="filtered_fields.length == 0" class="d-inline-flex justify-content-between p-1">
                <div class="col p-2 text-center bg-light">데이터 없음</div>
              </li>
            </ul>
          </div>
        </div>

        <hr>

        <h5>추가내용</h5>
        <div class="form-group row mb-0">
          <!--<label class="col-sm-3 col-form-label-sm mt-3" for="url_title">Url</label>
          <form class="col-sm-9 mt-sm-3 row ml-0" v-on:submit.prevent="url_add()">
            <input type="text" class="form-control col-sm-5 col-md-5" id="url_title" placeholder="Url 주소"
                   v-model="url_temp.url">
            <div class="margin_div"></div>
            <input type="text" class="form-control col-sm-7 col-md-5" id="url_desc" placeholder="Url 설명"
                   v-model="url_temp.desc">
            <div class="margin_div"></div>
            <button type="submit" class="btn btn-primary col-md-1 p-0">추가</button>
          </form>

          <label class="col-sm-3 col-form-label-sm mt-3" for="url_list">Url 리스트</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <ul class="list-group list-group-flush col-12 pr-0" id="url_list">
              <li class="list-group-item list-group-item-action d-inline-flex p-1 font-weight-bold">
                <div class="col-5 p-2 text-center">Url 주소</div>
                <div class="col-5 p-2 text-center">Url 설명</div>
                <div class="col-2 p-2 text-center">옵션</div>
              </li>
              <li class="list-group-item list-group-item-action d-inline-flex justify-content-between p-1"
                  v-for="url in url_obj">
                <div class="col-5 p-2 text-center">{{ url.url }}</div>
                <div class="col-5 p-2 text-center">{{ url.desc }}</div>
                <button type="button" class="btn btn-outline-danger p-0 col-2" @click.prevent="url_delete(url.sign)">
                  삭제
                </button>
              </li>
              <li v-if="url_obj.length == 0" class="d-inline-flex justify-content-between p-1">
                <div class="col p-2 text-center bg-light">데이터 없음</div>
              </li>
            </ul>
          </div>

          <hr> -->

          <label class="col-sm-3 col-form-label-sm mt-3" for="term_status">약관</label>

          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_status">
              <input type="checkbox" id="term_status" v-model="layout_obj.is_term">
              <span class="slider round"></span>
            </label>
          </div>

          <label v-if="layout_obj.is_term" class="col-sm-3 col-form-label-sm mt-3" for="term_switch">약관 이미지</label>

          <div v-if="layout_obj.is_term" class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_switch">
              <input type="checkbox" id="term_switch" v-model="layout_obj.image_term" @change="term_file_delete()">
              <span class="slider round"></span>
            </label>
          </div>

        </div>

        <div class="form-group row" v-if="layout_obj.is_term && layout_obj.image_term">
          <label class="col-sm-3 col-form-label-sm mt-3" for="term_img">약관 이미지 파일</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <input type="file" class="input_one_btn form-control col-md-11 pt-1" id="term_img" placeholder="이미지"
                   ref="term_file_input" @change="term_file_add()" accept="image/*">
            <button type="button" class="btn btn-danger col-md-1 p-0" @click.prevent="term_file_delete()">삭제</button>
          </div>
        </div>

        <div class="form-group row" v-if="layout_obj.is_term && !layout_obj.image_term">
          <label class="col-sm-3 col-form-label-sm mt-3" for="term_title">약관 제목</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="term_title" placeholder="title" v-model="term_obj.title">
          </div>
          <label class="col-sm-3 col-form-label-sm mt-3" for="term_cont">약관 내용</label>
          <div class="col-sm-9 mt-sm-3">
                    <textarea type="text" class="form-control" id="term_cont" rows="4" placeholder="content"
                              v-model="term_obj.content"></textarea>
          </div>
        </div>


        <hr>

        <h5>페이지 내용</h5>
        <div class="form-group row">
          <label class="col-sm-12 col-form-label-sm mt-3" for="page_title">
            <span>페이지 타이틀</span>
            <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                  v-tooltip="{
                  content: msg.title,
                  placement: 'right',
                  offset: 5,
                  trigger: 'hover',
                  }">?</span>
            <span class="question badge btn-secondary p-1" v-else
                  v-tooltip="{
                  content: msg.title,
                  placement: 'right',
                  offset: 5,
                  trigger: 'click',
                  }">?</span>
          </label>
          <div class="col-sm-12">
            <input type="text" class="form-control" id="page_title" maxlength="50" v-model="landing_obj.title">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="header_script">
            <span>헤더 스크립트</span>
          </label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="header_script" rows="4"
                      v-model="landing_obj.header_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="body_script">
            <span>바디 스크립트</span>
          </label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="body_script" rows="4"
                      v-model="landing_obj.body_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="main_layout">
            <span>랜딩 레이아웃</span>
            <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                  v-tooltip="{
                  content: msg.order,
                  placement: 'right',
                  offset: 5,
                  trigger: 'hover',
                  }">?</span>
            <span class="question badge btn-secondary p-1" v-else
                  v-tooltip="{
                  content: msg.order,
                  placement: 'right',
                  offset: 5,
                  trigger: 'click',
                  }">?</span>
          </label>
          <div class="col-sm-9 col-form-label-sm mt-3 text-right">
            <button type="button" class="btn btn-primary btn-sm p-1" @click.prevent="order_add">객체 추가</button>
            <button type="button" class="btn btn-danger btn-sm p-1" @click.prevent="order_delete">선택 삭제</button>
          </div>
          <div class="col-sm-12">
            <div class="main_layout" id="main_layout">
              <div class="basket">
                <vue-draggable-resizable v-for="item in order_obj"
                                         @activated="order_activated(item.sign)"
                                         @deactivated="order_deactivated"
                                         @dragging="order_move"
                                         @resizing="order_resize"
                                         parent=".basket"
                                         class="drag_thing"
                                         class-name-dragging="drag_thing_drag"
                                         class-name-handle="drag_handle"
                                         :key="item.sign"
                                         :sign="item.sign"
                                         :parent="false"
                                         :x="item.position.x"
                                         :y="item.position.y"
                                         :w="item.position.w"
                                         :h="item.position.h"
                                         :z="item.position.z"
                                         :min-width="100"
                                         :min-height="100"
                                         :grid=[5,5]
                                         :lock-aspect-ratio="false">

                  <!--<img v-if="item.type == 1 && item.image_data.length == 0" src="../assets/logo1.png" alt="logo"
                       style="width: 100%; height: 100%; object-fit: contain;">
                  <img v-if="item.type == 1 && item.image_data.length !== 0" :src="item.image_url" alt="logo"
                       style="width: 100%; height: 100%; object-fit: contain;">-->

                  <img v-if="item.type == 1 && !item.image_data.name" src="../assets/logo1.png" alt="logo_none"
                       style="width: 100%; height: 100%; object-fit: contain;">
                  <img v-if="item.type == 1 && item.image_data.name" :src="item.image_url" alt="logo_in"
                       style="width: 100%; height: 100%; object-fit: contain;">


                  <div v-if="item.type == 2" class="form_layout" v-for="form in form_obj">
                    <div class="container form_layout_cont" v-if="form.sign == item.form_group"
                         :style="'background:'+form.bg_color+';' + 'color:'+form.tx_color+';'+'z-index:10;'">
                      <div class="form-group row mb-1" v-for="field in field_obj">
                        <div class="w-100 row m-0" v-if="field.type != 7 && field.type != 8 && field.type != 9">
                          <label v-if="field.form_group_id == item.form_group"
                                 class="col-sm-3 col-form-label-sm mt-3 text-center font-weight-bold pr-0 pl-0 pt-2"
                                 :for="'label'+field.name">
                            {{ field.name }}
                          </label>
                          <div v-if="field.form_group_id == item.form_group" class="col-sm-9 mt-sm-3">

                            <input v-if="field.type == 1" type="text" class="form-control" maxlength="0"
                                   :placeholder="field.holder" :id="'label'+field.name">

                            <input v-if="field.type == 2" type="number" class="form-control" maxlength="0"
                                   :placeholder="field.holder" :id="'label'+field.name">

                            <select v-if="field.type == 3" type="number" class="form-control" maxlength="0"
                                    :placeholder="field.holder" :id="'label'+field.name">
                              <option value="0">select here</option>
                              <option v-for="list in field.list" :value="list">{{ list }}</option>
                            </select>

                            <div v-if="field.type == 4" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap justify-content-around">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="radio" :name="field.sign" :value="list"
                                         :id="'field_'+list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <div v-if="field.type == 5" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap justify-content-around">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="checkbox" :id="'field_' + list" :value="list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <input v-if="field.type == 6" type="text" class="form-control" disabled
                                   placeholder="Datepicker" :id="'label'+field.name">

                          </div>
                        </div>
                        <div class="pl-3 pr-3 pt-1 pb-1 col"
                             v-else-if="field.type == 7 || field.type == 8 || field.type == 9">
                          <div v-if="field.form_group_id == item.form_group">
                            <!-- link -->
                            <button v-if="field.type == 7 && field.image_data.length == 0" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <button v-else-if="field.type == 7 && field.image_data.length == 1" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100"
                                   style="width: 100%; height: 100%; max-height: 50px; object-fit: contain;">
                            </button>

                            <!-- tel -->
                            <button v-if="field.type == 8 && field.image_data.length == 0" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <button v-else-if="field.type == 8 && field.image_data.length == 1" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100"
                                   style="width: 100%; height: 100%; max-height: 50px; object-fit: contain;">
                            </button>

                            <!-- submit -->
                            <button v-if="field.type == 9 && field.image_data.length == 0" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <button v-else-if="field.type == 9 && field.image_data.length == 1" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image"
                                   style="width: 100%; height: 100%; max-height: 50px; object-fit: contain;">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="item.type == 3">
                    <span class="video_handler">비디오 드래그</span>
                    <span class="video_handler_2">비디오 드래그</span>
                    <div style="position: relative; width: 100%; max-width: 1000px; margin: auto;">
                      <div style=" position: relative; padding-bottom: 56.25%; height:0;">
                        <iframe v-if="item.video_type == 1"
                                style="width: 100%; height: 100%; top:0; left:0; position: absolute;" type="text/html"
                                :src="'https://www.youtube.com/embed/'
                                + item.video_data
                                + '?&playlist=Ra8s0IHng6A&autoplay=0&loop=1&showinfo=0&fs=1&disablekb=1&vq=auto&controls=0&rel=0&iv_load_policy=3&mute=0&playsinline=1&modestbranding=1'"
                                frameborder="0" volume="1" allowfullscreen webkitallowfullscreen
                                mozallowfullscreen></iframe>
                        <iframe v-if="item.video_type == 2"
                                style="width: 100%; height: 100%; top:0; left:0; position: absolute;" type="text/html"
                                :src="'https://player.vimeo.com/video/' + item.video_data + '?&loop=1'" frameborder="0"
                                volume="1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                      </div>
                    </div>
                  </div>

                </vue-draggable-resizable>

              </div>


              <div class="console" v-if="order_focus_flag && order_selected != 0">
                <div v-for="info in order_obj">
                  <div class="form-group row p-4" v-if="info.sign == order_selected">
                    <label for="console_name" class="col-sm-3 col-form-label-sm mt-3">이름</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="text" id="console_name" v-model="info.name" class="form-control" step="5"
                             maxlength="30">
                    </div>

                    <label for="console_type" class="col-sm-3 col-form-label-sm mt-3">타입</label>
                    <div class="col-sm-9 mt-sm-3">
                      <select class="form-control" id="console_type" v-model.number="info.type">
                        <option value="1">이미지</option>
                        <option value="2">폼그룹</option>
                        <option value="3">비디오</option>
                      </select>
                    </div>

                    <label v-if="info.type == 3" for="video_type" class="col-sm-3 col-form-label-sm mt-3">
                      비디오 타입
                    </label>
                    <div v-if="info.type == 3" class="col-sm-9 mt-sm-3">
                      <select id="video_type" class="form-control" v-model="info.video_type">
                        <option value="1">Youtube</option>
                        <option value="2">Vimeo</option>
                      </select>
                    </div>
                    <label v-if="info.type == 1" class="col-sm-3 col-form-label-sm mt-3" for="image_set">
                      이미지 첨부
                    </label>
                    <label v-if="info.type == 2" class="col-sm-3 col-form-label-sm mt-3" for="form_set">
                      폼 그룹 선택
                    </label>
                    <label v-if="info.type == 3" class="col-sm-3 col-form-label-sm mt-3" for="video_set">
                      동영상 값
                    </label>
                    <div class="col-sm-9 mt-sm-3" id="choose_set">
                      <input v-if="info.type == 1" type="file" class="form-control p-1" id="image_set" accept="image/*"
                             @change="order_image_change(info.sign)">
                      <select v-if="info.type == 2" class="form-control" id="form_set" v-model="info.form_group">
                        <option value="0">폼 그룹을 선택하세요</option>
                        <option v-for="content in form_obj" :value="content.sign">{{ content.name }}</option>
                      </select>
                      <input v-if="info.type == 3" type="text" class="form-control" id="video_set"
                             v-model="info.video_data">
                    </div>

                    <label for="console_x" class="col-sm-3 col-form-label-sm mt-3">X 좌표</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="number" id="console_x" v-model.number="info.position.x" class="form-control"
                             step="5">
                    </div>

                    <label for="console_y" class="col-sm-3 col-form-label-sm mt-3">Y 좌표</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="number" id="console_y" v-model.number="info.position.y" class="form-control"
                             step="5">
                    </div>

                    <label for="console_w" class="col-sm-3 col-form-label-sm mt-3">너비</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="number" id="console_w" v-model.number="info.position.w" class="form-control"
                             step="5">
                    </div>

                    <label for="console_h" class="col-sm-3 col-form-label-sm mt-3">높이</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="number" id="console_h" v-model.number="info.position.h" class="form-control"
                             step="5">
                    </div>

                    <label for="console_z" class="col-sm-3 col-form-label-sm mt-3">우선순위</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="number" id="console_z" v-model.number="info.position.z" class="form-control">
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="preview">
              <button type="button" class="btn btn-info w-100">미리보기</button>
            </div>

            <div class="form-group row mb-0">

              <label class="col-sm-3 col-form-label-sm mt-3" for="layout_font">
                <span>레이아웃 폰트</span>
              </label>
              <div class="col-sm-9 mt-sm-3 row ml-0">
                <select class="form-control" name="layout_font" id="layout_font" v-model="layout_obj.font">
                  <option value="-1">OS 기본</option>
                  <option value="1">Font 2</option>
                  <option value="2">Font 3</option>
                </select>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_db">
                <span>레이아웃 내 DB</span>
                <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                      v-tooltip="{
                      content: msg.in_db,
                      placement: 'right',
                      offset: 5,
                      trigger: 'hover',
                      }">?</span>
                <span class="question badge btn-secondary p-1 align-middle" v-else
                      v-tooltip="{
                      content: msg.in_db,
                      placement: 'right',
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

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_company">
                <span>사업자 표기</span>
                <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                      v-tooltip="{
                      content: msg.in_company,
                      placement: 'right',
                      offset: 5,
                      trigger: 'hover',
                      }">?</span>
                <span class="question badge btn-secondary p-1 align-middle" v-else
                      v-tooltip="{
                      content: msg.in_company,
                      placement: 'right',
                      offset: 5,
                      trigger: 'click',
                      }">?</span>
              </label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_company">
                  <input type="checkbox" id="in_company" v-model="layout_obj.show_company">
                  <span class="slider round"></span>
                </label>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="is_hijack">
                <span>후팝업</span>
                <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                      v-tooltip="{
                      content: msg.hijack,
                      placement: 'right',
                      offset: 5,
                      trigger: 'hover',
                      }">?</span>
                <span class="question badge btn-secondary p-1 align-middle" v-else
                      v-tooltip="{
                      content: msg.hijack,
                      placement: 'right',
                      offset: 5,
                      trigger: 'click',
                      }">?</span>
              </label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="is_hijack">
                  <input type="checkbox" id="is_hijack" v-model="landing_obj.is_hijack">
                  <span class="slider round"></span>
                </label>
              </div>
              <label v-if="landing_obj.is_hijack" class="col-sm-3 col-form-label-sm mt-3" for="hijack">
                <span>후팝업 링크</span>
              </label>
              <div v-if="landing_obj.is_hijack" class="col-sm-9 mt-sm-3 row ml-0">
                <input type="text" class="form-control col" id="hijack" placeholder="후팝업 주소"
                       v-model="landing_obj.hijack_url">
                <hr>
              </div>

              <label class="col-sm-3 col-form-label-sm mt-3" for="in_banner">
                <span>띠배너</span>
                <span class="question badge btn-secondary p-1 align-middle" v-if="window_width > 768"
                      v-tooltip="{content: msg.in_banner,
                      placement: 'right',
                      offset: 5,
                      trigger: 'hover',
                      }">?</span>
                <span class="question badge btn-secondary p-1 align-middle" v-else
                      v-tooltip="{content: msg.in_banner,
                      placement: 'right',
                      offset: 5,
                      trigger: 'click',
                      }">?</span>
              </label>
              <div class="col-sm-9 mt-sm-3">
                <label class="switch" for="in_banner">
                  <input type="checkbox" id="in_banner" v-model="layout_obj.is_banner"
                         @change="in_banner_file_delete()">
                  <span class="slider round"></span>
                </label>
              </div>

              <label v-if="layout_obj.is_banner" class="col-sm-3 col-form-label-sm mt-3" for="in_banner_img">
                <span>띠배너 옵션</span>
              </label>
              <div v-if="layout_obj.is_banner" class="col-sm-9 mt-sm-3 row ml-0">

                <input type="file" class="form-control col-sm-5 col-md-5 pt-1" id="in_banner_img" placeholder="이미지"
                       ref="in_banner_file_input" @change="in_banner_file_add()" accept="image/*">
                <div class="margin_div"></div>
                <input type="text" class="form-control col-sm-7 col-md-5" id="in_banner_desc" placeholder="띠배너 주소"
                       v-model="layout_obj.banner_url">
                <div class="margin_div"></div>
                <!--<button type="button" class="btn btn-primary col-md-1 p-0">추가</button>-->
                <button type="button" class="btn btn-danger col-md-1 p-0" @click.prevent="in_banner_file_delete()">
                  <span>삭제</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <hr>

        <h5>옵션</h5>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label-sm mt-3" for="status">활성상태</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="status">
              <input type="checkbox" id="status" v-model="landing_obj.is_active">
              <span class="slider round"></span>
            </label>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="mobile">모바일 전용</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="mobile">
              <input type="checkbox" id="mobile" v-model="landing_obj.is_mobile">
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
        order: '랜딩페이지를 커스터마이징 합니다. 1000px 이상의 화면에서 작업을 추천합니다.',
        in_db: '레이아웃 내부에 DB 폼 그룹을 위치시키거나 하단 팝업으로 대체합니다.',
        in_company: '랜딩 페이지에 하단 Footer로 해당 고객업체의 정보를 자동 기입합니다.',
        hijack: '사용자가 뒤로 가기 시 해당 링크로 강제 이동시킵니다.',
        in_banner: '스크롤 시 따라다니는 배너를 생성합니다.',
        holder: 'Place holder입니다. 텍스트 입력 전 설명이 필요하거나 전화, 링크의 버튼에 표시할 글을 지정합니다.',
        list: '선택 옵션을 선택하고 제공할 수 있습니다.'
      },
      // Get org's companies and managers lists
      landing_company: [],
      landing_manager: [],
      // // // Actual obj data what will be saved
      // Landing
      landing_obj: {
        company: -1,
        manager: -1,
        name: '',
        title: '',
        header_script: '',
        body_script: '',
        base_url: '',
        is_hijack: false,
        hijack_url: '',
        is_active: true,
        is_mobile: false,
        views: 0,
        collections: []
      },
      // Layout
      layout_obj: {
        is_banner: false,
        banner_url: '',
        banner_image: '',
        inner_db: true,
        font: -1,
        is_term: false,
        image_term: false,
        show_company: false
      },
      // in_banner obj
      in_banner_file_flag: 0,
      in_banner_file: [],
      in_banner_file_info: '',
      // Order
      order_focus_flag: false,
      order_selected: 0,
      order_obj: [],
      // Form obj
      form_obj: [],
      form_temp: '',
      form_arrow: -1,
      form_selected: {
        sign: -1,
        bg_color: '#f9f9f9',
        tx_color: '#313131'
      },
      // Field obj
      field_obj: [],
      filtered_fields: [],
      field_selected: -1,
      field_temp_name: '',
      // // // Term info
      term_obj: {
        title: '',
        content: '',
        image: ''
      },
      term_file_flag: 0,
      term_file: [],
      term_file_info: '',
      // URL
      /*url_temp: {},
      url_obj: [],*/
      // Name check
      duplicated_class: 'form-control',
      duplicated: false,
      // Result obj
      dynamo_obj: {}
    }),
    methods: {
      // Order handle
      // Order handle
      // Order handle
      order_image_change(sign) {
        let file_data = event.target.files[0]
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == sign) {
            this.order_obj[i].image_data = file_data
            this.order_obj[i].image_url = URL.createObjectURL(file_data)
          }
        }
      },
      order_name_change() {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].name = this.console_obj.name
          }
        }
      },
      order_form_change() {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].form_group = this.console_obj.form_group
          }
        }
      },
      order_video_type_change() {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].video_type = this.console_obj.video_type
          }
        }
      },
      order_video_change() {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].video_data = this.console_obj.video_data
          }
        }
      },
      order_type_change() {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].type = this.console_obj.type
          }
        }
      },
      order_activated(sign) {
        this.order_selected = sign
        this.order_focus_flag = true
      },
      order_deactivated() {
        // this.order_selected = 0
        // this.order_focus_flag = false
      },
      order_move(x, y) {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].position.x = x
            this.order_obj[i].position.y = y
          }
        }
      },
      order_resize(x, y, w, h) {
        for (let i = 0; i < this.order_obj.length; i++) {
          if (this.order_obj[i].sign == this.order_selected) {
            this.order_obj[i].position.x = x
            this.order_obj[i].position.y = y
            this.order_obj[i].position.w = w
            this.order_obj[i].position.h = h
          }
        }
      },
      order_add() {
        let len = this.order_obj.length
        if (len) {
          let highest = 0
          let z = 1
          for (let i = 0; i < len; i++) {
            if (this.order_obj[i].sign > highest) {
              highest = this.order_obj[i].sign
            }
          }
          for (let j = 0; j < len; j++) {
            if (this.order_obj[j].position.z > z) {
              z = this.order_obj[j].position.z
            }
          }
          let order_ready = {
            sign: highest + 1,
            type: 1,
            name: 'new layout',
            position: {x: 0, y: 0, w: 100, h: 100, z: z + 1},
            image_data: [],
            image_url: '',
            video_type: 1
          }
          this.order_obj.push(order_ready)
          alert('레이아웃이 생성되었습니다.')
        } else {
          let order_ready = {
            sign: 1,
            type: 1,
            name: 'new layout',
            position: {x: 0, y: 0, w: 100, h: 100, z: 1},
            image_data: [],
            image_url: '',
            video_type: 1
          }
          this.order_obj.push(order_ready)
          alert('레이아웃이 생성되었습니다.')
        }
      },
      order_delete() {
        if (this.order_selected) {
          if (confirm('선택한 레이아웃을 삭제하시겠습니까?')) {
            for (let i = 0; i < this.order_obj.length; i++) {
              if (this.order_obj[i].sign == this.order_selected) {
                if (i === 0) {
                  this.order_obj.shift()
                } else {
                  this.order_obj.splice(i, 1)
                }
              }
            }
            let console_clear = {sign: 0, type: 0, name: '', position: {x: 0, y: 0, w: 0, h: 0, z: 0}}
            this.console_obj = console_clear
            this.order_selected = 0
            this.order_activated(0)
          }
        } else {
          alert('먼저 레이아웃을 선택하세요.')
        }
      },
      /* e */
      /* n */
      /* d */
      // File handle
      // File handle
      // File handle
      in_banner_file_add() {
        /* When file data changed */
        let file_data = event.target.files[0]
        this.in_banner_file_info = file_data
        this.in_banner_file[0] = file_data
        this.in_banner_file_flag = 1
      },
      in_banner_file_delete() {
        /* Remove file data */
        if (this.$refs.in_banner_file_input) {
          this.$refs.in_banner_file_input.value = ''
        }
        this.in_banner_file = []
        this.in_banner_file_info = ''
        this.in_banner_file_flag = 0
      },
      term_file_add() {
        /* When file data changed */
        let file_data = event.target.files[0]
        this.term_file_info = file_data
        this.term_file[0] = file_data
        this.term_file_flag = 1
      },
      term_file_delete() {
        /* Remove file data */
        if (this.$refs.term_file_input) {
          this.$refs.term_file_input.value = ''
        }
        this.term_file = []
        this.term_file_info = ''
        this.term_file_flag = 0
      },
      field_file_add(sign) {
        let file_data = event.target.files[0]
        for (let i = 0; i < this.field_obj.length; i++) {
          if (this.field_obj[i].sign == sign) {
            this.field_obj[i].image_data[0] = file_data
            this.field_obj[i].image_url = URL.createObjectURL(file_data)
          }
        }
      },
      field_file_delete(sign) {
        // this.$refs.field_file_input.value = ''
        document.getElementById('field_file_input' + sign).value = ''
        for (let i = 0; i < this.field_obj.length; i++) {
          if (this.field_obj[i].sign == sign) {
            this.field_obj[i].image_data = []
            this.field_obj[i].image_url = ''
          }
        }
      },
      /* e */
      /* n */
      /* d */
      // Form groups Handle
      // Form groups Handle
      // Form groups Handle
      form_group_add() {
        if (this.form_temp) {
          let len = this.form_obj.length
          let flag = true
          if (len) {
            for (let i = 0; i < len; i++) {
              if (this.form_obj[i].name === this.form_temp) {
                alert('폼 그룹 이름이 이미 존재합니다.')
                flag = false
                return flag
              }
            }
            if (flag) {
              let highest = 0
              for (let i = 0; i < len; i++) {
                if (this.form_obj[i].sign > highest) {
                  highest = this.form_obj[i].sign
                }
              }
              this.form_obj.push({sign: highest + 1, name: this.form_temp, bg_color: '#f0f0f0', tx_color: '#313131'})
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
      form_group_delete(id) {
        if (id !== -1) {
          if (confirm('이 폼그룹을 삭제하시겠습니까?')) {
            this.form_obj = this.form_obj.filter(el => el.sign != id)
            this.form_arrow = -1
            this.form_selected = {sign: -1, tx_color: '#313131', bg_color: '#f9f9f9'}
            this.field_obj = this.field_obj.filter(el => el.form_group_id != id)
          }
        } else {
          alert('그룹을 먼저 선택하세요.')
        }
      },
      form_changed(id) {
        if (id == -1) {
          this.form_selected = {sign: -1, tx_color: '#313131', bg_color: '#f0f0f0'}
        } else {
          for (let i = 0; i < this.form_obj.length; i++) {
            if (this.form_obj[i].sign == id) {
              this.form_selected = this.form_obj[i]
              this.filter_change()
            }
          }
        }
      },
      // Filtered fields by form group
      filter_change() {
        this.filtered_fields = []
        for (let i = 0; i < this.field_obj.length; i++) {
          if (this.field_obj[i].form_group_id == this.form_selected.sign) {
            // this.filtered_fields
            this.filtered_fields.push(this.field_obj[i])
          }
        }
      },
      /* e */
      /* n */
      /* d */
      // Field handle
      // Field handle
      // Field handle
      field_add() {
        // get form group sign
        if (this.form_selected.sign != -1) {
          // get field type and field name
          if (this.field_selected != -1 && this.field_temp_name) {
            // if field object is not empty
            if (this.field_obj.length != 0) {
              let highest = 0
              let flag = true
              for (let i = 0; i < this.field_obj.length; i++) {
                if (this.form_selected.sign == this.field_obj[i].form_group_id) {
                  if (this.field_temp_name == this.field_obj[i].name) {
                    alert('이미 존재하는 필드 이름입니다.')
                    flag = false
                    return flag
                  }
                }
              }
              if (flag) {
                for (let i = 0; i < this.field_obj.length; i++) {
                  if (this.field_obj[i].sign > highest) {
                    highest = this.field_obj[i].sign
                  }
                }
              }
              this.field_obj.push({
                sign: highest + 1,
                type: this.field_selected * 1,
                name: this.field_temp_name,
                holder: this.field_temp_name,
                form_group_id: this.form_selected.sign,
                back_color: '#287BFF',
                text_color: '#f0f0f0',
                list: [],
                image_data: []
              })
              this.field_temp_name = ''
              this.filter_change()
            } else {
              this.field_obj.push({
                sign: 1,
                type: this.field_selected * 1,
                name: this.field_temp_name,
                holder: this.field_temp_name,
                form_group_id: this.form_selected.sign,
                back_color: '#287BFF',
                text_color: '#fafafa',
                list: [],
                image_data: []
              })
              this.field_temp_name = ''
              this.filter_change()
            }
            // this.field_obj.push()
            // this.filter_change()
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
        for (let i = 0; i < this.field_obj.length; i++) {
          if (this.field_obj[i].sign == id) {
            // this.field_obj = this.field_obj.splice(id, 1)
            this.field_obj.splice(i, 1)
            this.filter_change()
            return true
          }
        }
      },
      field_list_add(id) {
        for (let i = 0; i < this.field_obj.length; i++) {
          if (this.field_obj[i].sign == id) {
            this.field_obj[i].list.push("")
            this.filter_change()
            return true
          }
        }
      },
      field_list_delete(id, index) {
        for (let i = 0; i < this.field_obj.length; i++) {
          if (this.field_obj[i].sign == id) {
            this.field_obj[i].list.splice(index, 1)
            this.filter_change()
            return true
          }
        }
      },
      field_option_close(that) {
        //
      },
      /* e */
      /* n */
      /* d */
      // URL Functions
      // URL Functions
      // URL Functions
      /*url_add() {
        if (this.url_temp.url && this.url_temp.desc) {
          let len = this.url_obj.length
          let flag = true
          if (len) {
            for (let i = 0; i < len; i++) {
              if (this.url_obj[i].url === this.url_temp.url) {
                alert('URL 주소가 이미 존재합니다.')
                flag = false
                return flag
              }
            }
            if (flag) {
              let highest = 0
              for (let i = 0; i < len; i++) {
                if (this.url_obj[i].sign > highest) {
                  highest = this.url_obj[i].sign
                }
              }
              this.url_obj.push({sign: highest + 1, url: this.url_temp.url, desc: this.url_temp.desc})
              this.url_temp = {}
              alert('URL이 생성되었습니다.')
            }
          } else {
            this.url_obj.push({sign: 1, url: this.url_temp.url, desc: this.url_temp.desc})
            this.url_temp = {}
            alert('URL이 생성되었습니다.')
          }
        } else {
          alert('URL 정보를 입력하세요!')
        }
      },
      url_delete(id) {
        for (let i = 0; i < this.url_obj.length; i++) {
          if (this.url_obj[i].sign == id) {
            this.url_obj.splice(i, 1)
            return true
          }
        }
      },*/
      /* e */
      /* n */
      /* d */
      // Check duplicated Name
      // Check duplicated Name
      // Check duplicated Name
      check_name() {
        let axios = this.$axios
        if (this.landing_obj.name == '') {
          this.duplicated_class = 'form-control'
          this.duplicated = false
        } else {
          axios.get(this.$store.state.endpoints.baseUrl + 'landing/api')
            .then((response) => {
              for (let i = 0; i < response.data.Items.length; i ++) {
                if ((this.landing_obj.name).toLowerCase() == (response.data.Items[i].LandingName).toLowerCase()) {
                  this.duplicated = true
                  this.duplicated_class = 'form-control alert-danger'
                  return false
                }
              }
              this.duplicated_class = 'form-control alert-success'
              this.duplicated = false
            })
        }
      },
      /* e */
      /* n */
      /* d */
      // Create Landing Start
      // Create Landing Start
      // Create Landing Start
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
        } else if (this.duplicated) {
          alert('랜딩페이지 이름이 이미 존재합니다!')
          document.getElementById('landing').focus()
        } else if (!this.landing_obj.base_url) {
          alert('메인 URL을 입력하세요!')
          document.getElementById('base_url').focus()
        } else {
          if (this.form_obj.length > 0) {
            let flag = true
            for (let i = 0; i < this.field_obj.length; i++) {
              if (this.field_obj[i].name == '') {
                alert('폼 그룹 필드 이름을 모두 입력해주세요!')
                document.getElementById('db_field').focus()
                flag = false
                return flag
              }
            }
            if (flag) {
              this.collect_dynamo()
            }
          } else {
            this.collect_dynamo()
          }
        }
      },
      collect_dynamo() {
        let axios = this.$axios
        const config = {
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'multipart/form-data'
          }
        }
        // Get landing objs
        // "LandingName": req['LandingName']
        // "LadingInfo": req['LadingInfo']
        this.dynamo_obj.LandingName = this.landing_obj.name
        this.dynamo_obj.LandingInfo = {}
        this.dynamo_obj.LandingTime = Date.now()

        this.dynamo_obj.LandingInfo.landing = {}
        for(let key in this.landing_obj) {
          if (this.landing_obj.hasOwnProperty(key)) {
            if(this.landing_obj[key] === '' && typeof(this.landing_obj[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.landing[key] = null
            } else {
              this.dynamo_obj.LandingInfo.landing[key] = this.landing_obj[key]
            }
          }
        }
        // Get layout objs
        for(let key in this.layout_obj) {
          if (this.layout_obj.hasOwnProperty(key)) {
            if(this.layout_obj[key] == '' && typeof(this.layout_obj[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.landing[key] = null
            } else {
              this.dynamo_obj.LandingInfo.landing[key] = this.layout_obj[key]
            }
          }
        }
        // If banner needs image file
        if (this.layout_obj.is_banner    && this.in_banner_file_flag) {
          if (this.in_banner_file[0] == '' && typeof(this.in_banner_file[0]) != 'boolean') {
            this.dynamo_obj.LandingInfo.landing['banner_image'] = null
          } else {
            this.dynamo_obj.LandingInfo.landing['banner_image'] = this.in_banner_file[0]
          }
        }
        // Get Url objs
        // this.dynamo_obj.LandingInfo.url = []
        // for(let key in this.url_obj) {
        //   if (this.url_obj.hasOwnProperty(key)) {
        //     if(this.url_obj[key] == '' && typeof(this.url_obj[key]) != 'boolean') {
        //       this.dynamo_obj.LandingInfo.url[key] = null
        //     } else {
        //       this.dynamo_obj.LandingInfo.url[key] = this.url_obj[key]
        //     }
        //   }
        // }
        // Get term objs
        this.dynamo_obj.LandingInfo.term = {}
        for(let key in this.term_obj) {
          if (this.term_obj.hasOwnProperty(key)) {
            if(this.term_obj[key] == '' && typeof(this.term_obj[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.term[key] = null
            } else {
              this.dynamo_obj.LandingInfo.term[key] = this.term_obj[key]
            }
          }
        }
        // If term needs image file
        if (this.term_file_flag && this.layout_obj.image_term) {
          if (this.term_file[0] == '' && typeof(this.term_file[0]) != 'boolean') {
            this.dynamo_obj.LandingInfo.term['term_image'] = null
          } else {
            this.dynamo_obj.LandingInfo.term['term_image'] = this.term_file[0]
          }
        }
        // Get form group objs
        this.dynamo_obj.LandingInfo.form = []
        for(let key in this.form_obj) {
          if (this.form_obj.hasOwnProperty(key)) {
            if (this.form_obj[key] == '' && typeof(this.form_obj[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.form[key] = null
            } else {
              this.dynamo_obj.LandingInfo.form[key] = this.form_obj[key]
            }
          }
        }
        // Get field objs
        for(let i = 0; i < this.field_obj.length; i ++) {
          this.field_obj[i].type = this.field_obj[i].type * 1
        }
        this.dynamo_obj.LandingInfo.field = []
        for(let key in this.field_obj) {
          if (this.field_obj.hasOwnProperty(key)) {
            if (this.field_obj[key] == '' && typeof(this.field_obj[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.field[key] = null
            } else {
              this.dynamo_obj.LandingInfo.field[key] = this.field_obj[key]
            }
          }
        }
        // Get order objs
        this.dynamo_obj.LandingInfo.order = []
        for(let key in this.order_obj) {
          if (this.order_obj.hasOwnProperty(key)) {
            if (this.order_obj[key] == '' && typeof(this.order_obj[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.order[key] = null
            } else {
              this.dynamo_obj.LandingInfo.order[key] = this.order_obj[key]
            }
          }
        }
        console.log(this.dynamo_obj)
        axios.post(this.$store.state.endpoints.baseUrl + 'landing/api', this.dynamo_obj, config)
          .then(() => {
            alert('랜딩이 생성되었습니다.')
            this.bye()
          })
          .catch((error) => {
            alert('랜딩 생성이 실패하였습니다.')
            console.log(error)
          })
      },
      /* e */
      /* n */
      /* d */
      // After Create
      // After Create
      // After Create
      bye() {
        this.$router.currentRoute.meta.protect_leave = 'no'
        this.$router.push({
          name: 'landing_list',
        })
      },
      /* e */
      /* n */
      /* d */
      back_to_list() {
        this.$router.push({name: 'landing_list'})
      },
    },
    mounted() {
      // Window width calculator
      this.$nextTick(function () {
        window.addEventListener('resize', function (e) {
          this.window_width = window.innerWidth
        })
      })
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

  .main_layout {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    overflow: auto;
    transition: all 200ms ease-in-out;
  }

  .basket {
    border: 1px solid #ee5151;
    width: 1000px;
    min-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    margin: auto;
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
    background-color: #fafafa;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    margin: auto;
    top: 40px;
    z-index: 900;
  }

  .console {
    width: 100%;
    max-width: 1000px;
    border: 1px solid #515151;
    margin: auto;
    background-color: #eaeaea;
  }

  .preview {
    width: 100%;
    margin: auto;
  }

  .video_handler {
    position: absolute;
    border-radius: 7px 7px 0px 0px;
    top: -30px;
    left: -1px;
    background-color: #515151;
    color: #e1e1e1;
    font-weight: bold;
    padding: 8px;
  }

  .video_handler_2 {
    position: absolute;
    border-radius: 0px 0px 7px 7px;
    bottom: -34px;
    right: -1px;
    background-color: #515151;
    color: #e1e1e1;
    font-weight: bold;
    padding: 8px;
  }

  .form_layout {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .form_layout_cont {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*max-width: 750px;*/
  }
</style>
