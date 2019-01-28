<template>
  <div class="main">
    <div>user detail</div>
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/users">유저 리스트</router-link>
      <span>></span>
      <router-link to="/users/detail/{{}}">유저 정보</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user_detail",
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    }
  }
</script>

<style scoped>

</style>
