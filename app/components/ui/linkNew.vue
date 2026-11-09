<script lang="ts" setup>
defineProps<{
  href: string;
  text: string;
}>();
</script>
<template>
  <NuxtLink :to="href" class="cta-new">
    {{ text }}

    <Orb4 />
  </NuxtLink>
</template>
