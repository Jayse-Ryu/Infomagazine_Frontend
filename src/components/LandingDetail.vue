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

      <form v-on:submit.prevent="landing_check">
        <h5>기본정보</h5>
        <div class="form-group row">

          <label class="col-sm-3 col-form-label-sm mt-3" for="company_name">
            <span>고객업체*</span>
          </label>

          <div class="col-sm-9 mt-sm-3" id="company_name">
            <div v-if="dynamo_obj.LandingInfo.landing.company == -1">
              <div class="form-control">업체를 선택하세요</div>
            </div>
            <div v-for="content in landing_company">
              <div v-if="content.id == dynamo_obj.LandingInfo.landing.company" class="form-control">
                {{content.name }} - {{ content.sub_name }}
              </div>
            </div>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="landing">
            <span>랜딩페이지 이름*</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" :class="duplicated_name_class" id="landing" maxlength="50"
                   v-model="dynamo_obj.LandingInfo.landing.name" @change="check_name">
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
            <input type="text" :class="duplicated_url_class" id="base_url" maxlength="30"
                   v-model="dynamo_obj.LandingInfo.landing.base_url" @change="check_url">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="db_show">
            <span>DB 조회</span>
          </label>
          <div class="col-sm-9 mt-sm-3">
            <router-link :to="'/db/detail/' + epoch_time">
              <button type="button" id="db_show" class="col-sm-12 btn btn-info">DB 보기</button>
            </router-link>
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
              <option v-for="item in dynamo_obj.LandingInfo.form" :value="item.sign">{{ item.name }}</option>
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
            <input type="text" v-model="form_selected.bg_color" class="form-control col-sm-5" maxlength="10">
            <div class="margin_div"></div>
          </div>

          <label v-if="form_selected.sign != -1" class="col-sm-3 col-form-label-sm mt-3" for="opacity_slider">
            배경 불투명도
          </label>
          <div v-if="form_selected.sign != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="form-control col-sm-2">{{ form_selected.opacity * 10 }}%</div>
            <div class="margin_div"></div>
            <div class="slide_container col-sm-5 form-control border-0 p-0">
              <input class="opacity_slider w-100 h-100" id="opacity_slider" type="range" min="0" max="10" value="10" v-model="form_selected.opacity" >
            </div>
          </div>

          <label v-if="form_selected.sign != -1" class="col-sm-3 col-form-label-sm mt-3" for="form_group_col">
            폼 폰트색
          </label>
          <div v-if="form_selected.sign != -1" class="col-sm-9 mt-sm-3 row ml-0">
            <div class="color_wrap form-control col-sm-2" id="form_group_col">
              <input type="color" v-model="form_selected.tx_color" class="color_picker">
            </div>
            <div class="margin_div"></div>
            <input type="text" v-model="form_selected.tx_color" class="form-control col-sm-5" maxlength="10">
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
              <option value="10">약관 동의</option>
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
                <div class="col-3 p-2 text-center" v-if="content.type == 10">약관 동의</div>
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

                      <label class="col-sm-3 col-form-label-sm mt-3" :for="'la_switch'+content.sign">라벨 켜기</label>
                      <div class="col-sm-9 mt-sm-3">
                        <label class="switch" :for="'la_switch'+content.sign">
                          <input type="checkbox" :id="'la_switch'+content.sign" v-model="content.label">
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <label class="col-sm-3 col-form-label-sm mt-3" for="f_type">타입*</label>
                      <div class="col-sm-9 mt-sm-3">
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
                          <option value="10">약관 동의</option>
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
                        <input type="text" class="form-control" id="f_holder" maxlength="50" v-model="content.holder">
                      </div>

                      <label v-if="content.type == 8" class="col-sm-3 col-form-label-sm mt-3" for="f_val">전화번호</label>
                      <div v-if="content.type == 8" class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_val" maxlength="12" v-model="content.value">
                      </div>

                      <label v-if="content.type == 7" class="col-sm-3 col-form-label-sm mt-3" for="f_link">링크</label>
                      <div v-if="content.type == 7" class="col-sm-9 mt-sm-3">
                        <input type="text" class="form-control" id="f_link" maxlength="200" v-model="content.url">
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
                               :ref="'field_file_input_' + content.type" @change="field_file_add(content.sign)"
                               :value="content.image"
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

          <label class="col-sm-3 col-form-label-sm mt-3" for="term_status">약관</label>

          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_status">
              <input type="checkbox" id="term_status" v-model="dynamo_obj.LandingInfo.landing.is_term">
              <span class="slider round"></span>
            </label>
          </div>

          <label v-if="dynamo_obj.LandingInfo.landing.is_term" class="col-sm-3 col-form-label-sm mt-3"
                 for="term_switch">
            약관 이미지
          </label>

          <div v-if="dynamo_obj.LandingInfo.landing.is_term" class="col-sm-9 mt-sm-3">
            <label class="switch" for="term_switch">
              <input type="checkbox" id="term_switch" v-model="dynamo_obj.LandingInfo.landing.image_term"
                     @change="term_file_delete()">
              <span class="slider round"></span>
            </label>
          </div>

        </div>

        <div class="form-group row"
             v-if="dynamo_obj.LandingInfo.landing.is_term && dynamo_obj.LandingInfo.landing.image_term">
          <label class="col-sm-3 col-form-label-sm mt-3" for="term_img">약관 이미지 파일</label>
          <div class="col-sm-9 mt-sm-3 row ml-0">
            <input type="file" class="input_one_btn form-control col-md-11 pt-1" id="term_img" placeholder="이미지"
                   ref="term_file_input" @change="term_file_add()" accept="image/*">
            <button type="button" class="btn btn-danger col-md-1 p-0" @click.prevent="term_file_delete()">삭제</button>
          </div>
        </div>

        <div class="form-group row"
             v-if="dynamo_obj.LandingInfo.landing.is_term && !dynamo_obj.LandingInfo.landing.image_term">
          <label class="col-sm-3 col-form-label-sm mt-3" for="term_title">약관 제목</label>
          <div class="col-sm-9 mt-sm-3">
            <input type="text" class="form-control" id="term_title" placeholder="title"
                   v-model="dynamo_obj.LandingInfo.term.title">
          </div>
          <label class="col-sm-3 col-form-label-sm mt-3" for="term_cont">약관 내용</label>
          <div class="col-sm-9 mt-sm-3">
                    <textarea type="text" class="form-control" id="term_cont" rows="4" placeholder="content"
                              v-model="dynamo_obj.LandingInfo.term.content"></textarea>
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
            <input type="text" class="form-control" id="page_title" maxlength="50"
                   v-model="dynamo_obj.LandingInfo.landing.title">
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="header_script">
            <span>헤더 스크립트</span>
          </label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="header_script" rows="4"
                      v-model="dynamo_obj.LandingInfo.landing.header_script"></textarea>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="body_script">
            <span>바디 스크립트</span>
          </label>
          <div class="col-sm-12">
            <textarea type="text" class="form-control" id="body_script" rows="4"
                      v-model="dynamo_obj.LandingInfo.landing.body_script"></textarea>
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
              <div class="basket" :style="{'height': order_wrap_height + 'px'}">
                <vue-draggable-resizable v-for="item in dynamo_obj.LandingInfo.order"
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

                  <!-- Order layout for image -->
                  <img v-if="item.type == 1 && !item.image_data" src="../assets/logo1.png" alt="logo_none"
                       style="width: 100%; height: 100%; object-fit: contain;">
                  <img v-if="item.type == 1 && item.image_data" :src="item.image_url" alt="logo_in"
                       style="width: 100%; height: 100%; object-fit: contain;">


                  <!-- Order layout for form group -->
                  <div v-if="item.type == 2" class="form_layout" v-for="form in dynamo_obj.LandingInfo.form">
                    <div class="form_layout_cont" v-if="form.sign === item.form_group"
                         :style="'background:'+form.bg_color+';' + 'color:'+form.tx_color+';'+'z-index:10;'+'min-height: 100%;'">

                      <!-- big form -->
                      <div class="form-group row mb-1" v-if="item.position.w > 768" v-for="field in dynamo_obj.LandingInfo.field">

                        <!-- input form area -->
                        <div class="w-100 row m-0" v-if="field.type != 7 && field.type != 8 && field.type != 9">
                          <label v-if="field.form_group_id == item.form_group && field.label == true"
                                 class="mt-3 text-center font-weight-bold pr-0 pt-2 order_form_label"
                                 :for="'label'+field.name">
                            {{ field.name }}
                          </label>
                          <div v-if="field.form_group_id == item.form_group && field.label == true"
                               class="mt-sm-3 order_form_box">

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
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="radio" :name="field.sign" :value="list"
                                         :id="'field_'+list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <div v-if="field.type == 5" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="checkbox" :id="'field_' + list" :value="list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <input v-if="field.type == 6" type="text" class="form-control" disabled
                                   placeholder="Datepicker" :id="'label'+field.name">

                            <div v-if="field.type == 10" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2">
                                <label class="form-check-label" :for="'term' + field.name">
                                  <input class="form-check-input" type="checkbox" :id="'term'+field.name" value="1">
                                  {{ field.holder }}
                                </label>
                                <button type="button" v-if="dynamo_obj.LandingInfo.landing.is_term"
                                        class="btn-sm btn-link p-0 border-0"
                                        style="line-height: 15px;">[{{ field.name }}]</button>
                              </div>
                            </div>

                          </div>

                          <div v-else-if="field.form_group_id == item.form_group && field.label == false" class="col-sm-12 mt-sm-3">

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
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="radio" :name="field.sign" :value="list"
                                         :id="'field_'+list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <div v-if="field.type == 5" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="checkbox" :id="'field_' + list" :value="list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <input v-if="field.type == 6" type="text" class="form-control" disabled
                                   placeholder="Datepicker" :id="'label'+field.name">

                            <div v-if="field.type == 10" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap justify-content-end">
                              <div class="p-2">
                                <label class="form-check-label" :for="'term' + field.name">
                                  <input class="form-check-input" type="checkbox" :id="'term'+field.name" value="1">
                                  {{ field.holder }}
                                </label>
                                <button type="button" v-if="dynamo_obj.LandingInfo.landing.is_term"
                                        class="btn-sm btn-link p-0 border-0"
                                        style="line-height: 15px;">[{{ field.name }}]</button>
                              </div>
                            </div>

                          </div>

                        </div>
                        <!-- /input form area -->

                        <!-- button area -->
                        <div class="pl-3 pr-3 pt-1 pb-1 col"
                             v-else-if="field.type == 7 || field.type == 8 || field.type == 9">
                          <div v-if="field.form_group_id == item.form_group">

                            <!-- link without image -->
                            <button v-if="field.type == 7 && !field.image_url" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <!-- link with image -->
                            <button v-else-if="field.type == 7 && field.image_url" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                            </button>

                            <!-- tel without image -->
                            <button v-if="field.type == 8 && !field.image_url" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <!-- tel with image -->
                            <button v-else-if="field.type == 8 && field.image_url" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                            </button>

                            <!-- submit without image -->
                            <button v-if="field.type == 9 && !field.image_url" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <!-- submit with image -->
                            <button v-else-if="field.type == 9 && field.image_url" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                            </button>
                          </div>
                        </div>
                        <!-- /button area -->

                      </div>
                      <!-- /big form -->

                      <!-- small form -->
                      <div class="form-group row mb-1" v-else-if="item.position.w < 769">
                        <!-- input form area -->
                        <div class="w-100 row m-0" v-if="field.type != 7 && field.type != 8 && field.type != 9">
                          <label v-if="field.form_group_id == item.form_group && field.label == true"
                                 class="col-12 font-weight-bold pr-0 pt-2 order_form_label"
                                 :for="'label'+field.name">
                            {{ field.name }}
                          </label>
                          <div v-if="field.form_group_id == item.form_group && field.label == true"
                               class="col-12 order_form_box">

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
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="radio" :name="field.sign" :value="list"
                                         :id="'field_'+list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <div v-if="field.type == 5" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="checkbox" :id="'field_' + list" :value="list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <input v-if="field.type == 6" type="text" class="form-control" disabled
                                   placeholder="Datepicker" :id="'label'+field.name">

                            <div v-if="field.type == 10" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap">
                              <div class="p-2">
                                <label class="form-check-label" :for="'term' + field.name">
                                  <input class="form-check-input" type="checkbox" :id="'term'+field.name" value="1">
                                  {{ field.holder }}
                                </label>
                                <button type="button" v-if="dynamo_obj.LandingInfo.landing.is_term"
                                        class="btn-sm btn-link p-0 border-0"
                                        style="line-height: 15px;">[{{ field.name }}]</button>
                              </div>
                            </div>

                          </div>

                          <div v-else-if="field.form_group_id == item.form_group && field.label == false" class="col-sm-12 mt-sm-3">

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
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="radio" :name="field.sign" :value="list"
                                         :id="'field_'+list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <div v-if="field.type == 5" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap ">
                              <div class="p-2" v-for="list in field.list">
                                <label class="form-check-label" :for="'field_' + list">
                                  <input class="form-check-input" type="checkbox" :id="'field_' + list" :value="list">
                                  {{ list }}
                                </label>
                              </div>
                            </div>

                            <input v-if="field.type == 6" type="text" class="form-control" disabled
                                   placeholder="Datepicker" :id="'label'+field.name">

                            <div v-if="field.type == 10" :id="'label'+field.name"
                                 class="form-check-inline d-flex flex-wrap justify-content-end">
                              <div class="p-2">
                                <label class="form-check-label" :for="'term' + field.name">
                                  <input class="form-check-input" type="checkbox" :id="'term'+field.name" value="1">
                                  {{ field.holder }}
                                </label>
                                <button type="button" v-if="dynamo_obj.LandingInfo.landing.is_term"
                                        class="btn-sm btn-link p-0 border-0"
                                        style="line-height: 15px;">[{{ field.name }}]</button>
                              </div>
                            </div>

                          </div>

                        </div>
                        <!-- /input form area -->

                        <!-- button area -->
                        <div class="pl-3 pr-3 pt-1 pb-1 col"
                             v-else-if="field.type == 7 || field.type == 8 || field.type == 9">
                          <div v-if="field.form_group_id == item.form_group">

                            <!-- link without image -->
                            <button v-if="field.type == 7 && !field.image_url" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <!-- link with image -->
                            <button v-else-if="field.type == 7 && field.image_url" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                            </button>

                            <!-- tel without image -->
                            <button v-if="field.type == 8 && !field.image_url" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <!-- tel with image -->
                            <button v-else-if="field.type == 8 && field.image_url" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                            </button>

                            <!-- submit without image -->
                            <button v-if="field.type == 9 && !field.image_url" type="button"
                                    class="btn w-100"
                                    :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                              {{ field.holder }}
                            </button>
                            <!-- submit with image -->
                            <button v-else-if="field.type == 9 && field.image_url" type="button"
                                    class="btn w-100 p-0" style="background: transparent;">
                              <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                            </button>
                          </div>
                        </div>
                        <!-- /button area -->
                      </div>
                      <!-- /small form -->
                    </div>
                    <!-- /form_layout_cont -->
                  </div>
                  <!-- /form_layout -->


                  <!-- Order layout for video -->
                  <div v-if="item.type == 3">
                    <span class="video_handler">비디오 드래그</span>
                    <span class="video_handler_2">비디오 드래그</span>
                    <div style="position: absolute; width: 100%; max-width: 1000px; margin: auto; left: 0; top: 50%; transform: translateY(-50%)">
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
                <div v-for="info in dynamo_obj.LandingInfo.order">
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
                        <option v-for="content in dynamo_obj.LandingInfo.form" :value="content.sign">
                          {{ content.name }}
                        </option>
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
                      <input type="number" id="console_w" v-model.number="info.position.w"
                             class="form-control"
                             step="5">
                    </div>

                    <label for="console_h" class="col-sm-3 col-form-label-sm mt-3">높이</label>
                    <div class="col-sm-9 mt-sm-3">
                      <input type="number" id="console_h" v-model.number="info.position.h"
                             class="form-control"
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
              <button type="button" class="btn btn-info w-100" @click="preview">미리보기</button>
            </div>

            <div class="form-group row mb-0">

              <label class="col-sm-3 col-form-label-sm mt-3" for="layout_font">
                <span>레이아웃 폰트</span>
              </label>
              <div class="col-sm-9 mt-sm-3 row ml-0">
                <select class="form-control" name="layout_font" id="layout_font"
                        v-model="dynamo_obj.LandingInfo.landing.font">
                  <option value="-1">OS 기본</option>
                  <option value="1">Sans-serif</option>
                  <option value="2">나눔고딕 (Nanum Gothic)</option>
                  <option value="3">나눔명조 (Nanum Myeongjo)</option>
                  <option value="4">제주고딕 (Jeju Gothic)</option>
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
                  <input type="checkbox" id="in_db" v-model="dynamo_obj.LandingInfo.landing.inner_db">
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
                  <input type="checkbox" id="in_company" v-model="dynamo_obj.LandingInfo.landing.show_company">
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
                  <input type="checkbox" id="is_hijack" v-model="dynamo_obj.LandingInfo.landing.is_hijack">
                  <span class="slider round"></span>
                </label>
              </div>
              <label v-if="dynamo_obj.LandingInfo.landing.is_hijack" class="col-sm-3 col-form-label-sm mt-3"
                     for="hijack">
                <span>후팝업 링크</span>
              </label>
              <div v-if="dynamo_obj.LandingInfo.landing.is_hijack" class="col-sm-9 mt-sm-3 row ml-0">
                <input type="text" class="form-control col" id="hijack" placeholder="후팝업 주소"
                       v-model="dynamo_obj.LandingInfo.landing.hijack_url">
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
                  <input type="checkbox" id="in_banner" v-model="dynamo_obj.LandingInfo.landing.is_banner"
                         @change="in_banner_file_delete()">
                  <span class="slider round"></span>
                </label>
              </div>

              <label v-if="dynamo_obj.LandingInfo.landing.is_banner" class="col-sm-3 col-form-label-sm mt-3"
                     for="in_banner_img">
                <span>띠배너 옵션</span>
              </label>
              <div v-if="dynamo_obj.LandingInfo.landing.is_banner" class="col-sm-9 mt-sm-3 row ml-0">

                <input type="file" class="form-control col-sm-5 col-md-5 pt-1" id="in_banner_img" placeholder="이미지"
                       ref="in_banner_file_input" @change="in_banner_file_add()" accept="image/*">
                <div class="margin_div"></div>
                <input type="text" class="form-control col-sm-7 col-md-5" id="in_banner_desc" placeholder="띠배너 주소"
                       v-model="dynamo_obj.LandingInfo.landing.banner_url">
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
              <input type="checkbox" id="status" v-model="dynamo_obj.LandingInfo.landing.is_active">
              <span class="slider round"></span>
            </label>
          </div>

          <label class="col-sm-3 col-form-label-sm mt-3" for="mobile">모바일 전용</label>
          <div class="col-sm-9 mt-sm-3">
            <label class="switch" for="mobile">
              <input type="checkbox" id="mobile" v-model="dynamo_obj.LandingInfo.landing.is_mobile">
              <span class="slider round"></span>
            </label>
          </div>

        </div>

        <hr>

        <div class="form-group row">
          <div class="col-12">
            <button type="submit" class="btn btn-info col-12">수정</button>
            <button type="button" class="btn btn-danger col-12 mt-2" @click="delete_landing">삭제</button>
            <button type="button" class="btn btn-dark col-12 mt-2" @click="back_to_list">취소</button>
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
      epoch_time: 0,
      // Landing obj
      dynamo_obj: {
        CompanyNum: '',
        LandingNum: '',
        UpdatedTime: '',
        LandingInfo: {
          landing: {
            company: -1,
            manager: -1,
            name: '',
            title: null,
            header_script: null,
            body_script: null,
            base_url: '',
            is_hijack: false,
            hijack_url: null,
            is_active: true,
            is_mobile: false,
            views: 0,
            collections: [],
            is_banner: false,
            banner_url: null,
            banner_image: null,
            inner_db: true,
            font: -1,
            is_term: false,
            image_term: false,
            show_company: false
          },
          term: {
            title: '',
            content: '',
            image: ''
          },
          form: [],
          field: [],
          order: []
        }
      },
      // Duplicate check
      duplicated_name_class: 'form-control',
      duplicated_name_flag: false,
      duplicated_url_class: 'form-control',
      duplicated_url_flag: false,
      // Order relative
      order_focus_flag: false,
      order_selected: 0,
      // Form relative
      form_temp: '',
      form_arrow: -1,
      form_selected: {
        sign: -1,
        bg_color: '#f9f9f9',
        tx_color: '#313131',
        opacity: 10
      },
      // Filter relative
      filtered_fields: [],
      field_selected: -1,
      field_temp_name: '',
    }),
    methods: {
      // Form groups Handle
      // Form groups Handle
      // Form groups Handle
      form_group_add() {
        if (this.form_temp) {
          let len = this.dynamo_obj.LandingInfo.form.length
          let flag = true
          if (len) {
            for (let i = 0; i < len; i++) {
              if (this.dynamo_obj.LandingInfo.form[i].name === this.form_temp) {
                alert('폼 그룹 이름이 이미 존재합니다.')
                flag = false
                return flag
              }
            }
            if (flag) {
              let highest = 0
              for (let i = 0; i < len; i++) {
                if (this.dynamo_obj.LandingInfo.form[i].sign > highest) {
                  highest = this.dynamo_obj.LandingInfo.form[i].sign
                }
              }
              let hex = '#fafafa'
              let r = parseInt(hex.slice(1, 3), 16)
              let g = parseInt(hex.slice(3, 5), 16)
              let b = parseInt(hex.slice(5, 7), 16)
              let o = 1
              this.dynamo_obj.LandingInfo.form.push({
                sign: highest + 1,
                name: this.form_temp,
                bg_color: '#fafafa',
                tx_color: '#313131',
                opacity: 10,
                rgba: (r+','+g+','+b+','+o)
              })
              this.form_temp = ''
              alert('폼 그룹이 생성되었습니다.')
            }
          } else {
            let hex = '#fafafa'
            let r = parseInt(hex.slice(1, 3), 16)
            let g = parseInt(hex.slice(3, 5), 16)
            let b = parseInt(hex.slice(5, 7), 16)
            let o = 1
            this.dynamo_obj.LandingInfo.form.push({
              sign: 1,
              name: this.form_temp,
              bg_color: '#fafafa',
              tx_color: '#313131',
              opacity: 10,
              rgba: (r+','+g+','+b+','+o),
            })
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
            this.dynamo_obj.LandingInfo.form = this.dynamo_obj.LandingInfo.form.filter(el => el.sign != id)
            this.form_arrow = -1
            this.form_selected = {sign: -1, tx_color: '#313131', bg_color: '#fafafa', opacity: 10}
            // Field objs delete also
            this.dynamo_obj.LandingInfo.field = this.dynamo_obj.LandingInfo.field.filter(el => el.form_group_id != id)
          }
        } else {
          alert('그룹을 먼저 선택하세요.')
        }
      },
      form_changed(id) {
        if (id == -1) {
          this.form_selected = {sign: -1, tx_color: '#313131', bg_color: '#fafafa', opacity: 10}
        } else {
          for (let i = 0; i < this.dynamo_obj.LandingInfo.form.length; i++) {
            if (this.dynamo_obj.LandingInfo.form[i].sign == id) {
              this.form_selected = this.dynamo_obj.LandingInfo.form[i]
              this.filter_change()
            }
          }
        }
      },
      // form_color_get(id) {
      //   for(let i = 0; i< this.dynamo_obj.LandingInfo.form.length; i++) {
      //     if (this.dynamo_obj.LandingInfo.form[i].sign == id) {
      //       let hex = this.dynamo_obj.LandingInfo.form[i].bg_color
      //       let opacity = this.dynamo_obj.LandingInfo.form[i].opacity
      //       let r = parseInt(hex.slice(1, 3), 16)
      //       let g = parseInt(hex.slice(3, 5), 16)
      //       let b = parseInt(hex.slice(5, 7), 16)
      //       let o = opacity / 10
      //       console.log(r, g, b, o)
      //       this.dynamo_obj.LandingInfo.form[i].rgba = (r+','+g+','+b+','+o)
      //     }
      //   }
      // },
      // Filtered fields by form group
      filter_change() {
        this.filtered_fields = []
        for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
          if (this.dynamo_obj.LandingInfo.field[i].form_group_id == this.form_selected.sign) {
            // this.filtered_fields
            this.filtered_fields.push(this.dynamo_obj.LandingInfo.field[i])
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
            if (this.dynamo_obj.LandingInfo.field.length != 0) {
              let highest = 0
              let flag = true
              for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
                if (this.form_selected.sign == this.dynamo_obj.LandingInfo.field[i].form_group_id) {
                  if (this.field_temp_name == this.dynamo_obj.LandingInfo.field[i].name) {
                    alert('이미 존재하는 필드 이름입니다.')
                    flag = false
                    return flag
                  }
                }
              }
              if (flag) {
                for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
                  if (this.dynamo_obj.LandingInfo.field[i].sign > highest) {
                    highest = this.dynamo_obj.LandingInfo.field[i].sign
                  }
                }
              }
              this.dynamo_obj.LandingInfo.field.push({
                sign: highest + 1,
                type: this.field_selected * 1,
                label: true,
                name: this.field_temp_name,
                holder: this.field_temp_name,
                form_group_id: this.form_selected.sign,
                back_color: '#287BFF',
                text_color: '#f0f0f0',
                opacity: 10,
                list: [],
                image_data: null
              })
              this.field_temp_name = ''
              this.filter_change()
            } else {
              this.dynamo_obj.LandingInfo.field.push({
                sign: 1,
                type: this.field_selected * 1,
                label: true,
                name: this.field_temp_name,
                holder: this.field_temp_name,
                form_group_id: this.form_selected.sign,
                back_color: '#287BFF',
                text_color: '#fafafa',
                opacity: 10,
                list: [],
                image_data: null
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
        for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
          if (this.dynamo_obj.LandingInfo.field[i].sign == id) {
            // this.field_obj = this.field_obj.splice(id, 1)
            this.dynamo_obj.LandingInfo.field.splice(i, 1)
            this.filter_change()
            return true
          }
        }
      },
      field_list_add(id) {
        for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
          if (this.dynamo_obj.LandingInfo.field[i].sign == id) {
            this.dynamo_obj.LandingInfo.field[i].list.push("")
            this.filter_change()
            return true
          }
        }
      },
      field_list_delete(id, index) {
        for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
          if (this.dynamo_obj.LandingInfo.field[i].sign == id) {
            this.dynamo_obj.LandingInfo.field[i].list.splice(index, 1)
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
      // Order handle
      // Order handle
      // Order handle
      order_add() {
        let len = this.dynamo_obj.LandingInfo.order.length
        if (len) {
          let highest = 0
          let z = 1
          for (let i = 0; i < len; i++) {
            if (this.dynamo_obj.LandingInfo.order[i].sign > highest) {
              highest = this.dynamo_obj.LandingInfo.order[i].sign
            }
          }
          for (let j = 0; j < len; j++) {
            if (this.dynamo_obj.LandingInfo.order[j].position.z > z) {
              z = this.dynamo_obj.LandingInfo.order[j].position.z
            }
          }
          let order_ready = {
            sign: highest + 1,
            type: 1,
            name: 'new layout',
            position: {x: 0, y: 0, w: 100, h: 100, z: z + 1},
            image_data: '',
            image_url: '',
            video_type: 1
          }
          this.dynamo_obj.LandingInfo.order.push(order_ready)
          alert('레이아웃이 생성되었습니다.')
        } else {
          let order_ready = {
            sign: 1,
            type: 1,
            name: 'new layout',
            position: {x: 0, y: 0, w: 100, h: 100, z: 1},
            image_data: '',
            image_url: '',
            video_type: 1
          }
          this.dynamo_obj.LandingInfo.order.push(order_ready)
          alert('레이아웃이 생성되었습니다.')
        }
      },
      order_delete() {
        if (this.order_selected) {
          if (confirm('선택한 레이아웃을 삭제하시겠습니까?')) {
            for (let i = 0; i < this.dynamo_obj.LandingInfo.order.length; i++) {
              if (this.dynamo_obj.LandingInfo.order[i].sign == this.order_selected) {
                if (i === 0) {
                  this.dynamo_obj.LandingInfo.order.shift()
                } else {
                  this.dynamo_obj.LandingInfo.order.splice(i, 1)
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
      order_activated(sign) {
        this.order_selected = sign
        this.order_focus_flag = true
      },
      order_deactivated() {
        // this.order_selected = 0
        // this.order_focus_flag = false
      },
      order_move(x, y) {
        for (let i = 0; i < this.dynamo_obj.LandingInfo.order.length; i++) {
          if (this.dynamo_obj.LandingInfo.order[i].sign == this.order_selected) {
            this.dynamo_obj.LandingInfo.order[i].position.x = x
            this.dynamo_obj.LandingInfo.order[i].position.y = y
          }
        }
      },
      order_resize(x, y, w, h) {
        for (let i = 0; i < this.dynamo_obj.LandingInfo.order.length; i++) {
          if (this.dynamo_obj.LandingInfo.order[i].sign == this.order_selected) {
            this.dynamo_obj.LandingInfo.order[i].position.x = x
            this.dynamo_obj.LandingInfo.order[i].position.y = y
            this.dynamo_obj.LandingInfo.order[i].position.w = w
            this.dynamo_obj.LandingInfo.order[i].position.h = h
          }
        }
      },
      // order_resize_console(info, pos) {
      //   if (info.type == 3) {
      //     if (pos == 'w') {
      //       let calc = info.position.w * 0.5625
      //       info.position.h = Math.ceil(calc/5)*5
      //     } else if (pos == 'h') {
      //       let calc = info.position.h / 0.5625
      //       info.position.w = Math.ceil(calc/5)*5
      //     }
      //   }
      // },
      order_image_change(sign) {
        let file_data = event.target.files[0]
        for (let i = 0; i < this.dynamo_obj.LandingInfo.order.length; i++) {
          if (this.dynamo_obj.LandingInfo.order[i].sign == sign) {
            this.dynamo_obj.LandingInfo.order[i].image_data = file_data
            this.dynamo_obj.LandingInfo.order[i].image_url = URL.createObjectURL(file_data)
          }
        }
      },
      /* e */
      /* n */
      /* d */
      // File handle
      // File handle
      // File handle
      field_file_add(sign) {
        let file_data = event.target.files[0]
        for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
          if (this.dynamo_obj.LandingInfo.field[i].sign == sign) {
            this.dynamo_obj.LandingInfo.field[i].image_data = file_data
            this.dynamo_obj.LandingInfo.field[i].image_url = URL.createObjectURL(file_data)
          }
        }
      },
      field_file_delete(sign) {
        document.getElementById('field_file_input' + sign).value = ''
        for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
          if (this.dynamo_obj.LandingInfo.field[i].sign == sign) {
            this.dynamo_obj.LandingInfo.field[i].image_data = null
            this.dynamo_obj.LandingInfo.field[i].image_url = null
          }
        }
      },
      term_file_add() {
        /* When file data changed */
        let file_data = event.target.files[0]
        this.dynamo_obj.LandingInfo.term.image = file_data
      },
      term_file_delete() {
        /* Remove file data */
        if (this.$refs.term_file_input) {
          this.$refs.term_file_input.value = null
        }
        this.dynamo_obj.LandingInfo.term.image = null
      },
      in_banner_file_add() {
        /* When file data changed */
        let file_data = event.target.files[0]
        this.dynamo_obj.LandingInfo.landing.banner_image = file_data
      },
      in_banner_file_delete() {
        /* Remove file data */
        if (this.$refs.in_banner_file_input) {
          this.$refs.in_banner_file_input.value = null
        }
        this.dynamo_obj.LandingInfo.landing.banner_image = null
      },
      /* e */
      /* n */
      /* d */
      // Check duplicated Name
      // Check duplicated Name
      // Check duplicated Name
      check_name() {
        let axios = this.$axios
        if (this.dynamo_obj.LandingInfo.landing.name == '') {
          this.duplicated_name_class = 'form-control'
          this.duplicated_name_flag = false
        } else {
          axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/?auth=staff')
            .then((response) => {
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].LandingInfo['landing']['name'] !== null) {
                  if ((this.dynamo_obj.LandingInfo.landing.name).toLowerCase() == (response.data[i].LandingInfo.landing.name).toLowerCase()) {
                    this.duplicated_name_flag = true
                    this.duplicated_name_class = 'form-control alert-danger'
                    return false
                  }
                }
              }
              this.duplicated_name_class = 'form-control alert-success'
              this.duplicated_name_flag = false
            })
        }
      },
      check_url() {
        let axios = this.$axios
        if (this.dynamo_obj.LandingInfo.landing.base_url == '') {
          this.duplicated_url_class = 'form-control'
          this.duplicated_url_flag = false
        } else {
          axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/?auth=staff')
            .then((response) => {
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].LandingInfo['landing']['base_url'] !== null || response.data[i].LandingInfo['landing']['base_url'] !== '') {
                }
                if (response.data[i].LandingInfo['landing']['base_url'] !== null || response.data[i].LandingInfo['landing']['base_url'] !== '') {
                  if ((this.dynamo_obj.LandingInfo.landing.base_url).toLowerCase() == (response.data[i].LandingInfo['landing']['base_url']).toLowerCase()) {
                    this.duplicated_url_flag = true
                    this.duplicated_url_class = 'form-control alert-danger'
                    return false
                  }
                }
              }
              this.duplicated_url_class = 'form-control alert-success'
              this.duplicated_url_flag = false
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
        if (this.dynamo_obj.LandingInfo.landing.company == -1) {
          alert('업체를 선택하세요!')
          document.getElementById('company_id').focus()
        } else if (this.dynamo_obj.LandingInfo.landing.manager == -1) {
          alert('관리자를 선택하세요!')
          document.getElementById('manager').focus()
        } else if (!this.dynamo_obj.LandingInfo.landing.name) {
          alert('랜딩페이지 이름을 입력하세요!')
          document.getElementById('landing').focus()
        } else if (this.duplicated_name_flag) {
          alert('랜딩페이지 이름이 이미 존재합니다!')
          document.getElementById('landing').focus()
        } else if (!this.dynamo_obj.LandingInfo.landing.base_url) {
          alert('메인 URL을 입력하세요!')
          document.getElementById('base_url').focus()
        } else if (this.duplicated_url_flag) {
          alert('메인 URL이 이미 존재합니다!')
          document.getElementById('base_url').focus()
        } else {
          if (this.dynamo_obj.LandingInfo.form.length > 0) {
            let flag = true
            for (let i = 0; i < this.dynamo_obj.LandingInfo.field.length; i++) {
              if (this.dynamo_obj.LandingInfo.field[i].name == '') {
                alert('폼 그룹의 필드 이름을 모두 입력해주세요!')
                document.getElementById('db_field').focus()
                flag = false
                return flag
              }
            }
            if (flag) {
              this.collect_dynamo('checked')
            }
          } else {
            this.collect_dynamo('checked')
          }
        }
      },
      collect_dynamo(option) {
        // option first(mounted) or checked(button clicked)
        let axios = this.$axios
        const config = {
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'multipart/form-data'
          }
        }
        this.dynamo_obj.CompanyNum = this.dynamo_obj.LandingInfo.landing.company.toString()
        this.dynamo_obj.LandingNum = this.epoch_time.toString()
        this.dynamo_obj.UpdatedTime = (Date.now()).toString()
        // Empty objects make as Null
        for (let key in this.dynamo_obj.LandingInfo.landing) {
          if (this.dynamo_obj.LandingInfo.landing.hasOwnProperty(key)) {
            if (this.dynamo_obj.LandingInfo.landing[key] === '' && typeof (this.dynamo_obj.LandingInfo.landing[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.landing[key] = null
            }
          }
        }
        for (let key in this.dynamo_obj.LandingInfo.form) {
          if (this.dynamo_obj.LandingInfo.form.hasOwnProperty(key)) {
            if (this.dynamo_obj.LandingInfo.form[key] === '' && typeof (this.dynamo_obj.LandingInfo.form[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.form[key] = null
            }
          }
        }
        for (let key in this.dynamo_obj.LandingInfo.field) {
          if (this.dynamo_obj.LandingInfo.field.hasOwnProperty(key)) {
            for (let j in this.dynamo_obj.LandingInfo.field[key]) {
              if (this.dynamo_obj.LandingInfo.field[key][j] === '') {
                this.dynamo_obj.LandingInfo.field[key][j] = null
              }
            }
          }
        }
        for (let key in this.dynamo_obj.LandingInfo.order) {
          if (this.dynamo_obj.LandingInfo.order.hasOwnProperty(key)) {
            for (let j in this.dynamo_obj.LandingInfo.order[key]) {
              if (this.dynamo_obj.LandingInfo.order[key][j] === '') {
                this.dynamo_obj.LandingInfo.order[key][j] = null
              }
            }
          }
        }
        for (let key in this.dynamo_obj.LandingInfo.term) {
          if (this.dynamo_obj.LandingInfo.term.hasOwnProperty(key)) {
            if (this.dynamo_obj.LandingInfo.term[key] === '' && typeof (this.dynamo_obj.LandingInfo.term[key]) != 'boolean') {
              this.dynamo_obj.LandingInfo.term[key] = null
            }
          }
        }

        // console.log('axios temporary disabled')
        // console.log(this.dynamo_obj)
        axios.post(this.$store.state.endpoints.baseUrl + 'landing/api/', this.dynamo_obj, config)
          .then(() => {
            if (option == 'checked') {
              alert('랜딩이 수정되었습니다.')
              this.bye()
            }
          })
          .catch((error) => {
            if (option == 'checked') {
              alert('랜딩 수정이 실패하였습니다.')
            }
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
      delete_landing() {
        if (confirm('정말 삭제하시겠습니까?')) {
          let axios = this.$axios
          let landing_num = this.epoch_time
          axios.delete(this.$store.state.endpoints.baseUrl + 'landing/api/' + landing_num)
            .then(() => {
              alert('삭제되었습니다.')
              this.$router.currentRoute.meta.protect_leave = 'no'
              this.$router.push({name: 'landing_list'})
            })
            .catch((error) => {
              console.log(error)
              alert('삭제 중 에러가 발생하였습니다. 다시 시도해주세요.')
            })
        }
      },
      back_to_list() {
        if (confirm('목록으로 돌아갈까요?')) {
          this.$router.currentRoute.meta.protect_leave = 'no'
          this.$router.push({name: 'landing_list'})
        }
      },
      preview() {
        let axios = this.$axios
        const config = {
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(this.$store.state.endpoints.baseUrl + 'preview/', this.dynamo_obj, config)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
      // Get landing obj from Landing Num
      this.epoch_time = this.$route.params.landing_id
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/' + this.$route.params.landing_id)
        .then((response) => {
          this.dynamo_obj = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      // Get companies from logged in user's organization
      let this_url = 'company/'
      axios.get(this.$store.state.endpoints.baseUrl + this_url)
        .then((response) => {
          this.landing_company = response.data.results
        })
        .catch((error) => {
          console.log(error)
        })
      // If not manager, push to db contents
      if (this.access_obj.access != 1) {
        this.$router.currentRoute.meta.protect_leave = 'no'
        this.$router.push({name: 'db_detail', params: {landing_id: this.epoch_time}})
      }
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
      },
      order_wrap_height() {
        let highest = 450
        for (let i = 0; i < this.dynamo_obj.LandingInfo.order.length; i ++) {
          let sum = this.dynamo_obj.LandingInfo.order[i].position.y + this.dynamo_obj.LandingInfo.order[i].position.h
          if (sum > highest) {
            highest = sum + 50
          }
        }
        return highest
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
    border-radius: 7px 0px 0px 7px;
    top: -1px;
    left: -104px;
    background-color: #515151;
    color: #e1e1e1;
    font-weight: bold;
    padding: 8px;
  }

  .video_handler_2 {
    position: absolute;
    border-radius: 0px 7px 7px 7px;
    bottom: -34px;
    right: -54px;
    background-color: #515151;
    color: #e1e1e1;
    font-weight: bold;
    padding: 8px;
  }

  .form_layout {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .form_layout_cont {
    position: relative;
    left: 0;
    width: 100%;
    padding: 0 15px;
    /*max-width: 750px;*/
  }

  /*.form_group_big {
    top: 50%;
    transform: translateY(-50%);
  }

  .form_group_small {
    top: 0;
  }*/

  .order_form_label {
    width: 25%;
  }

  .order_form_box {
    width: 75%;
    padding: 0 15px;
  }

  .order_form_button_image {
    width: 100%;
    height: 100%;
    max-height: 50px;
    object-fit: contain;
  }

  /* The slider itself */
  .opacity_slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    background: #eaeaea; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.9; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    border-radius: 5px;
    padding: 0 0.25em;
  }

  /* Mouse-over effects */
  .opacity_slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .opacity_slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 30px; /* Set a specific slider handle width */
    height: 30px; /* Slider handle height */
    background: #17a2b8; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 5px;
  }

  .opacity_slider::-moz-range-thumb {
    width: 30px; /* Set a specific slider handle width */
    height: 30px; /* Slider handle height */
    background: #17a2b8; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 5px;
  }


</style>
