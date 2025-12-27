<script lang="ts" setup>
const weatherStatus = ref('pending');
const setNowTime = ref(Date.now());

onMounted(() => {
  const interval = setInterval(() => {
    setNowTime.value = Date.now();
  }, 60000); // Update every minute

  onUnmounted(() => clearInterval(interval));
});
</script>
<template>
  <header class="header grid-w">
    <ul class="grid-r">
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/" class="header__logo">(yap)</NuxtLink>
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/" class="header__nav-item"
          >Playground<sub>(5)</sub></NuxtLink
        >
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/" class="header__nav-item">About me</NuxtLink>
      </li>
      <li class="grid-c-1 place-c-l">
        <NuxtLink to="/" class="header__nav-item">Contact</NuxtLink>
      </li>
      <li class="grid-c-4 place-c-r">
        <div class="header__location-info">
          <span>Copenhagen </span>
          <NuxtTime
            :datetime="setNowTime"
            locale="da-DK"
            time-zone="Europe/Copenhagen"
            hour="2-digit"
            minute="2-digit"
          />
          <DynamicWeather v-model:status="weatherStatus" />
        </div>
      </li>
    </ul>
  </header>
</template>
<style src="./_appHeaderShared.scss" />
<style lang="scss" scoped>
.header {
  padding: clamp(5px, 0.8vw, 10px) 0;
  span,
  time {
    display: inline-block;
    vertical-align: middle;
    color: #5d5d5d;
    font-weight: 400;
  }
  time {
    margin: 0 6px;
    font-size: 11px;
  }
  &__location-info {
    display: flex;
    align-items: center;
  }
}
</style>
