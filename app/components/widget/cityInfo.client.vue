<script lang="ts" setup>
const { data, pending, refresh } = await useWeather();
const setNowTime = ref(Date.now());
const interval = ref<NodeJS.Timeout | null>(null);

interval.value = setInterval(() => {
  setNowTime.value = Date.now();
  refresh();
}, 60000);

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});
</script>

<template>
  <Widget :pending title="Copenhagen">
    <div class="city-info">
      <NuxtTime
        :datetime="setNowTime"
        locale="da-DK"
        time-zone="Europe/Copenhagen"
        hour="2-digit"
        minute="2-digit"
      />
      <pre>
        {{ data }}
      </pre>
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
