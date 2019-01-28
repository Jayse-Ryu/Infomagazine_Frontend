<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/db">DB 리스트</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "db_list",
    data: () => ({
      index_max: 0,
      index_top: 0,
      index_bottom: 0
    })
  }
</script>

<style lang="scss">
  /* Search bar */
</style>
