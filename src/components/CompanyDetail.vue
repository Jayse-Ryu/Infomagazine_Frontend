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
    data: () => ({
      page_id: 0
    }),
    mounted() {
      // get id from url
      this.page_id = this.$route.params.landing_id * 1

      // if page int is default, push to list page
      if (this.page_id === 0) {
        this.$router.push({
          name: 'company_list'
        })
      }
    },
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    }
  }
</script>

<style scoped>

</style>
