<template>
  <main class="todo-app">
    <TaskInput @onAddTask="addTask"></TaskInput>
    <span class="loader" v-if="isLoading"></span>
    <ul class="task-list my-list">
      <li v-for="item in taskList" :key="item.id">
        <TaskCard
          @onRemove="removeTask(item.id)"
          @onDone="setDoneTask(item.id)"
          :model="item"
        />
      </li>
    </ul>
  </main>
</template>

<script>
import TaskInput from "./components/TaskInput.vue";
import TaskCard from "./components/TaskCard.vue";
import {onMounted, ref} from 'vue'

export default {
  name: 'App',
  components: {
    TaskCard,
    TaskInput
  },
  setup() {
    const taskList = ref([])

    const isLoading = ref(false)

    const addTask = ({title}) => {
      taskList.value = [...taskList.value, {id: taskList.value[taskList.value.length - 1].id + 1, title, completed: false}]
    }

    const setDoneTask = (id) => {
      taskList.value = taskList.value.map(item => {
        if(item.id === id)
          item.completed = true
        return item
      })
    }

    const removeTask = (id) => {
      taskList.value = taskList.value.filter(item => item.id !== id)
    }

    const fetchTasks = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const test = await response.json()
      return test.map(item => ({
        id: item.id,
        completed: item.completed,
        title: item.title,
      }))
    }

    onMounted(async () => {
      isLoading.value = true
      taskList.value = await fetchTasks()
      isLoading.value = false
    })

    return {
      isLoading,
      taskList,
      addTask,
      removeTask,
      setDoneTask,
      fetchTasks
    }
  }
}
</script>

<style scoped>
  .task-list {
    list-style: none;
  }
</style>