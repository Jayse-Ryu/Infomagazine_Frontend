<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">Page</router-link>
    </div>

    <div>{{ $route.params.base }}</div>
    <div>{{ $route.params.url }}</div>

  </div>
</template>

<script>
  export default {
    name: "Page",
    created() {
      this.$parent.$data.header_flag = 0
    },
    mounted() {
      this.$parent.$data.header_flag = 0
      // get id from url
      console.log(this.$route.params.base)
      console.log(this.$route.path)
    },
    destroyed() {
      this.$parent.$data.header_flag = 1
    }
  }
</script>

<style scoped>

</style>
