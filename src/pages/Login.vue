<template>
  <q-page>
    <h2 class="text-center">Login</h2>
    <q-form class="q-gutter-y-md q-mx-md" @submit.prevent="login(username, password)">
      <q-input type="text" v-model="username" outlined label="Nom d'utilisateur" class />
      <q-input type="password" v-model="password" outlined label="Mot de passe" />
      <div class="flex justify-center">
        <q-btn type="submit" label="Se connecter" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import authHelper from '../helpers/auth'
export default {
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function (username, password) {
      if (username && password) {
        const userInfo = authHelper.signIn({ username, password }, this.$store.state.auth.users)
        if (userInfo.exists) {
          this.$store.dispatch('auth/updateUserInfo',
            { isConnected: true, username: userInfo.username })
          this.$router.push('/home')
        }
      }
    }
  }
}
</script>
