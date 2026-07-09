import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { type ReactNode } from 'react';
import { PostHogInit } from '~/components/analytics/PostHogInit';
import { Footer } from '~/components/layout/Footer';
import { Header } from '~/components/layout/Header';
import { LazyAurora } from '~/components/lazy/LazyAurora';
import { NotFound } from '~/components/NotFound';
import { OG_IMAGE, SITE_URL, TITLES } from '~/constants';
import { jsonLdScript, personJsonLd, websiteJsonLd } from '~/lib/jsonLd';
import { seo } from '~/lib/seo';
import appCss from '~/styles/app.css?url';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'Barry Michael Doyle - Staff Engineer',
        description: `Barry Michael Doyle - ${TITLES.join(' | ')}`,
        image: OG_IMAGE,
        url: SITE_URL,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preload', href: '/profile.png', as: 'image' },
    ],
    scripts: [jsonLdScript(personJsonLd()), jsonLdScript(websiteJsonLd())],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <PostHogInit />
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-3 pt-20">
            {children}
          </main>
          <Footer />
          {import.meta.env.DEV ? (
            <ReactQueryDevtools initialIsOpen={false} />
          ) : null}
        </QueryClientProvider>
        <Scripts />
        <div className="absolute -z-1 h-[50vh] w-full bg-background">
          <LazyAurora speed={0.5} amplitude={1} />
        </div>
      </body>
    </html>
  );
}
