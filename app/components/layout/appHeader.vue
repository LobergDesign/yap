<script lang="ts" setup>
const appConfig = useAppConfig();
</script>
<template>
  <header class="header grid-w">
    <ul class="grid-r">
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/" class="header__logo">
          <LogoSmall />
        </NuxtLink>
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink :to="appConfig.slugProjects" class="header__nav-item"
          >Projects<sub><LazyProjectCount /></sub
        ></NuxtLink>
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink :to="appConfig.slugAbout" class="header__nav-item"
          >About</NuxtLink
        >
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink :to="appConfig.slugContact" class="header__nav-item"
          >Contact</NuxtLink
        >
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
