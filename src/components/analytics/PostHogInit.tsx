import { useEffect } from 'react';

export function PostHogInit() {
  const postHogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const postHogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  useEffect(() => {
    if (!postHogApiKey || !postHogHost) return;

    let cancelled = false;

    void import('posthog-js').then(({ default: posthog }) => {
      if (cancelled) return;
      posthog.init(postHogApiKey, {
        api_host: postHogHost,
        defaults: '2025-11-30',
      });
    });

    return () => {
      cancelled = true;
    };
  }, [postHogApiKey, postHogHost]);

  return null;
}
