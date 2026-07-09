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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#060010' },
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
      { rel: 'preload', href: '/barry.webp', as: 'image', type: 'image/webp' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Barry Michael Doyle Blog',
        href: '/rss.xml',
      },
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
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <PostHogInit />
        <Header />
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-4xl flex-1 px-3 pt-20 outline-none"
        >
          {children}
        </main>
        <Footer />
        <Scripts />
        <div className="absolute -z-1 h-[50vh] w-full bg-background">
          <LazyAurora speed={0.5} amplitude={1} />
        </div>
      </body>
    </html>
  );
}
