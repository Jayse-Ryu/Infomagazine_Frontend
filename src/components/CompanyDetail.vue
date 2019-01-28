<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/company">업체 리스트</router-link>
      <span>></span>
      <router-link to="/company/detail/{{}}">업체 정보</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company_detail",
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    }
  }
</script>

<style scoped>

</style>
