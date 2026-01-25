<script setup lang="ts">
import type { RichText } from '~/types/shared/rte';
import DOMPurify from 'dompurify';

defineProps<{
  data: RichText;
}>();
</script>
<template>
  <ClientOnly>
    <div v-html="DOMPurify.sanitize(data.html)" />
    <template #fallback>
      <div>{{ data.text }}</div>
    </template>
  </ClientOnly>
</template>
