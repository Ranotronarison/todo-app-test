<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Todo App
        </q-toolbar-title>

        <b class="q-mr-sm">{{ auth.user.username }}</b>

        <div>
          <q-btn @click="logout" color="secondary" label="Sortir" icon-right="logout"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer>
      <label>1 todo restant</label>
    </q-footer> -->
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('auth/updateUserInfo', { isConnected: false })
      this.$router.push('/')
    }
  },
  computed: {
    auth: {
      get () {
        return this.$store.state.auth
      }
    }
  }
}
</script>
