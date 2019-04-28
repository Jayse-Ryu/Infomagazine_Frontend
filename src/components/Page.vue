<template>
  <div class="landing_overall">
    <div class="landing_wrap">

      <div>{{ $route.params.base }}</div>
      <div>{{ $route.path }}</div>

      <div>PAGE LANDING</div>

      <div v-for="order in landing.LandingInfo.order">
        {{ order }}
        {{ order.position }}
        <!-- x y z / w h -->
        <div :style="{'width': order.position.w + 'px', 'height': order.position.h + 'px' }">aooo</div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Page",
    data: () => ({
      landing: {}
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
      let axios = this.$axios
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/' + '?auth=staff' + main)
        .then((response) => {
          if (response.data.length !== 0) {
            console.log(response.data[0].LandingInfo.landing.base_url)
            this.landing = response.data[0]
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
  }

  .landing_wrap{
    width: 100%;
    min-width: 360px;
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
