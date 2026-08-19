import { OG_IMAGE, SITE_URL, TITLES, links } from '~/constants';
import { type BlogPostMeta } from '~/types/blog';

function personEntityJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Barry Michael Doyle',
    alternateName: 'barrymdoyle',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/barry.webp`,
    jobTitle: TITLES[0],
    description: `Barry Michael Doyle - ${TITLES.join(' | ')}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cape Town',
      addressCountry: 'ZA',
    },
    sameAs: [
      links.github,
      links.linkedin,
      links.twitter,
      links.youtube,
      links.twitch,
      links.stackOverflow,
      links.devTo,
    ],
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...personEntityJsonLd(),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Barry Michael Doyle',
    url: SITE_URL,
    description: `Barry Michael Doyle - ${TITLES.join(' | ')}`,
    author: {
      '@type': 'Person',
      name: 'Barry Michael Doyle',
      url: SITE_URL,
    },
  };
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile-page`,
    url: `${SITE_URL}/`,
    name: 'Barry Michael Doyle - Staff Engineer',
    mainEntity: personEntityJsonLd(),
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  };
}

export function articleBreadcrumbJsonLd(post: BlogPostMeta) {
  const articleUrl = `${SITE_URL}/blog/${post.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };
}

export function articleJsonLd(post: BlogPostMeta) {
  const articleUrl = `${SITE_URL}/blog/${post.slug}/`;
  const datePublished = `${post.date}T00:00:00+02:00`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished,
    image: OG_IMAGE,
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Barry Michael Doyle',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Barry Michael Doyle',
      url: SITE_URL,
      image: OG_IMAGE,
    },
  };
}
