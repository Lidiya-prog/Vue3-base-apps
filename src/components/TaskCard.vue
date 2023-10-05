<template>
  <div :class="{ card: true, complete: model.comleted }">
    <div>
      <h4>{{ model.title }}</h4>
    </div>
    <div>
      <div class="check-circle" v-if="!model.completed">
        <check-circle-outline @click="emitOnDone"></check-circle-outline>
      </div>
      <div @click="emitOnRemove" v-else>
        <close-circle-outline></close-circle-outline>
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue';
import CheckCircleOutline from 'vue-material-design-icons/CheckCircleOutline.vue';

const props = defineProps({
  model: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: 'Create video',
      completed: false
    })
  }
});

const { model } = props;

const emits = defineEmits(['onDone', 'onRemove']);

const emitOnDone = () => {
  emits('onDone', model.id);
};

const emitOnRemove = () => {
  emits('onRemove');
};
</script>

<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>