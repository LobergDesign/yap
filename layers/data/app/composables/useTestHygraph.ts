export const useTestHygraph = async () => {
  try {
    const { data, error, status, pending } = await useAsyncGql('TestHygraph')

    // ✅ GraphQL or network errors are stored reactively in `error.value`
    if (error.value) {
      const err = error.value

      if (err.networkError) {
        console.error('[Network error]', err.networkError)
      } else if (err.graphQLErrors?.length) {
        console.error('[GraphQL error]', err.graphQLErrors)
      } else {
        console.error('[Unknown gql errosssr]', err)
      }
    }

    return { data, error, status, pending }
  } catch (e) {
    console.error('Unexpected error:', e)
    // You can return empty refs so destructuring doesn’t break
    return {
      data: ref(null),
      error: e,
      status: ref('error'),
      pending: ref(false),
    }
  }
}
