import {
  GetFrontpageDocument,
  type GetFrontpageQuery,
  type GetFrontpageQueryVariables,
} from '~/types/generated/graphql';

export const useFrontpage = async () => {
  const { executeQuery } = useGraphQL<
    GetFrontpageQuery,
    GetFrontpageQueryVariables
  >(GetFrontpageDocument, {
    id: CONTENT_IDS.FRONTPAGE,
  });
  const { watchError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    await useCachedFetchFactory<GetFrontpageQuery>('frontpage', () =>
      executeQuery(),
    );

  watchError(error);

  return {
    data,
    error,
    pending: readonly(pending),
    status: readonly(status),
    refresh,
  };
};
