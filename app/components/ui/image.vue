<script lang="ts" setup>
import type { ImageFragmentFragment } from '~/types/generated/graphql';
defineProps<{
  image: ImageFragmentFragment;
}>();
</script>
<template>
  <NuxtImg :src="image.image.url" :alt="image.alt" />
</template>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
