import { GetProjectDocument } from '#shared/types/generated/graphql';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!;
  const data = await hygraphQuery(GetProjectDocument, { slug });

  if (!data.project) {
    throw createError({ status: 404, statusText: 'Project not found' });
  }

  return data;
});
