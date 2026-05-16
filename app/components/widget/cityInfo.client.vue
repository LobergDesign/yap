<script lang="ts" setup>
import type { WeatherIcon } from '~/types/shared/weather';
const { data, pending, refresh } = await useWeather();
const setNowTime = ref(Date.now());
let timeInterval: NodeJS.Timeout | null = null;
let weatherUpdateInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  timeInterval = setInterval(() => {
    setNowTime.value = Date.now();
  }, 30 * 1000);

  weatherUpdateInterval = setInterval(refresh, 5 * 60 * 1000);
});
onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (weatherUpdateInterval) clearInterval(weatherUpdateInterval);
});

const setIcon = computed<WeatherIcon>(() => {
  if (!data.value?.current_weather) return 'partly-cloudy-day';

  const { weathercode, is_day } = data.value.current_weather;
  const iconSet = WEATHER_CODE_MAP[weathercode];

  if (!iconSet) return 'partly-cloudy-day';
  return is_day === 1 ? iconSet.day : iconSet.night;
});
</script>

<template>
  <Widget title="Copenhagen">
    <div class="city-info">
      <NuxtTime
        :datetime="setNowTime"
        locale="da-DK"
        time-zone="Europe/Copenhagen"
        hour="2-digit"
        minute="2-digit"
      />
      <div class="justify-center">
        <p v-if="pending">Getting weather report...</p>
        <nuxt-icon
          v-else
          class="city-info__weather"
          :name="`weather/${setIcon}`"
        />
      </div>
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
  ::v-deep(.city-info__weather) svg {
    height: clamp(8rem, 8vw, 10rem);
    width: clamp(8rem, 8vw, 10rem);
  }
}
</style>
