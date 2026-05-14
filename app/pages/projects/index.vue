<script lang="ts" setup>
const { data } = await useProjects();
</script>
<template>
  <main>
    <h1>Projects</h1>
    <ul>
      <li v-for="value in data?.projects" :key="value.slug">
        <NuxtLink :to="`projects/${value.slug}`">
          {{ value }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
