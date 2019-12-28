<template>
  <q-page class="column">
    <h2 class="text-center">Todos</h2>
    <q-form @submit="onSubmit">
      <q-input type="text" v-model="todoName" filled label="Titre" />
      <q-btn label="Ajouter" class="full-width q-my-sm" type="submit"/>
    </q-form>
      <q-list id="todoList" bordered separator>
        <q-item v-for="todo in todos" :key="todo.id" v-bind:class="todo.finished && 'disabled'">
            <todo
              v-bind:todo="todo"
              v-bind:editMode="editMode"
              v-on:toggleEdit="toggleEdit"
              v-on:deleteOne="deleteOne"
            ></todo>
          </q-item>
      </q-list>
  </q-page>
</template>

<script>
import todo from '../components/Todo'
const DB = {
  url: 'https://fc49457c-280f-4807-bf98-346c2a60d022-bluemix.cloudantnosqldb.appdomain.cloud/',
  database: 'tododb'
}

export default {
  components: {
    todo
  },
  created: function () {
    this.fetchTodos()
  },
  data: function () {
    return {
      name: 'PageIndex',
      key: 0,
      todoName: '',
      todos: [],
      disabled: false,
      editMode: false
    }
  },
  methods: {
    fetchTodos () {
      this.$axios(
        {
          method: 'post',
          url: '/tododb/_find',
          baseURL: DB.url,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: {
            selector: {
              user: 'Nomena'
            },
            fields: ['_id', '_rev', 'name']
          },
          auth: {
            'password': '6243a2d127a35b31a780eb39aaceed40fa629108cd8c52bd31c76d20fdb9ec6d',
            'username': 'fc49457c-280f-4807-bf98-346c2a60d022-bluemix'
          }
        }
      ).then((response) => {
        this.todos = response.data.docs
      }).catch(function (error) {
        console.log(error.message)
      })
    },
    onSubmit: function () {
      if (this.todoName.trim() && this.todoName.length > 0) {
        this.todos.push({ id: this.key, name: this.todoName, finished: false })
        this.todoName = ''
        this.key = this.key + 1
      }
    },
    deleteOne: function (id) {
      this.todos = this.todos.filter((value) => {
        return value.id !== id
      })
    },
    updateTodo: function (todoName, newName) {
      /** */
    },
    toggleEdit: function () {
      this.editMode = !this.editMode
    }
  }
}
</script>

<style scoped>
  .full-width {
    width: 100%
  }
</style>
