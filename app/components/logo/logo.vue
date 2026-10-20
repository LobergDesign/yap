<script lang="ts" setup>
const { size = 'small' } = defineProps<{ size?: 'small' | 'large' }>();
</script>
<template>
  <span class="logo" :class="`logo--${size}`" aria-label="yap">
    <span class="logo__paren" aria-hidden="true">(</span>
    <span aria-hidden="true">yap</span>
    <sup v-if="size === 'large'" class="logo__copy" aria-hidden="true">©</sup>
    <span class="logo__paren" aria-hidden="true">)</span>
  </span>
</template>

<style lang="scss" scoped>
.logo {
  position: relative;
  font-variation-settings: 'wght' 600;
  white-space: nowrap;

  &--small {
    font-size: 14px;
  }

  &--large {
    font-size: clamp(60px, 18vw, 250px);
  }

  &__paren {
    font-size: 0.804em;
    letter-spacing: -0.048em;
    font-variation-settings: 'wght' 500;
  }

  &__copy {
    position: absolute;
    top: 1.536em;
    right: 2.071em;
    font-size: 0.13em;
    font-variation-settings: 'wght' 300;
  }
}
</style>
