import { GetProjectsDocument } from '#shared/types/generated/graphql';

export default defineEventHandler(() => hygraphQuery(GetProjectsDocument));
