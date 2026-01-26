<script lang="ts" setup>
defineProps<{
  text: string;
}>();
</script>
<template>
  <button type="button" class="cta">
    {{ text }}
    <nuxt-icon name="arrow" />
    <div class="line" />
    <div class="inner-line" />
  </button>
</template>

<style lang="scss" scoped></style>
