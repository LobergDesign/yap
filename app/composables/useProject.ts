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
  const { watchError } = useErrorHandler();

  const asyncData = useAsyncData<GetProjectQuery>(`project-${slug}`, () =>
    executeQuery(),
  );

  // Handle errors - routes 404/500+ to error.vue
  watchError(asyncData.error);

  // Await the AsyncData thenable itself - this is what blocks navigation
  // until the request settles. Destructuring it first would discard it.
  await asyncData;

  const { data, error, pending, refresh, status } = asyncData;

  return {
    data,
    error,
    pending: readonly(pending),
    status: readonly(status),
    refresh,
  };
};
