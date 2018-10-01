<template>
  <div class="home-page">
    <h1>Profile</h1>
    <div>
      Hello {{userName}}
    </div>
 </div>
</template>

<script>
import {USER_REQUEST} from '@/store/userModule/actions.js'

export default {
  created() {
    this.$store.dispatch(USER_REQUEST)
  },
  computed: {
    userName() {
      return this.$store.getters.user.name
    }
  }
}
</script>

<style scoped>

</style>
