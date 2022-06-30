
<script>

export default {
  name: 'Logout',
  async mounted() {
    await this.$auth.logout()
  },
  head() {
    return {
      title: 'Logout — Admin One',
    }
  },
}
</script>
