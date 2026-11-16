<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  text: string;
}>();
</script>
<template>
  <NuxtLink :to class="cta">
    {{ text }}
    <slot></slot>
    <nuxt-icon name="arrow" />
    <div class="line" />
    <div class="inner-line" />
  </NuxtLink>
</template>
