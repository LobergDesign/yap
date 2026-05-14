<script lang="ts" setup>
import type { GetProjectsQuery } from '~/types/generated/graphql';
type Project = NonNullable<GetProjectsQuery['projects'][number]>;
defineProps<{
  project: Project;
}>();

const appConfig = useAppConfig();
</script>
<template>
  <NuxtLink
    v-if="project"
    :to="`${appConfig.slugProjects}/${project.slug}`"
    class="grid-r selected-projects-item"
  >
    <ContentHover :title="project.title" large>
      <div class="grid-r selected-projects-item__r">
        <NuxtTime
          class="grid-c-1"
          :datetime="project.createdAt"
          year="numeric"
        />
        <h4 class="grid-c-2">
          {{ project.title }}
        </h4>
        <p class="grid-c-2">
          {{ project.projectCaseType }}
        </p>
        <ul class="grid-c-2">
          <ui-tag
            v-for="value in project.executionArea"
            :key="value"
            :tag="enumConverter(value)"
          />
        </ul>
        <div class="grid-c-1 selected-projects-item__icon justify-end">
          <nuxt-icon name="arrow" />
        </div>
      </div>
    </ContentHover>
  </NuxtLink>
</template>

<style lang="scss" scoped>
$svg-size: clamp(15px, 2vw, 18px);
.selected-projects-item {
  margin-bottom: clamp(5px, 1vw, 10px);
  font-size: 12px;
  &__icon ::v-deep(.nuxt-icon svg) {
    width: $svg-size;
    height: $svg-size;
    transform: rotate(-90deg);
  }
  &__r {
    align-items: center;
  }
}
</style>
