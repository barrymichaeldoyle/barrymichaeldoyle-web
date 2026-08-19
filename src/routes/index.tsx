import { createFileRoute } from '@tanstack/react-router';
import { JsonLd } from '~/components/JsonLd';
import { SITE_URL } from '~/constants';
import { personJsonLd, profilePageJsonLd, websiteJsonLd } from '~/lib/jsonLd';
import { canonicalLink } from '~/lib/seo';
import { HomeScreen } from '~/screens/Home/Home';

export const Route = createFileRoute('/')({
  head: () => ({
    links: [canonicalLink(`${SITE_URL}/`)],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={profilePageJsonLd()} />
      <HomeScreen />
    </>
  );
}
