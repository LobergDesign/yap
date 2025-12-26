<script lang="ts" setup></script>
<template>
  <header>
    <div class="grid-w">
      <ul class="grid-r">
        <li class="grid-c-1">
          <NuxtLink to="/">(yap) | home</NuxtLink>
        </li>
        <li class="grid-c-1">
          <NuxtLink to="/">Playground<sub>5</sub></NuxtLink>
        </li>
        <li class="grid-c-1">
          <NuxtLink to="/">About me</NuxtLink>
        </li>
        <li class="grid-c-1">
          <NuxtLink to="/">Contact</NuxtLink>
        </li>
        <li class="grid-c-4"><DynamicWeather /></li>
      </ul>
    </div>
  </header>
</template>
<style src="./_appHeaderShared.scss" />
<style lang="scss" scoped>
header {
  padding: clamp(14px, 2vw, 18px) 0;
}
</style>
