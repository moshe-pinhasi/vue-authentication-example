import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
import UserPage from '@/views/UserPage'
import store from '@/store/store'

Vue.use(Router)

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage,
      
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage,
      // beforeEnter: ifNotAuthenticated, // when you need a specific check
      
      // instead you can add meta and check as below
      // meta: { 
      //     requiresAuth: true,
      //     is_admin : true
      // }
    },
    {
      path: '/user',
      name: 'userPage',
      component: UserPage,
      // beforeEnter: ifAuthenticated, // when you need a specific check
    },
  ]
})

// one auth check point
// https://router.vuejs.org/guide/advanced/meta.html

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!store.getters.isAuthenticated) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })

