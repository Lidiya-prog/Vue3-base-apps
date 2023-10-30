<template>
  <div :class="{ card: true, complete: task.comleted }">
    <input v-model="task.title" type="text" @input="$emit('onEdit')" />
    <div>
      <div class="check-circle" v-if="!task.completed">
        <check-circle-outline class="test" @click="$emit('onDone')" />
      </div>
      <div class="delete-circle" @click="$emit('onRemove')" v-else>
        <close-circle-outline />
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseCircleOutline from "vue-material-design-icons/CloseCircleOutline.vue";
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline.vue";

defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: "Create video",
      completed: false,
    }),
  },
});

defineEmits(["onDone", "onRemove", "onEdit"]);
</script>

<style scoped>
input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
}
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
