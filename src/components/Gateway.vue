<template>
  <div class="main">
    <input type="text" v-model="access_obj.access">
    <div v-if=""></div>
  </div>
</template>

<script>
  export default {
    name: "Gateway",
    data: () => ({
      user_obj: [],
    }),
    methods: {
      temp: () => {
        console.log('temp')
      }
    },
    mounted() {
      let temp = this.$store.state.userAccess
      console.log('temp', temp)
    },
    computed: {
      access_obj() {
        let access = this.$store.state.userAccess
        return access
      }
    }
  }
</script>

<style scoped>

</style>
