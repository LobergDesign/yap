import { print, type GraphQLFormattedError } from 'graphql';

interface GraphQLResponse<TData = unknown> {
  data?: TData;
  errors?: GraphQLFormattedError[];
}

export default defineEventHandler(async (event) => {
  const { document, variables } = await readBody(event);
  const config = useRuntimeConfig();

  const query = typeof document === 'string' ? document : print(document);

  try {
    const response = await $fetch<GraphQLResponse>(config.graphqlHost!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.graphqlToken}`,
      },
      body: {
        query,
        variables,
      },
      timeout: 10000, // 10 second timeout
    });

    // Handle GraphQL errors with proper status codes
    if (response.errors && response.errors.length > 0) {
      const firstError = response.errors[0];
      const errorCode = firstError?.extensions?.code;

      // Map GraphQL error codes to HTTP status codes
      let status = 500;
      if (errorCode === 'UNAUTHENTICATED') status = 401;
      if (errorCode === 'FORBIDDEN') status = 403;
      if (errorCode === 'BAD_USER_INPUT') status = 400;
      if (errorCode === 'GRAPHQL_VALIDATION_FAILED') status = 400;
      if (errorCode === 'GRAPHQL_PARSE_FAILED') status = 400;
      if (errorCode === 'NOT_FOUND') status = 404;

      console.error('[GraphQL Error]', {
        code: errorCode,
        message: firstError?.message,
        path: firstError?.path,
        status,
      });

      throw createError({
        status,
        statusText: firstError?.message,
        data: {
          graphQLErrors: response.errors,
          // Include partial data if it exists (GraphQL can return both)
          partialData: response.data || null,
        },
      });
    }

    return response.data;
  } catch (error: unknown) {
    // Re-throw if already a Nuxt error (has status)
    if (error && typeof error === 'object' && 'status' in error) throw error;

    // Type assertion for error with Node.js error code property
    const err = error as Error & { code?: string };

    // Network/fetch errors
    if (err.name === 'FetchError') {
      console.error('[Network Error]', {
        message: err.message,
        cause: err.cause,
      });

      throw createError({
        status: 503,
        statusText: 'GraphQL service unavailable',
        data: {
          originalError: err.message,
          type: 'NETWORK_ERROR',
        },
      });
    }

    // Timeout errors
    if (err.name === 'TimeoutError' || err.code === 'ETIMEDOUT') {
      console.error('[Timeout Error]', err.message);

      throw createError({
        status: 504,
        statusText: 'GraphQL request timeout',
        data: {
          type: 'TIMEOUT_ERROR',
        },
      });
    }

    // Unknown errors
    console.error('[Unknown Error]', err);

    throw createError({
      status: 500,
      statusText: 'Internal server error',
      data: {
        type: 'UNKNOWN_ERROR',
      },
    });
  }
});
