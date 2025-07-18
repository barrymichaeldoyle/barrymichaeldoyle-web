'use client';

import { type ReactNode } from 'react';

import { useIsMounted } from '~/lib/utils';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component that prevents hydration mismatches
 * by only rendering children after the component has mounted on the client
 */
export function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return fallback;
  }

  return children;
}
