import { links } from '~/constants';

import { GitHub } from '../icons/GitHub';
import { Button } from '../ui/button';

export function GitHubButton() {
  return (
    <Button variant="secondary" size="icon" asChild>
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GitHub />
      </a>
    </Button>
  );
}
