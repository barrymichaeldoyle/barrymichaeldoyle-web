import { createFileRoute } from '@tanstack/react-router';
import { SITE_URL } from '~/constants';
import { canonicalLink } from '~/lib/seo';
import { HomeScreen } from '~/screens/Home/Home';

export const Route = createFileRoute('/')({
  head: () => ({
    links: [canonicalLink(SITE_URL)],
  }),
  component: Home,
});

function Home() {
  return <HomeScreen />;
}
