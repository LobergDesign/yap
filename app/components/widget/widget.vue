<script lang="ts" setup>
const { pending, title } = defineProps<{
  pending: boolean;
  title: string;
}>();
</script>

<template>
  <div class="widget">
    <div v-if="pending">loading...</div>
    <template v-else>
      <div class="widget__header justify-between">
        <h4 v-if="title">{{ title }}</h4>
        <button @click="handleClose">
          <nuxt-icon name="close" />
        </button>
      </div>
      <div class="widget__body">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.widget {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  overflow: hidden;
  padding: 6px 12px;
  width: 160px;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  will-change: transform, opacity;
  &__header button {
    position: absolute;
    top: 2px;
    right: 2px;
    padding: 0.5rem;
  }
  &__body {
    p {
      font-size: 10px;
      opacity: 0.5;
      margin-bottom: 5px;
    }
  }
}
[data-mode='dark'] .widget {
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
}
</style>
