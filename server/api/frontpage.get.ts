import { GetFrontpageDocument } from '#shared/types/generated/graphql';

export default defineEventHandler(() =>
  hygraphQuery(GetFrontpageDocument, { id: CONTENT_IDS.FRONTPAGE }),
);
