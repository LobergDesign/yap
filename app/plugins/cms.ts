export default defineNuxtPlugin((_nuxtApp) => {
  // get data from query via server API route
  const getData = async (document: any, variables?: any) => {
    try {
      const response = await $fetch('/api/cms', {
        method: 'POST',
        body: {
          document,
          variables,
        },
      });
      return response;
    } catch (error: any) {
      console.error('getData error from cms plugin', error);
      throw error;
    }
  };

  return {
    provide: {
      getData,
    },
  };
});
