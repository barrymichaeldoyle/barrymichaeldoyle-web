import { useEffect } from 'react';

export function PostHogInit() {
  const postHogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const postHogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  useEffect(() => {
    if (!postHogApiKey || !postHogHost) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const load = () => {
      void import('posthog-js').then(({ default: posthog }) => {
        if (cancelled) return;
        posthog.init(postHogApiKey, {
          api_host: postHogHost,
          defaults: '2025-11-30',
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          disable_surveys: true,
          disable_session_recording: true,
          enable_heatmaps: false,
          capture_performance: false,
          advanced_disable_feature_flags: true,
        });
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(load, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(load, 2000);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [postHogApiKey, postHogHost]);

  return null;
}
