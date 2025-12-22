<script setup lang="ts">
import DOMPurify from 'dompurify';

interface Text {
  html: string;
  text: string;
}

defineProps<{
  data: Text;
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
