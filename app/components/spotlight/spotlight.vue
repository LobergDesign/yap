<script lang="ts" setup>
import type { ImageFragmentFragment } from '~/types/generated/graphql';
defineProps<{
  title: string;
  subHeader?: string | null | undefined;
  linkHref: string;
  image: ImageFragmentFragment;
}>();
</script>
<template>
  <div class="spotlight">
    <NuxtLink :to="`/projects/${linkHref}`">
      <UiImage :image="image" class="spotlight__image" />
    </NuxtLink>
    <div class="grid-r">
      <div class="grid-c-12 grid-c-sm-2">
        <h4>({{ title }})</h4>
      </div>
      <div class="grid-c-12 grid-c-sm-4">
        <p v-if="subHeader" class="h3">{{ subHeader }}</p>
      </div>
      <div class="grid-c-12 grid-c-sm-2 spotlight__link">
        <UiLink text="Go to case" :href="`/projects/${linkHref}`" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spotlight {
  .h3 {
    max-width: 280px;
    margin-top: 0;
  }
  &__image {
    margin-bottom: clamp(2px, 1vw, 10px);
  }
  &__link {
    text-align: left;
    @include viewport-medium {
      text-align: right;
    }
    a {
      display: inline-block;
    }
  }
}
</style>
