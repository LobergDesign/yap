<script setup lang="ts">
const route = useRoute(RouteName.PROJECT);
const { data, error } = await useProject(route.params.slug);
if (error.value) {
  throw createError({
    status: error.value.status,
    statusText: error.value.statusText,
    fatal: true,
  });
}
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
