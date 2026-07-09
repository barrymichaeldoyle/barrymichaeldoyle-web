export function seo({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}) {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@barrymdoyle' },
    { name: 'twitter:site', content: '@barrymdoyle' },
    { name: 'og:type', content: type },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { property: 'og:locale', content: 'en_ZA' },
    ...(url ? [{ property: 'og:url', content: url }] : []),
    ...(publishedTime
      ? [{ property: 'article:published_time', content: publishedTime }]
      : []),
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:image:alt', content: title },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image },
          { property: 'og:image:alt', content: title },
        ]
      : []),
  ];

  return tags;
}

export function canonicalLink(url: string) {
  return { rel: 'canonical', href: url };
}
