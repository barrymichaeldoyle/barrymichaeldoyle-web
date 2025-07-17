import { Mail } from 'lucide-react';

import { links } from '~/constants';

import { Button } from '../ui/button';

export function EmailButton() {
  return (
    <Button variant="secondary" size="icon" asChild>
      <a href={links.email} aria-label="Email">
        <Mail />
      </a>
    </Button>
  );
}
