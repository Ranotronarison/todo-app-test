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
              user: connectedUser
            },
            // fields: ['_id', '_rev', 'name', 'user', 'finished', 'createdAt'],
            sort: [
              {
                createdAt: 'asc'
              }
            ]
          },
          auth: credentials
        }
      ).then((response) => {
        this.todos = response.data.docs
      }).catch(function (error) {
        console.log(error.message)
      })
    },
    async createTodo ({ name, user }) {
      try {
        const response = await this.$axios(
          {
            method: 'post',
            url: '/tododb/',
            baseURL: DB.url,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: {
              name,
              createdAt: new Date(),
              user,
              finished: false
            },
            auth: credentials
          }
        )
        if (response.data.ok) {
          this.fetchTodos()
        }
      } catch (error) {
        console.log(error)
      }
    },
    onSubmit: function () {
      if (this.todoName.trim() && this.todoName.length > 0) {
        this.createTodo({ name: this.todoName.trim(), user: connectedUser })
        this.todoName = ''
      }
    },
    deleteOne: async function ({ _id, _rev }) {
      try {
        const response = await this.$axios(
          {
            method: 'delete',
            url: `/tododb/${_id}?rev=${_rev}`,
            baseURL: DB.url,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },
            auth: credentials
          }
        )
        if (response.data.ok) {
          this.fetchTodos()
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateTodo: async function (updatedTodo) {
      try {
        const response = await this.$axios(
          {
            method: 'POST',
            url: '/tododb',
            baseURL: DB.url,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: { ...updatedTodo, updatedAt: new Date() },
            auth: credentials
          }
        )
        if (response.data.ok) {
          this.fetchTodos()
          const itemIndex = this.$refs.todoItem.findIndex(item => {
            return item.todo._id === updatedTodo._id
          })
          this.$refs.todoItem[itemIndex].closeEdit()
        }
      } catch (error) {
        console.log(error)
      }
    },
    refreshView: function () {
      this.componentKey += 1
    }
  }
}
</script>

<style scoped>
  .full-width {
    width: 100%
  }
</style>
