<template>
  <ul :class="{ 'menu-list': !isSubmenuList }">
    <!-- <aside-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      @menu-click="menuClick"
    /> -->
    <nuxt-link to="/" tag="a">
      <span class="icon"><i class="mdi mdi-scale-balance default"></i></span>
      <span class="menu-item-label">Balances</span>
    </nuxt-link>
    <nuxt-link
      to="/deposits"
      tag="a"
      v-if="$store.state.auth.user.role.name === 'superadmin'"
    >
      <span class="icon"><i class="mdi mdi-cash-multiple default"></i></span>
      <span class="menu-item-label">Deposits</span>
    </nuxt-link>
    <nuxt-link
      to="/users"
      tag="a"
      v-if="$store.state.auth.user.role.name === 'superadmin'"
    >
      <span class="icon"><i class="mdi mdi-account-group default"></i></span>
      <span class="menu-item-label">Users</span>
    </nuxt-link>
  </ul>
</template>

<script>
import AsideMenuItem from '@/components/AsideMenuItem'

export default {
  name: 'AsideMenuList',
  components: {
    AsideMenuItem,
  },
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false,
    },
    menu: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    menuClick(item) {
      this.$emit('menu-click', item)
    },
  },
}
</script>
<style scoped>
.nuxt-link-exact-active.nuxt-link-active {
  color: #fff;
  background: #1d1d1e;
}
</style>
