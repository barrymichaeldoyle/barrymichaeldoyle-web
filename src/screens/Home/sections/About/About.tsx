import { Link } from '@tanstack/react-router';

import { ProfileCard } from '~/components/reactbits/Components/ProfileCard/ProfileCard';
import { links, sections, YEARS_EXPERIENCE } from '~/constants';

export function AboutSection() {
  return (
    <section
      id={sections.about}
      className="mx-auto flex w-full max-w-250 flex-col gap-12 py-36 md:flex-row md:gap-8"
    >
      <div className="flex flex-2 flex-col gap-4 px-2">
        <Link to={`#${sections.about}` as string} data-slot="button">
          <h2 className="pb-2 text-center text-cyan-400 md:text-left">About</h2>
        </Link>
        <p>
          Hey, I&apos;m Barry! With over {YEARS_EXPERIENCE} years of
          professional experience, I specialize in building scalable frontend
          applications using React, React Native, and TypeScript.
        </p>
        <p>
          Currently, I&apos;m a Senior Engineer at{' '}
          <a
            href="https://www.valr.com/en/invite/VAVCTUC7"
            target="_blank"
            rel="noopener noreferrer"
          >
            VALR
          </a>
          , one of Africa&apos;s leading cryptocurrency exchanges. I&apos;m also
          a contributor to{' '}
          <a
            href="https://www.flint.fyi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flint
          </a>
          , a next-generation JavaScript/TypeScript linter.
        </p>
        <p>
          I share what I learn through my{' '}
          <a href={links.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>{' '}
          channel and live-code side projects on{' '}
          <a href={links.twitch} target="_blank" rel="noopener noreferrer">
            Twitch
          </a>
          .
        </p>
      </div>
      <div className="flex justify-center">
        <ProfileCard />
      </div>
    </section>
  );
}
