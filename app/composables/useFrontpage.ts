import { FrontpageDocument, type FrontpageQuery } from '~/generated/graphql';

export const useFrontpage = () => {
  const { executeQuery } = useGraphQL(FrontpageDocument, {
    id: CONTENT_IDS.FRONTPAGE,
  });
  const { handleError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    useAsyncData<FrontpageQuery>('frontpage', () => executeQuery(), {
      // Use Nuxt's built-in cache if data already exists
      getCachedData: (key) =>
        useNuxtApp().payload.data[key] ?? useNuxtData(key).data.value,
    });

  // Handle errors - routes 404/500+ to error.vue
  watch(error, (err) => {
    if (err) handleError(err);
  });

  return {
    data,
    error,
    pending: readonly(pending),
    status: readonly(status),
    refresh,
  };
};
