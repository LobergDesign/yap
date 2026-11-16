<script lang="ts" setup>
const { data, error } = await useProjects();
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
    <h1>Projects</h1>
    <ul>
      <li v-for="value in data?.projects" :key="value.slug">
        <NuxtLink
          :to="{ name: RouteName.PROJECT, params: { slug: value.slug } }"
        >
          {{ value }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
li {
  margin-bottom: 5rem;
}
</style>
