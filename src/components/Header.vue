<template>
  <div class="header">
    <div v-if="isAuthenticated" >
      <span >Hello {{user.name}}</span>
      <button @click="logout">logout</button>
    </div>
    <button v-else @click="login">login</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {AUTH_LOGOUT} from '../store/authModule/actions.js'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => this.$router.push('/'))
    }
  },
}
</script>

<style scoped>

</style>
