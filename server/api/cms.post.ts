import { print } from 'graphql';

interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
    [key: string]: unknown;
  };
  path?: string[];
  locations?: Array<{ line: number; column: number }>;
}

interface GraphQLResponse<TData = unknown> {
  data?: TData;
  errors?: GraphQLError[];
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
      const errorCode = firstError.extensions?.code;

      // Map GraphQL error codes to HTTP status codes
      let statusCode = 500;
      if (errorCode === 'UNAUTHENTICATED') statusCode = 401;
      if (errorCode === 'FORBIDDEN') statusCode = 403;
      if (errorCode === 'BAD_USER_INPUT') statusCode = 400;
      if (errorCode === 'GRAPHQL_VALIDATION_FAILED') statusCode = 400;
      if (errorCode === 'GRAPHQL_PARSE_FAILED') statusCode = 400;
      if (errorCode === 'NOT_FOUND') statusCode = 404;

      console.error('[GraphQL Error]', {
        code: errorCode,
        message: firstError.message,
        path: firstError.path,
        statusCode,
      });

      throw createError({
        statusCode,
        statusMessage: firstError.message,
        data: {
          graphQLErrors: response.errors,
          // Include partial data if it exists (GraphQL can return both)
          partialData: response.data || null,
        },
      });
    }

    return response.data;
  } catch (error: unknown) {
    // Type guard for Error objects
    const err = error as Error & {
      statusCode?: number;
      name?: string;
      code?: string;
      message?: string;
      cause?: unknown;
    };

    // Already a createError - re-throw
    if (err.statusCode) throw err;

    // Network/fetch errors
    if (err.name === 'FetchError') {
      console.error('[Network Error]', {
        message: err.message,
        cause: err.cause,
      });

      throw createError({
        statusCode: 503,
        statusMessage: 'GraphQL service unavailable',
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
        statusCode: 504,
        statusMessage: 'GraphQL request timeout',
        data: {
          type: 'TIMEOUT_ERROR',
        },
      });
    }

    // Unknown errors
    console.error('[Unknown Error]', err);

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: {
        type: 'UNKNOWN_ERROR',
      },
    });
  }
});
