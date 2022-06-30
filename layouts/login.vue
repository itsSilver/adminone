<template>
  <div id="app" class="login-layout">
    <nuxt />
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  auth: 'guest'
}
</script>

<style scoped>
.login-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b4d16;
}
</style>