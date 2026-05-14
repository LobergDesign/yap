<script lang="ts" setup>
import type { GetFrontpageQuery } from '~/types/generated/graphql';

type Frontpage = NonNullable<GetFrontpageQuery['frontpage']>;

const { slugList } = defineProps<{
  title: Frontpage['selectedProjectsTitle'];
  slugList: Frontpage['projects'];
}>();
const appConfig = useAppConfig();
const { data, pending } = await useProjects();

const selectedProjects = computed(() => {
  if (!data?.value?.projects) return [];
  return data.value.projects.filter((project) =>
    slugList?.some((slug) => slug.slug === project.slug),
  );
});
</script>
<template>
  <div class="selected-projects">
    <div class="grid-r">
      <div class="grid-c-12 grid-c-sm-3 grid-c-md-2">
        <h2 class="h1">{{ title }}</h2>
      </div>
    </div>
    <div class="grid-c-12">
      <div class="spacing-tb-m">
        <p v-if="pending">Loading...</p>
        <template v-else-if="data">
          <SelectedProjectsItem
            v-for="value in selectedProjects"
            :key="value.slug"
            :project="value"
          />
        </template>
        <p v-else>no projects...</p>
      </div>
      <UiLink text="See all projects" :href="appConfig.slugProjects"
        ><LazyProjectCount
      /></UiLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected-projects {
}
</style>
