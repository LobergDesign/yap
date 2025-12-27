<script lang="ts" setup></script>
<template>
  <footer class="footer grid-w">
    <div class="grid-r">
      <div class="grid-c-5 place-c-l">
        <span class="footer__logo">(yap<sub>©</sub>)</span>
      </div>
      <div class="grid-c-1 place-c-r">
        <a href="mailto:jeanloberg@gmail.com">jeanloberg@gmail.com</a>
      </div>
      <div class="grid-c-1 place-c-r">
        <a
          href="https://www.linkedin.com/in/jean-loberg-hansen-3847567a/"
          target="_blank"
          to="/about"
          >LinkedIn</a
        >
      </div>
      <div class="grid-c-1 place-c-r">
        <a href="tel:26190069">+45 26 19 00 69</a>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  &__logo {
    font-weight: 800;
    font-size: clamp(80px, 8vw, 120px);
  }
  &__logo sub {
    font-size: clamp(12px, 1vw, 18px);
  }
}
</style>
