<script lang="ts" setup>
import type { ImageFragmentFragment } from '~/types/generated/graphql';
const { lazy = true } = defineProps<{
  image: ImageFragmentFragment;
  lazy?: boolean;
}>();
</script>
<template>
  <img
    :src="image.image.url"
    :alt="image.alt ? image.alt : undefined"
    :width="image.image.width ?? undefined"
    :height="image.image.height ?? undefined"
    :loading="lazy ? 'lazy' : 'eager'"
    :sizes="lazy ? 'auto' : undefined"
  />
</template>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  // Required: the width/height attributes give the browser an intrinsic
  // aspect ratio, so without this the attribute height would be honoured
  // literally and distort the image.
  height: auto;
}
</style>
