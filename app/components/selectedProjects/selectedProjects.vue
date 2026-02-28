<script lang="ts" setup>
import type { GetFrontpageQuery } from '~/types/generated/graphql';

type Frontpage = NonNullable<GetFrontpageQuery['frontpage']>;

defineProps<{
  title: Frontpage['selectedProjectsTitle'];
  slugList: Frontpage['projects'];
}>();
</script>
<template>
  <div class="selected-projects">
    <div class="grid-r">
      <div class="grid-c-12 grid-c-sm-3 grid-c-md-2">
        <h2 class="h1">{{ title }}</h2>
      </div>
    </div>
    <div class="grid-c-12">
      <SelectedProjectsItem
        v-for="(slug, index) in slugList"
        :key="index"
        :slug="slug.slug"
      />
      <UiLink text="See all projects (12)" href="/projects" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected-projects {
}
</style>
