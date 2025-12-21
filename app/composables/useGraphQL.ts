import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

/**
 * Generic GraphQL composable for executing queries
 * @param document - TypedDocumentNode from codegen
 * @param variables - Query variables (typed from document)
 */
export const useGraphQL = <TResult, TVariables extends Record<string, unknown>>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
) => {
  const executeQuery = async () => {
    return await $fetch<TResult>('/api/cms', {
      method: 'POST',
      body: {
        document,
        variables,
      },
    });
  };

  return { executeQuery };
};
