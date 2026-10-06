<script setup lang="ts">
const route = useRoute();

const { data } = await useProject(route.params.slug as string);
</script>

<template>
  <main>
    <h1>
      {{ route.params.slug }}
    </h1>
    <pre>
      {{ data }}
    </pre>
  </main>
</template>
