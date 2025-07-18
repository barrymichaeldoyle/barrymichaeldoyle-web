import { Mail } from 'lucide-react';

import { LinkedIn } from '~/components/icons/LinkedIn';
import { Button } from '~/components/ui/button';
import { links } from '~/constants';

export function ContactSection() {
  return (
    <section id="contact" className="py-32 text-center">
      <div className="mx-auto flex max-w-lg flex-col gap-2">
        <h2 className="mb-4 text-3xl font-bold">Want to Poach Me?</h2>
        <p>
          Although I&apos;m currently full-time employed, I&apos;m always open
          to hearing about new opportunities with the right company.
        </p>
        <br />
        <p>If you think I&apos;d be a good fit for your team, get in touch.</p>
        <p>
          The best way to reach me is via email, or hit me up on{' '}
          <a href={links.linkedin} target="_blank">
            LinkedIn
          </a>
          .
        </p>
        <div className="flex flex-row items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button size="lg" className="w-fit" asChild>
            <a href={links.linkedin} target="_blank">
              <LinkedIn />
              LinkedIn
            </a>
          </Button>
          <Button size="lg" className="w-fit" asChild>
            <a href={links.email}>
              <Mail />
              Email Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
