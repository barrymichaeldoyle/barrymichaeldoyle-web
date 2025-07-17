import { links } from '~/constants';

import { LinkedIn } from '../icons/LinkedIn';
import { Button } from '../ui/button';

interface LinkedInButtonProps {
  className?: string;
}

export function LinkedInButton({ className }: LinkedInButtonProps) {
  return (
    <Button variant="secondary" size="icon" asChild className={className}>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedIn />
      </a>
    </Button>
  );
}
