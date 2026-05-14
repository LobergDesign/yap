import {
  GetProjectDocument,
  type GetProjectQuery,
  type GetProjectQueryVariables,
} from '~/types/generated/graphql';

export const useProject = async (slug: string) => {
  const { executeQuery } = useGraphQL<
    GetProjectQuery,
    GetProjectQueryVariables
  >(GetProjectDocument, {
    slug: slug,
  });
  const { handleError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    await useCachedFetchFactory<GetProjectQuery>(`project-${slug}`, () =>
      executeQuery(),
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
