import {
  GetProjectDocument,
  type GetProjectQuery,
  type GetProjectQueryVariables,
} from '~/types/generated/graphql';

/**
 * Composable for fetching frontpage data from CMS
 * Handles caching, errors, and SSR
 */
export const useProject = async (slug: string) => {
  const { executeQuery } = useGraphQL<
    GetProjectQuery,
    GetProjectQueryVariables
  >(GetProjectDocument, {
    slug: slug,
  });
  const { handleError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    await useLazyAsyncData<GetProjectQuery>(
      `project-${slug}`,
      () => executeQuery(),
      {
        // Use Nuxt's built-in cache if data already exists
        getCachedData: (key) =>
          useNuxtApp().payload.data[key] ?? useNuxtData(key).data.value,
      },
    );

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
