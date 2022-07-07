<template>
  <div class="logn-page">
    <div class="login-form">
      <form @submit.prevent="sendLogin" class="form-login">
        <b-field label="Email">
          <b-input v-model="form.identifier" required />
        </b-field>
        <b-field label="Password">
          <b-input v-model="form.password" type="password" password-reveal required />
        </b-field>
        <b-button type="is-success" native-type="submit">Login</b-button>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'login',
  components: {
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    sendLogin() {
      this.$auth.loginWith('local', { data: this.form }).then((res) => {
        this.$buefy.snackbar.open({
          message: `Welcome back ${this.$auth.user.username}`,
          queue: false,
        })
      })
    }
  },
  head() {
    return {
      title: 'Login — Bank Reports',
    }
  },
}
</script>

<style scoped>
.form-login {
  background-color: #fff;
  padding: 24px;
  border-radius: 5px;
}
</style>