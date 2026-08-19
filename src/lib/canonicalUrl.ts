const canonicalHostname = 'barrymichaeldoyle.com';

export function canonicalRedirectUrl(requestUrl: string): URL | undefined {
  const url = new URL(requestUrl);
  const isWww = url.hostname === `www.${canonicalHostname}`;
  const lastPathSegment = url.pathname.split('/').at(-1) ?? '';
  const needsTrailingSlash =
    url.pathname !== '/' &&
    !url.pathname.endsWith('/') &&
    !lastPathSegment.includes('.');

  if (!isWww && !needsTrailingSlash) {
    return undefined;
  }

  url.hostname = canonicalHostname;
  if (needsTrailingSlash) {
    url.pathname = `${url.pathname}/`;
  }

  return url;
}
