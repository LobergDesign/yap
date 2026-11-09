export default defineEventHandler((event) => {
  const { pathname, search } = getRequestURL(event);

  // husk auth urler
  if (
    pathname.endsWith('/') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_') ||
    /\.[^/]+$/.test(pathname) // static files: .svg, .ttf, favicon.ico
  ) {
    return;
  }

  const safePath = pathname.replace(/^\/+/, '/');
  return sendRedirect(event, `${safePath}/${search}`, 301);
});
