<template>
  <div class="home-page">
    <h1>Profile</h1>
    <div>
      
    </div>
 </div>
</template>

<script>
import {USER_REQUEST} from '@/store/userModule/actions.js'

export default {
  created() {
    this.$store.dispatch(USER_REQUEST)
  }
}
</script>

<style scoped>

</style>
