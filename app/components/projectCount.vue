<script lang="ts" setup>
const { data } = useLazyFetch('/api/project-count');
</script>
<template>
  <ClientOnly>
    <span> ({{ data?.projects.length ?? 0 }}) </span>
    <template #fallback> <span>(0)</span> </template>
  </ClientOnly>
</template>
