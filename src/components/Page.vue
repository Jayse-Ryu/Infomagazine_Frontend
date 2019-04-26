<template>
  <div class="landing_overall">
    <div class="landing_wrap">

      <div>{{ $route.params.base }}</div>
      <div>{{ $route.path }}</div>

      <div>PAGE LANDING</div>

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
      let split = this.$route.path.split('/')
      let last = split[split.length-1]
      //
      console.log('let main ', main)
      console.log('let last ', last)
      //
      let axios = this.$axios
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/' + '?auth=staff' + main)
        .then((response) => {
          console.log(response)
          for(let i = 0; i < response.data.length; i ++) {
            console.log(response.data[i].LandingInfo.landing.base_url)
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
