<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  text: string;
}>();
</script>
<template>
  <NuxtLink :to class="cta-new">
    {{ text }}
    <Orb4 />
  </NuxtLink>
</template>
