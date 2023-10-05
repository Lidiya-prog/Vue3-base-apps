<template>
  <div class="todo-form">
    <input v-model="title" placeholder="Title" type="text" class="todo-input">
    <button @click="onAddTask" class="todo-button">Add task</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const title = ref('');

const onAddTask = () => {
  if (title.value === '') {
    alert('Fill some info please!');
    return;
  }
  emit('onAddTask', { title: title.value });
  title.value = '';
};

const { emit } = defineEmits(['onAddTask']);
</script>

<style scoped>
.task-input {
  margin: 10px 0;
}
</style>