<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/users">유저 리스트</router-link>
    </div>
  </div>

</template>

<script>
    export default {
        name: "user_list"
    }
</script>

<style scoped>

</style>
