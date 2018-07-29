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
    AuthService.handleUnauthorized(this.redirectToHomepage)
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST)
    }
  },
  methods: {
    redirectToHomepage() {
      // if you ever get an unauthorized, logout the user
      this.$store.dispatch(AUTH_LOGOUT)
      
      // redirect to homepage
      this.$route.push('/')
    }
  }
}
</script>

<style>

</style>
