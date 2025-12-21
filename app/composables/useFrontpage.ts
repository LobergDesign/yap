import {
  FrontpageDocument,
  type FrontpageQuery,
  type FrontpageQueryVariables,
} from '~/generated/graphql';

/**
 * Composable for fetching frontpage data from CMS
 * Handles caching, errors, and SSR
 */
export const useFrontpage = () => {
  const { executeQuery } = useGraphQL<FrontpageQuery, FrontpageQueryVariables>(
    FrontpageDocument,
    {
      id: CONTENT_IDS.FRONTPAGE,
    },
  );
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
