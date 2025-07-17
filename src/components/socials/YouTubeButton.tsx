import { links } from '~/constants';

import { YouTube } from '../icons/YouTube';
import { Button } from '../ui/button';

export function YouTubeButton() {
  return (
    <Button variant="secondary" size="icon" asChild>
      <a
        href={links.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
      >
        <YouTube />
      </a>
    </Button>
  );
}
