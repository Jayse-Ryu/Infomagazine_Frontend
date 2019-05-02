<template>
  <div class="landing_overall">

    <div style="position: absolute;">{{ window_width }}</div>

    <div class="landing_wrap" :style="{'transform': 'scale(' + scale + ')'}">
    <!--<div class="landing_wrap">-->

      <!--<div>{{ $route.params.base }}</div>-->
      <!--<div>{{ $route.path }}</div>-->

      <!-- x y z / w h -->
      <!--<div v-for="content in order" class="order_content"
           :style="{
              'width': content.position.w / 10 + '%',
              'height': content.position.h / 10 + '%',
              'left': content.position.x / 10 + '%',
              'top': content.position.y / 10 + '%',
              'z-index': content.position.z
           }">
        <div v-if="content.type == 1" style="width: 100%; height: 100%; object-fit: contain">
          <img src="../assets/logo1.png" alt="temp" style="width: 100%; height: 100%; object-fit: contain">
        </div>
        <div v-else-if="content.type == 2">
          form
        </div>
        <div v-else-if="content.type == 3">
          video
        </div>
      </div>-->


      <div v-for="content in order" class="order_content"
           :style="{
              'width': content.position.w + 'px',
              'height': content.position.h + 'px',
              'left': content.position.x + 'px',
              'top': content.position.y + 'px',
              'z-index': content.position.z
           }">
        <!--<div v-if="content.type == 1" style="width: 100%; height: 100%; object-fit: contain">
          <img src="../assets/logo1.png" alt="temp" style="width: 100%; height: 100%; object-fit: contain">
        </div>
        <div v-else-if="content.type == 2">
          {{ content.form_group }}
          <div v-for="item in landing.LandingInfo.field">
            {{ item }}
          </div>
        </div>
        <div v-else-if="content.type == 3">
          video<br/>
          {{ content.video_type }}<br/>
          {{ content.video_data }}
        </div>-->


        <!---->
        <!---->
        <!---->
        <!---->
        <!---->



        <!-- Order layout for image -->
        <img v-if="content.type == 1 && !content.image_data" src="../assets/logo1.png" alt="logo_none"
             style="width: 100%; height: 100%; object-fit: contain;">
        <img v-if="content.type == 1 && content.image_data" :src="content.image_url" alt="logo_in"
             style="width: 100%; height: 100%; object-fit: contain;">


        <!-- Order layout for form group -->
        <div v-if="content.type == 2" class="form_layout">
          <!--<div class="container form_layout_cont" v-if="form.sign == item.form_group"
               :style="'background:'+form.bg_color+';' + 'color:'+form.tx_color+';'+'z-index:10;'">
            <div class="form-group row mb-1" v-for="field in dynamo_obj.LandingInfo.field">
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

                  &lt;!&ndash; link without image &ndash;&gt;
                  <button v-if="field.type == 7 && !field.image_url" type="button"
                          class="btn w-100"
                          :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                    {{ field.holder }}
                  </button>
                  &lt;!&ndash; link with image &ndash;&gt;
                  <button v-else-if="field.type == 7 && field.image_url" type="button"
                          class="btn w-100 p-0" style="background: transparent;">
                    <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                  </button>

                  &lt;!&ndash; tel without image &ndash;&gt;
                  <button v-if="field.type == 8 && !field.image_url" type="button"
                          class="btn w-100"
                          :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                    {{ field.holder }}
                  </button>
                  &lt;!&ndash; tel with image &ndash;&gt;
                  <button v-else-if="field.type == 8 && field.image_url" type="button"
                          class="btn w-100 p-0" style="background: transparent;">
                    <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                  </button>

                  &lt;!&ndash; submit without image &ndash;&gt;
                  <button v-if="field.type == 9 && !field.image_url" type="button"
                          class="btn w-100"
                          :style="'background:'+field.back_color+';' + 'color:'+field.text_color+';'">
                    {{ field.holder }}
                  </button>
                  &lt;!&ndash; submit with image &ndash;&gt;
                  <button v-else-if="field.type == 9 && field.image_url" type="button"
                          class="btn w-100 p-0" style="background: transparent;">
                    <img :src="field.image_url" alt="button image" class="w-100 order_form_button_image">
                  </button>
                </div>
              </div>
            </div>
          </div>-->
        </div>


        <!-- Order layout for video -->
        <div v-if="content.type == 3">
          <div style="position: relative; width: 100%; max-width: 1000px; margin: auto;">
            <div style=" position: relative; padding-bottom: 56.25%; height:0;">
              <iframe v-if="content.video_type == 1"
                      style="width: 100%; height: 100%; top:0; left:0; position: absolute;" type="text/html"
                      :src="'https://www.youtube.com/embed/'
                                + content.video_data
                                + '?&playlist=Ra8s0IHng6A&autoplay=0&loop=1&showinfo=0&fs=1&disablekb=1&vq=auto&controls=0&rel=0&iv_load_policy=3&mute=0&playsinline=1&modestbranding=1'"
                      frameborder="0" volume="1" allowfullscreen webkitallowfullscreen
                      mozallowfullscreen></iframe>
              <iframe v-if="content.video_type == 2"
                      style="width: 100%; height: 100%; top:0; left:0; position: absolute;" type="text/html"
                      :src="'https://player.vimeo.com/video/' + content.video_data + '?&loop=1'" frameborder="0"
                      volume="1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <!---->
        <!---->
        <!---->
        <!---->
        <!---->
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Page",
    data: () => ({
      window_width: window.innerWidth,
      landing: {},
      order: [],
      scale: 1,
    }),
    methods: {
      change_scale() {
        // Scale = changed wrap / base width
        let base = 1000
        let top = 0
        //
        if (this.window_width > 1000) {
          this.scale = 1
          top = 0
        } else if (this.window_width < 1000 && this.window_width > 360) {
          this.scale = (this.window_width / base)
          top = -125
        } else if (this.window_width < 360) {
          this.scale = (360 / 1000)
          top = -160
        }
        //
        console.log('scale = ', this.scale)
        console.log('top = ', top)
      }
    },
    created() {
      this.$parent.$data.header_flag = 0
    },
    mounted() {
      this.$parent.$data.header_flag = 0
      // get id from url
      let main = '&main=' + this.$route.params.base
      let url_path = this.$route.path.substring(6)
      console.log('let main ', main)
      console.log('url overall ', url_path)

      // Window width calculator
      let that = this
      this.$nextTick(function () {
        window.addEventListener('resize', function (e) {
          that.window_width = window.innerWidth
          that.change_scale()
        })
      })
      let axios = this.$axios
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/' + '?auth=staff' + main)
        .then((response) => {
          if (response.data.length !== 0) {
            console.log(response.data[0].LandingInfo.landing.base_url)
            this.landing = response.data[0]
            this.order = this.landing.LandingInfo.order
          } else {
            console.log('i dont have any result')
            this.$router.push({
              name: 'A404'
            })
          }
        })
    },
    destroyed() {
      this.$parent.$data.header_flag = 1
    }
  }
</script>

<style lang="scss" scoped>
  .landing_overall {
    width: 100%;
    position: absolute;

    color: #eaeaea;
  }

  .landing_wrap {
    width: 100%;
    min-width: 360px;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;

  }

  .order_content {
    position: absolute;
    display: inline-block;
    box-sizing: border-box;

    border: 1px solid #c1c1c1;
  }
</style>
