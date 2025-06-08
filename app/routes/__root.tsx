import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/provider';
import { ThemeToggle } from '@/components/theme/toggle';
import appCss from '@/styles/app.css?url';

// Create a client
const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Barry Michael Doyle - Staff Frontend Engineer' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="particle-overlay"></div>
        <ThemeProvider storageKey="bmd-theme">
          <QueryClientProvider client={queryClient}>
            <div className="absolute right-0 top-0 p-1 z-1">
              <ThemeToggle />
            </div>
            <main className="container mx-auto space-y-16 px-3 flex-1">
              {children}
            </main>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
