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

  const asyncData = useAsyncData<GetFrontpageQuery>('frontpage', () =>
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
