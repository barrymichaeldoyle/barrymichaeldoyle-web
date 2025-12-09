import { Link } from '@tanstack/react-router';

import { ProfileCard } from '~/components/reactbits/Components/ProfileCard/ProfileCard';
import { sections } from '~/constants';

export function AboutSection() {
  const programmingYears = new Date().getFullYear() - 2013;

  return (
    <section
      id={sections.about}
      className="mx-auto flex w-full max-w-250 flex-col gap-12 py-36 md:flex-row md:gap-8"
    >
      <div className="flex flex-2 flex-col gap-4 px-2">
        <Link to={`#${sections.about}` as string} data-slot="button">
          <h2 className="pb-2 text-center md:text-left">About</h2>
        </Link>
        <p>
          Hey, I&apos;m Barry! I&apos;ve been programming professionally for
          over {programmingYears} years. Currently, I&apos;m a Senior Engineer
          at a Crypto Exchange (Confidential).
        </p>
        <p>
          I love exploring various technologies, but most of my professional
          experience has been frontend-focused. ReactJS and React Native are my
          go-to frameworks for web and mobile applications, with TypeScript as
          the foundation for everything I build. That said, I&apos;m always
          happy playing with new technologies when it means building cool things
          or extending features on existing projects.
        </p>
        <p>
          When I&apos;m not coding for work, you can find me streaming my side
          projects on{' '}
          <a
            href="https://www.twitch.tv/barrymichaeldoyle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitch
          </a>
          .
        </p>
        <p>
          My latest side project is{' '}
          <a
            href="https://www.github.com/patch-pulse"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patch Pulse
          </a>
          , a set of developer tools for keeping npm packages up to date.
        </p>
      </div>
      <div className="flex justify-center">
        <ProfileCard />
      </div>
    </section>
  );
}
