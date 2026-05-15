import type { OpenMeteoResponse } from '~/types/shared/weather';

export const useWeather = async () => {
  const LATITUDE = 55.676098;
  const LONGITUDE = 12.568337;

  return await useLazyCachedFetchFactory('weather', () =>
    $fetch<OpenMeteoResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true`,
    ),
  );
};
