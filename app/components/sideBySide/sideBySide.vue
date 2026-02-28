<script lang="ts" setup>
import type { ContentSideBySideFragmentFragment } from '~/types/generated/graphql';

defineProps<{
  data: ContentSideBySideFragmentFragment;
}>();
</script>
<template>
  <div class="grid-r">
    <UiRitchTextEditor
      v-if="data.sectionOne"
      :data="data.sectionOne"
      class="grid-c-8 grid-c-sm-4 grid-c-md-2"
    />
    <UiRitchTextEditor
      v-if="data.sectionTwo"
      :data="data.sectionTwo"
      class="grid-c-8 grid-c-sm-4 grid-c-md-2"
    />
  </div>
</template>
