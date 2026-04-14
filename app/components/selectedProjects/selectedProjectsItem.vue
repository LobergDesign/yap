<script lang="ts" setup>
const { slug } = defineProps<{
  slug: string;
}>();

const { data, pending } = await useProject(slug);
</script>
<template>
  <div v-if="!pending && data" class="selected-projects-item">
    <NuxtLink
      v-if="data.project"
      :to="`/projects/${data.project.slug}`"
      class="grid-r"
    >
      <NuxtTime
        class="grid-c-1"
        :datetime="data.project.createdAt"
        year="numeric"
      />

      <p class="grid-c-2">
        {{ data.project.title }}
      </p>
      <p class="grid-c-2">
        {{ data.project.projectCaseType }}
      </p>
      <ul class="grid-c-2">
        <li v-for="value in data.project.executionArea" :key="value">
          {{ value }}
        </li>
      </ul>
      <!-- <pre>
        {{ data.project }}
      </pre> -->
    </NuxtLink>
  </div>
  <div v-else>loading...</div>
</template>

<style lang="scss" scoped>
.selected-projects-item {
  border-radius: $border-radius;
  position: relative;
  padding: clamp(8px, 2vw, 30px) clamp(12px, 2vw, 30px);
  // border
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: $border-radius;
    opacity: $border-opacity;
    border: 1px solid theme-color('secondary');
    transition:
      opacity $transition--fast,
      transform $transition--fast;
  }
}
</style>
