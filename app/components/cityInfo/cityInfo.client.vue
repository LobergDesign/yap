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
  <div class="city-info">
    <span>Copenhagen </span>
    <NuxtTime
      :datetime="setNowTime"
      locale="da-DK"
      time-zone="Europe/Copenhagen"
      hour="2-digit"
      minute="2-digit"
    />
    <DynamicWeather @status="weatherStatus" />
  </div>
</template>

<style lang="scss" scoped>
.city-info {
  display: flex;
  align-items: center;
  span,
  time {
    display: inline-block;
    vertical-align: middle;
    color: theme-color('accent');
    font-variation-settings: 'wght' 300;
  }
  time {
    margin: 0 6px;
    font-size: 11px;
  }
}
</style>
