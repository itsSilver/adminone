<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'default',
  middleware: 'auth',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'scale-balance',
            label: 'Balances',
          },
          {
            to: '/deposits',
            icon: 'cash-multiple',
            label: 'Deposits',
          },
          {
            to: '/users',
            icon: 'account-group',
            label: 'Users',
          },
        ],
      ]
    },
  },
  created() {
    this.$store.commit('user', {
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    })
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
  beforeDestroy() {
    document.documentElement.classList.remove('has-aside-left')
    document.documentElement.classList.remove('has-aside-mobile-transition')
    document.documentElement.classList.remove('has-navbar-fixed-top')
    document.documentElement.classList.remove('has-aside-expanded')
  },
}
</script>
