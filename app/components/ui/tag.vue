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
  display: inline-block;
  color: theme-color('secondary');
  font-size: 10px;
  font-variation-settings: 'wght' 400;
  position: relative;
  padding: 5px 12px;
  margin-right: clamp(3px, 0.4vw, 5px);
  margin-bottom: clamp(2px, 0.3vw, 4px);
  &::after {
    @include border;
  }
}
</style>
