export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const secret = getHeader(event, 'x-prerender-revalidate');

  // Verify secret from GitHub Action
  if (secret !== process.env.REVALIDATE_SECRET) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid revalidation secret',
    });
  }

  // Get path to revalidate (defaults to current path)
  const path = (query.path as string) || getRequestURL(event).pathname;

  // On Vercel, this triggers ISR/SWR revalidation
  // The path will be regenerated on next request
  console.log(`[Revalidate] Triggered revalidation for: ${path}`);

  return {
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
  };
});
