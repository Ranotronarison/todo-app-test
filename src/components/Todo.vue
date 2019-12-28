<template>
    <q-item-section>
      <div v-if="editMode" class="row justify-around flex-center">
        <q-input type="text" outlined v-model="initialName"/>
        <div class="flex justify-between">
          <q-btn icon="done" round color="secondary"
            @click="$emit('updateTodo', {...todo, name: initialName})" />
          <q-btn icon="cancel" round color="warning" @click="cancelEdit" />
        </div>
      </div>
      <div v-else class="flex justify-between">
        <q-checkbox :label="todo.name" v-model="todo.finished" :value="todo.finished"
          />
        <div>
          <q-btn flat color="primary" icon="edit" size="md" @click="toggleEdit" />
          <q-btn flat color="negative" icon="delete" size="md"
            @click="$emit('deleteOne',{_id: todo._id, _rev: todo._rev})" />
        </div>
      </div>
    </q-item-section>
</template>

<script>
export default {
  name: 'Todo',
  props: ['todo'],
  data: function () {
    return {
      initialName: this.todo.name,
      editMode: false,
      finished: false
    }
  },
  methods: {
    toggleEdit () {
      this.editMode = !this.editMode
    },
    cancelEdit () {
      this.editMode = false
      this.initialName = this.todo.name
    }
  }
}
</script>
