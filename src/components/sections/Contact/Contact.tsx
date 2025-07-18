import { Mail } from 'lucide-react';

import { LinkedIn } from '~/components/icons/LinkedIn';
import { Button } from '~/components/ui/button';
import { links } from '~/constants';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold">Want to Poach Me?</h2>
        <p className="text-muted-foreground mb-8">
          Although I&apos;m currently full-time employed, I&apos;m always open
          to hearing about new full-time opportunities with the right company.
        </p>
        <p>
          If you think I&apos;d be a good fit for anything full-time. Get in
          touch.
        </p>
        <p className="text-muted-foreground mb-8">
          The best way to reach me is via email, or hit me up on{' '}
          <a href={links.linkedin} target="_blank">
            LinkedIn
          </a>
          .
        </p>
        <div className="flex flex-row items-center justify-center gap-4 sm:flex-row">
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
