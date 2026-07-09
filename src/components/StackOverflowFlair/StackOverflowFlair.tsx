import { stackOverflowFlair } from '~/data/stackoverflow.gen';

import { StackOverflow } from '../icons/StackOverflow';
import '../socials/SocialButtons.css';
import { Button } from '../ui/button';

export function StackOverflowFlair() {
  const data = stackOverflowFlair;

  return (
    <Button variant="secondary" asChild className="social-button-hover">
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm"
        title={`${data.displayName} on Stack Overflow - ${data.reputation.toLocaleString()} reputation`}
      >
        <StackOverflow className="h-4 w-4" />

        <span className="text-xs font-medium">
          {data.reputation.toLocaleString()}
        </span>

        <span className="flex gap-1 text-xs font-medium">
          <BadgeCount count={data.badgeCounts.gold} color="#FFCC01" />
          <BadgeCount count={data.badgeCounts.silver} color="#B4B8BC" />
          <BadgeCount count={data.badgeCounts.bronze} color="#D1A684" />
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
