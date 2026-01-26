<script lang="ts" setup>
defineProps<{
  href: string;
  text: string;
}>();
</script>
<template>
  <NuxtLink :to="href" class="cta">
    {{ text }}
    <nuxt-icon name="arrow" />
    <div class="line" />
    <div class="inner-line" />
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
