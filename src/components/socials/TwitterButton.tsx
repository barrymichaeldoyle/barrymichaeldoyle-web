import { links } from '~/constants';

import { X } from '../icons/X';
import { Button } from '../ui/button';

export function TwitterButton() {
  return (
    <Button variant="secondary" size="icon" asChild>
      <a
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
      >
        <X />
      </a>
    </Button>
  );
}
