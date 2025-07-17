import { links } from '~/constants';

import { StackOverflow } from '../icons/StackOverflow';
import { Button } from '../ui/button';

export function StackOverflowButton() {
  return (
    <Button variant="secondary" size="icon" asChild>
      <a
        href={links.stackoverflow}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="StackOverflow"
      >
        <StackOverflow />
      </a>
    </Button>
  );
}
