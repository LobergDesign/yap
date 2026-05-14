<script lang="ts" setup>
defineProps<{
  tag: string;
}>();
</script>
<template>
  <div class="tag">
    {{ tag }}
  </div>
</template>

<style lang="scss" scoped>
.tag {
  color: theme-color('secondary');
  font-size: 10px;
  font-variation-settings: 'wght' 400;
  position: relative;
  // border
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: $border-radius;
    opacity: $border-opacity;
    border: 1px solid theme-color('secondary');
    transition:
      opacity $transition--fast,
      transform $transition--fast;
  }
}
</style>
