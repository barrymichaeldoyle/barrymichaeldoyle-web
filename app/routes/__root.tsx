import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';

import appCss from '@/styles/app.css?url';
import { ThemeProvider } from '@/components/theme/provider';
import { ThemeToggle } from '@/components/theme/toggle';

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
          <header className="absolute right-0 top-0 p-1">
            <ThemeToggle />
          </header>
          {children}
          <footer className="border-t border-border bg-card py-4">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Barry Michael Doyle</p>
            </div>
          </footer>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
