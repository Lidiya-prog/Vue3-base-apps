<template>
  <div :class="{ card: true, complete: model.comleted }">
    <input v-model="model.title" type="text" @input="$emit('onEdit')" />
    <div>
      <div @click="emitOnDone" v-if="!model.completed">
        <unicon name="check-circle"></unicon>
      </div>
      <div @click="emitOnRemove" v-else>
        <unicon name="times-circle"></unicon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['onDone', 'onRemove'],
  props: {
    model: {
      required: true,
      default: {
        id: 0,
        title: 'Create video',
        completed: false
      }
    }
  },

  setup(props, { emit }) {
    const emitOnDone = () => {
      emit('onDone')
    }

    const emitOnRemove = () => {
      emit('onRemove')
    }

    return {
      emitOnDone,
      emitOnRemove
    }
  }
}
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