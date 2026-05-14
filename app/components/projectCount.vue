<script lang="ts" setup>
const { data } = await useProjectCount();
</script>
<template>
  <ClientOnly>
    <span> ({{ data?.projects.length ?? 0 }}) </span>
    <template #fallback> <span>(0)</span> </template>
  </ClientOnly>
</template>
