import { GetProjectCountDocument } from '#shared/types/generated/graphql';

export default defineEventHandler(() => hygraphQuery(GetProjectCountDocument));
