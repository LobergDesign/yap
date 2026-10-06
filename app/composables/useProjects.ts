import {
  GetProjectsDocument,
  type GetProjectsQuery,
  type GetProjectsQueryVariables,
} from '~/types/generated/graphql';

export const useProjects = async () => {
  const { executeQuery } = useGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjectsDocument);
  const { watchError } = useErrorHandler();

  const asyncData = useAsyncData<GetProjectsQuery>(`projects`, () =>
    executeQuery(),
  );

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
