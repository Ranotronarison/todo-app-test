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
export default {
  components: {
    todo
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
