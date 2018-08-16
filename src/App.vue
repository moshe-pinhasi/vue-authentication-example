<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
import AuthService from './services/authService.js'
import {AUTH_LOGOUT} from './store/authModule/actions.js'
import {USER_REQUEST} from './store/userModule/actions.js'

export default {
  name: 'App',
  components: {
    Header
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST)
    }
  },
}
</script>

<style>

</style>
