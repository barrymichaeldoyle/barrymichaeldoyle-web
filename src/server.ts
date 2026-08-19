import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { canonicalRedirectUrl } from '~/lib/canonicalUrl';

const securityHeaders = {
  'Content-Security-Policy': 'upgrade-insecure-requests',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
} as const;

export default createServerEntry({
  async fetch(request) {
    const redirectUrl = canonicalRedirectUrl(request.url);
    if (redirectUrl) {
      return Response.redirect(redirectUrl, 308);
    }

    const response = await handler.fetch(request);
    const securedResponse = new Response(response.body, response);

    for (const [name, value] of Object.entries(securityHeaders)) {
      securedResponse.headers.set(name, value);
    }

    return securedResponse;
  },
});
