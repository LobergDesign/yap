import { FrontpageDocument, type FrontpageQuery } from '~/generated/graphql';

export const useFrontpage = () => {
  const { executeQuery } = useGraphQL(FrontpageDocument, {
    id: CONTENT_IDS.FRONTPAGE,
  });

  const { data, error, pending, refresh, status } =
    useAsyncData<FrontpageQuery>('frontpage', () => executeQuery(), {
      // Use Nuxt's built-in cache if data already exists
      getCachedData: (key) =>
        useNuxtApp().payload.data[key] ?? useNuxtData(key).data.value,
      lazy: false, // Wait for data before rendering (good for critical content)
      server: true, // Fetch on server-side
      dedupe: 'defer', // Deduplicate requests
    });

  return {
    data,
    error,
    pending: readonly(pending),
    status: readonly(status),
    refresh,
  };
};
