import { useQuery } from '@tanstack/react-query';

import { StackOverflow } from '../icons/StackOverflow';
import '../socials/SocialButtons.css';
import { Button } from '../ui/button';

const SO_USER_ID = 2111515;

interface StackOverflowData {
  reputation: number;
  badge_counts: { gold: number; silver: number; bronze: number };
  profile_image: string;
  display_name: string;
  link: string;
}

async function fetchStackOverflowData(): Promise<StackOverflowData> {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/users/${SO_USER_ID}?order=desc&sort=reputation&site=stackoverflow`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Stack Overflow data');
  }

  const data = await response.json();

  if (!data.items || !data.items[0]) {
    throw new Error('No Stack Overflow data found');
  }

  return data.items[0];
}

export function StackOverflowFlair() {
  const { data } = useQuery({
    queryKey: ['stackOverflowProfile', SO_USER_ID],
    queryFn: fetchStackOverflowData,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // We don't care about loading/error states, rather soft fail.
  if (!data) {
    return null;
  }

  return (
    <Button variant="secondary" asChild className="social-button-hover">
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm"
        title={`${data.display_name} on Stack Overflow - ${data.reputation.toLocaleString()} reputation`}
      >
        <StackOverflow className="h-4 w-4" />

        <span className="text-xs font-medium">
          {data.reputation.toLocaleString()}
        </span>

        <span className="flex gap-1 text-xs font-medium">
          <BadgeCount count={data.badge_counts.gold} color="#FFCC01" />
          <BadgeCount count={data.badge_counts.silver} color="#B4B8BC" />
          <BadgeCount count={data.badge_counts.bronze} color="#D1A684" />
        </span>
      </a>
    </Button>
  );
}

function BadgeCount({ count, color }: { count: number; color: string }) {
  if (count === 0) {
    return null;
  }

  return (
    <span className="flex items-center gap-0.5">
      <span style={{ color }}>●</span>
      {count}
    </span>
  );
}
