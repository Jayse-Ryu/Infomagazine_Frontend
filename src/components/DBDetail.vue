<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">홈</router-link>
      <span>></span>
      <router-link to="/landing">랜딩 리스트</router-link>
      <span>></span>
      <router-link to="/db/detail">DB 정보</router-link>
    </div>

    <div class="container">
      <div class="row col-12 m-0 p-0 justify-content-center">

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "db_detail",
    data: () => ({
      landing_id: 0
    }),
    method: {
    },
    mounted() {
      let axios = this.$axios
      this.landing_id = this.$route.params.landing_id
      axios.get(this.$store.state.endpoints.baseUrl + 'landing/api/' + this.landing_id)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style scoped>

</style>
