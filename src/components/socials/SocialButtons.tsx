import { EmailButton } from './EmailButton';
import { GitHubButton } from './GitHubButton';
import { LinkedInButton } from './LinkedInButton';
import './SocialButtons.css';
import { StackOverflowButton } from './StackOverflowButton';
import { TwitchButton } from './TwitchButton';
import { TwitterButton } from './TwitterButton';
import { YouTubeButton } from './YouTubeButton';

/**
 * A component that renders a list of social buttons.
 * @returns A list of social buttons.
 */
export function SocialButtons() {
  return (
    <div className="social-buttons-container">
      <LinkedInButton />
      <GitHubButton />
      <EmailButton />
      <TwitterButton />
      <TwitchButton />
      <YouTubeButton />
      <StackOverflowButton />
    </div>
  );
}
