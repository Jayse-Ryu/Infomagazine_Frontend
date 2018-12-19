<template>
  <div class="main">
    <div class="text_navigation">
      <router-link to="/">로그인</router-link>
      <span>></span>
      <router-link to="/db">DB 리스트</router-link>
      <span>></span>
      <router-link to="/db/detail">DB 정보</router-link>
    </div>

    <div class="container">
      <div class="row col-12 m-0 p-0 justify-content-center">
        <div class="col-sm-3" style="background-color: aqua">3</div>
        <div class="col-sm-5" style="background-color: bisque">5</div>
        <div class="col-sm-7" style="background-color: saddlebrown">7</div>
      </div>
      <div class="row col-12 m-0 p-0 justify-content-end">
        <div class="col-12"></div>
        <div class="col-sm-3" style="background-color: rebeccapurple"><img src="../assets/logo1.png" width="100%" height="100%"></div>
      </div>
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
