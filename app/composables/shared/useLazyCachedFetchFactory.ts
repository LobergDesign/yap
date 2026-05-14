export const useLazyCachedFetchFactory = createUseAsyncData({
  lazy: true,
  server: false,
  getCachedData: (key) =>
    useNuxtApp().payload.data[key] ?? useNuxtData(key).data.value,
});
