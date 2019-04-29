<template>
  <div class="landing_overall">

    <div style="position: absolute;">{{ window_width }}</div>

    <div class="landing_wrap">

      <!--<div>{{ $route.params.base }}</div>-->
      <!--<div>{{ $route.path }}</div>-->

      <!-- x y z / w h -->
      <!--<div v-for="order in landing.LandingInfo.order">-->
      <div v-for="content in order" class="order_content"
           :style="{
              'width': content.position.w + 'px',
              'height': content.position.h + 'px',
              'left': content.position.x + 'px',
              'top': content.position.y + 'px',
              'z-index': content.position.z
           }">
        {{ content }}
        <!-- image or form group or video -->
      </div>
      <!--</div>-->

    </div>
  </div>
</template>

<script>
  export default {
    name: "Page",
    data: () => ({
      window_width: window.innerWidth,
      landing: {},
      order: []
    }),
    created() {
      this.$parent.$data.header_flag = 0
    },
    mounted() {
      this.$parent.$data.header_flag = 0
      // get id from url
      let main = '&main=' + this.$route.params.base
      let url_path = this.$route.path.substring(6)
      //
      console.log('let main ', main)
      console.log('url overall ', url_path)
      //

      // Window width calculator
      let that = this
      this.$nextTick(function () {
        window.addEventListener('resize', function (e) {
          that.window_width = window.innerWidth
          if (window.innerWidth < 1000) {
            console.log('less than 1000!')
          }
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

    background-color: #fefefe;
    border: 1px solid #c1c1c1;
  }
</style>
