<template>
  <div class="todo-form">
    <input
      class="todo-input"
      placeholder="Title"
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
    />
    <button @click="$emit('onAddTask')" class="todo-button">Add task</button>
  </div>
</template>

<script setup>
defineProps(["title"]);
defineEmits(["onAddTask", "update:title"]);
</script>

<style scoped>
.task-input {
  margin: 10px 0;
}
</style>
