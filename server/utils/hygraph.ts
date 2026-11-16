import { print, type GraphQLFormattedError } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLFormattedError[];
}

/**
 * Execute a codegen document against Hygraph.
 * Upstream details are logged here and never forwarded to the client.
 */
export const hygraphQuery = async <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
): Promise<TResult> => {
  const config = useRuntimeConfig();

  const response = await $fetch<GraphQLResponse<TResult>>(config.graphqlHost!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.graphqlToken}` },
    body: { query: print(document), variables },
    timeout: 10000,
  }).catch((error: Error) => {
    console.error('[Hygraph request failed]', error.message);
    throw createError({ status: 503, statusText: 'CMS unavailable' });
  });

  if (response.errors?.length || !response.data) {
    console.error('[Hygraph GraphQL error]', response.errors);
    throw createError({ status: 500, statusText: 'CMS query failed' });
  }

  return response.data;
};
