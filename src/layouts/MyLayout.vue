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

    <q-footer class="flex justify-around">
      <div>{{ todos.length || 0 }} todos</div>
      <div>{{ todos.filter(todo => todo.finished).length || 0 }} terminé</div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  mounted () {
    this.$db
      .find({ selector: { user: 'Nomena' } })
      .then((result) => {
        this.todos = result.docs
      })
      .catch(function (err) {
        console.log(err)
      })
    this.$db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      const unChanged = this.todos.filter(todo => todo._id !== change.doc._id)
      this.todos = [...unChanged, change.doc._id]
      console.log(this.todos)
    })
  },
  data () {
    return {
      todos: []
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
