export const useCachedFetchFactory = createUseAsyncData({
  // Use Nuxt's built-in cache if data already exists
  getCachedData: (key) =>
    useNuxtApp().payload.data[key] ?? useNuxtData(key).data.value,
});
