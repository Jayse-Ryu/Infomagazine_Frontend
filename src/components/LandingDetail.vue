<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/landing">랜딩 리스트</router-link>
      <span>></span>
      <router-link to="/landing/detail/{{}}">랜딩페이지 정보</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "landing_detail"
    }
</script>

<style scoped>

</style>
