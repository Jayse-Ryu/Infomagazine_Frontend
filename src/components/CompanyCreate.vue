<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/company">업체 리스트</router-link>
      <span>></span>
      <router-link to="/company/create">업체 생성</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company_create",
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    }
  }
</script>

<style scoped>

</style>
