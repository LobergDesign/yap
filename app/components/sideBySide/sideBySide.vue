<script lang="ts" setup>
import type { RichText } from '~/types/shared/rte';

interface Sections {
  sectionOne?: RichText | null;
  sectionTwo?: RichText | null;
}

defineProps<{
  data: Sections;
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
