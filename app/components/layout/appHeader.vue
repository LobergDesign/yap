<script lang="ts" setup></script>
<template>
  <header class="header grid-w">
    <ul class="grid-r">
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/" class="header__logo">
          <LogoSmall />
        </NuxtLink>
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/projects" class="header__nav-item"
          >Projects<sub>(5)</sub></NuxtLink
        >
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/about-me" class="header__nav-item">About me</NuxtLink>
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/contact" class="header__nav-item">Contact</NuxtLink>
      </li>
    </ul>
  </header>
</template>
<style src="./_appHeaderShared.scss" />
<style lang="scss" scoped>
.header {
  padding: clamp(5px, 0.8vw, 10px) 0;
}
</style>
