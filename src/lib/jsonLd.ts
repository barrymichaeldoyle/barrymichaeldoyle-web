import { OG_IMAGE, SITE_URL, TITLES, links } from '~/constants';
import { type BlogPostMeta } from '~/types/blog';

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data),
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Barry Michael Doyle',
    url: SITE_URL,
    image: OG_IMAGE,
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

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
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

export function articleJsonLd(post: BlogPostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: OG_IMAGE,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
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
