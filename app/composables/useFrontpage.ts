import { FrontpageDocument, type FrontpageQuery } from '~/generated/graphql';

export const useFrontpage = async () => {
  const { $getData } = useNuxtApp();

  const { data, error } = await useAsyncData<FrontpageQuery>('frontpage', () =>
    $getData(FrontpageDocument, { id: CONTENT_IDS.FRONTPAGE }),
  );

  // ✅ GraphQL or network errors are stored reactively in `error.value`
  if (error.value) {
    const err = error.value as any;

    if (err.networkError) {
      console.error('[Network error]', err.networkError);
    } else if (err.graphQLErrors?.length) {
      console.error('[GraphQL error]', err.graphQLErrors);
    } else {
      console.error('[Unknown gql error]', err);
    }
  }

  return { data };
};
