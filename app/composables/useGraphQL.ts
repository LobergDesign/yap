export const useGraphQL = (document: any, variables?: any) => {
  const executeQuery = async () => {
    return await $fetch('/api/cms', {
      method: 'POST',
      body: {
        document,
        variables,
      },
    });
  };

  return { executeQuery };
};
