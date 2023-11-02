<template>
  <main class="todo-app">
    <TaskInput v-model:title="title" @onAddTask="addTask" />
    <span class="loader" v-if="isLoading" />
    <ul class="task-list my-list">
      <li
        v-for="item in taskList"
        :key="item.id"
        :class="item.comleted ? 'todo-row complete' : 'todo-row'"
      >
        <TaskCard
          @onRemove="removeTask(item.id)"
          @onDone="setDoneTask(item.id)"
          @onEdit="editTask(item.id)"
          :task="item"
        />
      </li>
    </ul>
  </main>
</template>

<script setup>
import TaskInput from "./components/TaskInput.vue";
import TaskCard from "./components/TaskCard.vue";
import { onMounted, ref } from "vue";

const taskList = ref(null);
const title = ref("");
const isLoading = ref(false);

const addTask = () => {
  if (title.value === "") {
    alert("Fill some info please!");
    return;
  }
  const nextId = taskList.value[taskList.value.length - 1].id + 1;

  taskList.value = [
    ...taskList.value,
    { id: nextId, title: title.value, completed: false },
  ];
  title.value = "";
};

const setDoneTask = (id) => {
  taskList.value = taskList.value.map((item) => {
    if (item.id === id) item.completed = true;
    return item;
  });
};

const removeTask = (id) => {
  taskList.value = taskList.value.filter((item) => item.id !== id);
};

const fetchTasks = async () => {
  const tasks = await fetch("https://jsonplaceholder.typicode.com/todos").then(
    (res) => res.json()
  );
  taskList.value = tasks.map((task) => ({
    id: task.id,
    completed: false,
    title: task.title,
  }));

  return taskList.value;
};

const editTask = (id) => {
  const currentIndex = taskList.value.findIndex((task) => task.id === id);

  const newTask = {
    completed: false,
    id,
    title: "new text",
  };
  taskList.value[currentIndex] = newTask;
};

onMounted(async () => {
  isLoading.value = true;
  await fetchTasks();
  isLoading.value = false;
});
</script>

<style scoped>
.task-list {
  list-style: none;
}
</style>
