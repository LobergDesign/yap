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
  const { handleError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    await useCachedFetchFactory<GetProjectsQuery>(`projects`, () =>
      executeQuery(),
    );

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
