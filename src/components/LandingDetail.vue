<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/landing">랜딩 리스트</router-link>
      <span>></span>
      <router-link to="/landing/detail/{{}}">랜딩페이지 정보</router-link>
    </div>

    <div>랜딩 페이지 정보</div>

    <div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "landing_detail",
      data: () => ({
        page_id: 0,
      }),
      mounted() {
        this.page_id = 1
        if (this.page_id === 0) {
          this.$router.push({
            name: 'landing_list'
          })
        }
        let axios = this.$axios
        let this_url = 'landing/'

        axios.get(this.$store.state.endpoints.baseUrl + this_url)
          .then((response) => {
            console.log(response.data)
          })
      }
    }
</script>

<style scoped>

</style>
