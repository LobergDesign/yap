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
  const { handleError } = useErrorHandler();

  const { data, error, pending, refresh, status } =
    await useCachedFetchFactory<GetFrontpageQuery>('frontpage', () =>
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
