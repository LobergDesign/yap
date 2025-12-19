import { print } from 'graphql';

export default defineEventHandler(async (event) => {
  const { document, variables } = await readBody(event);
  const config = useRuntimeConfig();

  // Convert document to query string on server side
  const query = typeof document === 'string' ? document : print(document);

  try {
    const response: any = await $fetch(config.graphqlHost!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.graphqlToken}`,
      },
      body: {
        query,
        variables,
      },
    });

    // GraphQL responses have { data, errors } structure
    if (response.errors) {
      console.error('[Server API] GraphQL errors:', response.errors);
      throw createError({
        statusCode: 400,
        statusMessage: 'GraphQL query error',
        data: response.errors,
      });
    }

    // Return just the data property (same format as graphql-request)
    return response.data;
  } catch (error: any) {
    console.error('[Server API] GraphQL error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: 'GraphQL request failed',
    });
  }
});
