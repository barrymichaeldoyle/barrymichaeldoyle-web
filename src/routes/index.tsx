import { createFileRoute } from '@tanstack/react-router';

import { HomeScreen } from '~/screens/Home/Home';

export const Route = createFileRoute('/')({ component: Home });

export default function Home() {
  return <HomeScreen />;
}
