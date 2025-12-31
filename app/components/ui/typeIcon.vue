<script lang="ts" setup>
type projectType = 'npm' | 'codepen' | 'website';
const { type } = defineProps<{
  type: projectType;
}>();
</script>

<template>
  <div class="type-icon">
    <nuxt-icon :name="type" filled />
  </div>
</template>

<style lang="scss" scoped>
.type-icon::v-deep(.nuxt-icon svg) {
  fill: theme-color('secondary');
}
</style>
