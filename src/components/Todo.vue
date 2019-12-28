<template>
    <q-item-section>
      <div v-if="editMode" class="row justify-around flex-center">
        <q-input type="text" outlined v-model="todo.name"/>
        <div class="flex justify-between">
          <q-btn icon="done" round color="secondary"
            @click="$emit('updateTodo', todo)" />
          <q-btn icon="cancel" round color="warning" @click="toggleEdit" />
        </div>
      </div>
      <div v-else class="flex justify-between">
        <q-checkbox :label="todo.name" v-model="todo.finished" :value="todo.name" />
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
      editMode: false,
      name: '',
      finished: false
    }
  },
  methods: {
    toggleEdit () {
      this.editMode = !this.editMode
    }
  }
}
</script>
