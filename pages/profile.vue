<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Profile
      <nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <password-update-form />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Profile',
  components: {
    UserAvatar,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent,
  },
  computed: {
    titleStack() {
      return ['Admin', 'Profile']
    },
    ...mapState(['userName', 'userEmail']),
  },
  head() {
    return {
      title: 'Profile — Admin One',
    }
  },
}
</script>
