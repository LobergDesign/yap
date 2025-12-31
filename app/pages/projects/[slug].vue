<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <main>
    <h1>
      {{ route.params.slug }}
    </h1>
  </main>
</template>
