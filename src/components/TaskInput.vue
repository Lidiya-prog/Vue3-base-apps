<template>
  <div class="todo-form">
    <input v-model="title" placeholder="Title" type="text" class="todo-input">
    <button @click="onAddTask" class="todo-button">Add task</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: {
    onAddTask({ title }) {
      if(title === '') {
        alert('Fill some info please!')
        return false
      }
      return true
    }
  },
  setup(props, { emit }) {
    const title = ref('')

    const onAddTask = () => {
      emit('onAddTask', { title: title.value })
      title.value = ''
    }

    return {
      title,
      onAddTask
    }
  }
}
</script>

<style scoped>
.task-input {
  margin: 10px 0;
}
</style>