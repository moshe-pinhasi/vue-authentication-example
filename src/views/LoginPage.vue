<template>
  <div class="login-page">
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
import {AUTH_REQUEST} from '@/store/authModule/actions'

export default {
  data () {
    return {
      username: 'moshe',
      password: '12345'
    }
  },
  methods: {
    login() {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push('/user')
      })
    }
  }
}
</script>

<style scoped>

</style>
