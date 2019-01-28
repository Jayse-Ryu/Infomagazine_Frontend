<template>

</template>

<script>
  export default {
    name: "OrganizationDetail",
    update() {
      if (this.$store.state.jwt !== null) {
        this.$store.dispatch('getAuthUser')
      }
    }
  }
</script>

<style scoped>

</style>
