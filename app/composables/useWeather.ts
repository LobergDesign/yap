import type { OpenMeteoResponse } from '~/types/shared/weather';

export const useWeather = async () => {
  return await useLazyAsyncData('weather', () =>
    $fetch<OpenMeteoResponse>('/api/weather'),
  );
};
