<script lang="ts" setup>
const weatherStatus = ref('pending');
const setNowTime = ref(Date.now());
const interval = ref<NodeJS.Timeout | null>(null);

onMounted(async () => {
  await nextTick();
  interval.value = setInterval(() => {
    setNowTime.value = Date.now();
  }, 60000); // Update every minute
});

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});
</script>

<template>
  <Widget :pending="false" title="Copenhagen">
    <div class="city-info">
      <NuxtTime
        :datetime="setNowTime"
        locale="da-DK"
        time-zone="Europe/Copenhagen"
        hour="2-digit"
        minute="2-digit"
      />
      <LazyDynamicWeather class="text-c" @status="weatherStatus" />
    </div>
  </Widget>
</template>

<style lang="scss" scoped>
.city-info {
  time {
    font-size: 10px;
    opacity: 0.5;
    margin-bottom: 5px;
  }
  ::v-deep(.dynamic-weather-icon) svg {
    height: clamp(8rem, 8vw, 10rem);
    width: clamp(8rem, 8vw, 10rem);
  }
}
</style>
