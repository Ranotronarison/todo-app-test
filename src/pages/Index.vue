<template>
  <q-page class="column">
    <h2 class="text-center">Todos</h2>
    <q-form @submit="onSubmit">
      <q-input type="text" v-model="todoName" filled label="Titre" />
      <q-btn label="Ajouter" class="full-width q-my-sm" type="submit"/>
    </q-form>
      <q-list id="todoList" bordered separator :key="componentKey">
        <q-item v-for="todo in todos" :key="todo._id" v-bind:class="todo.finished && 'disabled'">
            <todo
              v-bind:todo="todo"
              v-on:toggleEdit="toggleEdit"
              v-on:deleteOne="deleteOne"
              v-on:updateTodo="updateTodo"
              ref="todoItem"
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
const credentials = {
  password: '6243a2d127a35b31a780eb39aaceed40fa629108cd8c52bd31c76d20fdb9ec6d',
  username: 'fc49457c-280f-4807-bf98-346c2a60d022-bluemix'
}
const connectedUser = 'Nomena'

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
      componentKey: 0,
      todoName: '',
      todos: []
    }
  },
  methods: {
    fetchTodos () {
      this.$db
          .find({ selector: { user: connectedUser } })
          .then((result) => {
            this.todos = result.docs
          })
          .catch(function (err) {
            console.log(err)
          })
    },
    createTodo ({ name, user }) {
      const todo = {
              name,
              createdAt: new Date(),
              user,
              finished: false
      }
      this.$db.post(todo)
      .then(function (response) {
          if(response.ok) {
            /** */
          }else {
            /** */
          }
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    onSubmit: function () {
      if (this.todoName.trim() && this.todoName.length > 0) {
        this.createTodo({ name: this.todoName.trim(), user: connectedUser })
        this.todoName = ''
      }
    },
    deleteOne: function ({ _id, _rev }) {
      this.$db.remove(_id, _rev)
        .then(function(response) {
          /**  */
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    updateTodo: function (updatedTodo) {
      const itemIndex = this.$refs.todoItem.findIndex(item => {
            return item.todo._id === updatedTodo._id
          })
      this.$db.put({ ...updatedTodo, updatedAt: new Date() })
       .then(function(response) {
          /** */
          this.$refs.todoItem[itemIndex].closeEdit()
       })
       .catch(function(err) {
          /** */
          this.$refs.todoItem[itemIndex].closeEdit()
       })
    }
  }
}
</script>

<style scoped>
  .full-width {
    width: 100%
  }
</style>
