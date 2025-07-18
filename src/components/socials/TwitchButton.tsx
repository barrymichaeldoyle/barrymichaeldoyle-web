import { links } from '~/constants';

import { Twitch } from '../icons/Twitch';
import { Button } from '../ui/button';

export function TwitchButton() {
  return (
    <Button variant="secondary" size="icon" asChild>
      <a
        href={links.twitch}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitch"
      >
        <Twitch />
      </a>
    </Button>
  );
}
