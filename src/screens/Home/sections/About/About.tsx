import { Link } from '@tanstack/react-router';

import { ProfileCard } from '~/components/reactbits/Components/ProfileCard/ProfileCard';
import { sections } from '~/constants';

export function AboutSection() {
  return (
    <section
      id={sections.about}
      className="mx-auto flex w-full max-w-250 flex-col gap-12 py-36 md:flex-row md:gap-8"
    >
      <div className="flex flex-2 flex-col gap-2 px-2">
        <Link to={`#${sections.about}` as string} data-slot="button">
          <h2 className="pb-2 text-center md:text-left">About</h2>
        </Link>
        <p>
          Hey I&apos;m Barry! As you can pretty much see. This site is still a
          work in progress.
        </p>
        <p>
          But hey, if I&apos;m good at what I do... It&apos;ll look a lot better
          soon!
        </p>
      </div>
      <div className="flex justify-center">
        <ProfileCard />
      </div>
    </section>
  );
}
