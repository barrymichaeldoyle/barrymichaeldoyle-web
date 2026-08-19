import { describe, expect, it } from 'vitest';
import { canonicalRedirectUrl } from '~/lib/canonicalUrl';
import {
  articleBreadcrumbJsonLd,
  articleJsonLd,
  profilePageJsonLd,
} from '~/lib/jsonLd';
import { seo } from '~/lib/seo';

const post = {
  slug: 'example-post',
  title: 'Example post',
  date: '2026-08-19',
  description: 'An example article.',
  readingMinutes: 1,
};

describe('canonical URLs', () => {
  it.each([
    [
      'https://www.barrymichaeldoyle.com/blog/example-post?ref=test',
      'https://barrymichaeldoyle.com/blog/example-post/?ref=test',
    ],
    [
      'https://barrymichaeldoyle.com/sudoku',
      'https://barrymichaeldoyle.com/sudoku/',
    ],
  ])('normalizes %s in one redirect', (input, expected) => {
    expect(canonicalRedirectUrl(input)?.toString()).toBe(expected);
  });

  it.each([
    'https://barrymichaeldoyle.com/',
    'https://barrymichaeldoyle.com/blog/',
    'https://barrymichaeldoyle.com/rss.xml',
  ])('does not redirect canonical URL %s', (input) => {
    expect(canonicalRedirectUrl(input)).toBeUndefined();
  });
});

describe('SEO metadata', () => {
  it('uses property attributes for Open Graph metadata', () => {
    const tags = seo({
      title: 'Example',
      description: 'Description',
      image: 'https://barrymichaeldoyle.com/og.webp',
    });

    const openGraphTags = tags.filter(
      (tag) => 'property' in tag && tag.property?.startsWith('og:')
    );

    expect(openGraphTags).toHaveLength(6);
    expect(
      tags.some((tag) => 'name' in tag && tag.name?.startsWith('og:'))
    ).toBe(false);
  });

  it('emits complete profile, article, and breadcrumb data', () => {
    expect(profilePageJsonLd()).toMatchObject({
      '@type': 'ProfilePage',
      mainEntity: { '@type': 'Person', name: 'Barry Michael Doyle' },
    });
    expect(articleJsonLd(post)).toMatchObject({
      '@type': 'BlogPosting',
      datePublished: '2026-08-19T00:00:00+02:00',
      url: 'https://barrymichaeldoyle.com/blog/example-post/',
    });
    expect(articleBreadcrumbJsonLd(post)).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: [{ position: 1 }, { position: 2 }, { position: 3 }],
    });
  });
});
