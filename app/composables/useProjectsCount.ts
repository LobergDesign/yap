import {
  GetProjectCountDocument,
  type GetProjectCountQuery,
  type GetProjectCountQueryVariables,
} from '~/types/generated/graphql';

export const useProjectCount = async () => {
  const { executeQuery } = useGraphQL<
    GetProjectCountQuery,
    GetProjectCountQueryVariables
  >(GetProjectCountDocument);
  const { handleError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    await useLazyCachedFetchFactory<GetProjectCountQuery>(`project-count`, () =>
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
