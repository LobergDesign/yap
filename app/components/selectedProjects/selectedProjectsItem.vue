<script lang="ts" setup>
const { slug } = defineProps<{
  slug: string;
}>();

const { data, pending } = await useProject(slug);
</script>
<template>
  <div v-if="!pending && data" class="selected-projects-item">
    <NuxtLink v-if="data.project" :to="data.project?.slug">
      <p>
        {{ data.project.createdAt }}
      </p>
      <p>
        {{ data.project.title }}
      </p>
      <p>
        {{ data.project.projectCaseType }}
      </p>
      <ul>
        <li v-for="value in data.project.executionArea" :key="value">
          {{ value }}
        </li>
      </ul>
      <pre>
        {{ data.project }}
      </pre>
    </NuxtLink>
  </div>
  <div v-else>loading...</div>
</template>

<style lang="scss" scoped>
.selected-projects-item {
}
</style>
