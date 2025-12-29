<template>
  <span class="logo"
    ><span>(</span><span>yap</span><sub>©</sub><span>)</span></span
  >
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.logo {
  font-size: 60px;
  font-variation-settings: 'wght' 800;
  position: relative;

  @include viewport-medium {
    font-size: 125px;
  }

  span:first-of-type,
  span:last-of-type {
    letter-spacing: -7px;
    font-size: 70px;
    font-variation-settings: 'wght' 400;

    @include viewport-medium {
      letter-spacing: -12px;
      font-size: 135px;
    }
  }
  sub {
    position: absolute;
    top: 20px;
    right: 14px;
    font-size: 12px;
    font-variation-settings: 'wght' 300;

    @include viewport-medium {
      top: 36px;
      right: 30px;
      font-size: 20px;
    }
  }
}
</style>
