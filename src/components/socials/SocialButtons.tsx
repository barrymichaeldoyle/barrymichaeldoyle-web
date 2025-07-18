import { EmailButton } from './EmailButton';
import { GitHubButton } from './GitHubButton';
import { LinkedInButton } from './LinkedInButton';
import { StackOverflowButton } from './StackOverflowButton';
import { TwitchButton } from './TwitchButton';
import { YouTubeButton } from './YouTubeButton';

/**
 * A component that renders a list of social buttons.
 * @returns A list of social buttons.
 */
export function SocialButtons() {
  return (
    <>
      <LinkedInButton />
      <GitHubButton />
      <EmailButton />
      <TwitchButton />
      <YouTubeButton />
      <StackOverflowButton />
    </>
  );
}
