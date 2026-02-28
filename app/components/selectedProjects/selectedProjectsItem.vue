<script lang="ts" setup>
const { slug } = defineProps<{
  slug: string;
}>();

const { data, pending } = await useProject(slug);
</script>
<template>
  <div class="selected-projects-item">
    <pre>
    {{ data }}
   </pre
    >
  </div>
</template>

<style lang="scss" scoped>
.selected-projects-item {
}
</style>
