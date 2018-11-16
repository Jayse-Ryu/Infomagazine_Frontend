<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/db">DB 리스트</router-link>
      <span>></span>
      <router-link to="/db/detail">DB 정보</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "d-b-detail"
    }
</script>

<style scoped>

</style>
