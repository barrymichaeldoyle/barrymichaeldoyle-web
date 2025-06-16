import { Mail } from 'lucide-react';

import { LinkedIn } from '~/components/icons/LinkedIn';
import { Button } from '~/components/ui/button';
import { links } from '~/constants';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Want to Poach Me?
        </h2>
        <p className="text-muted-foreground mb-8">
          Although I&apos;m currently very happily employed, I&apos;m always
          open to hearing about new full-time opportunities with the right
          company.
        </p>
        <p className="text-muted-foreground mb-8">
          Best way to get in touch is via{' '}
          <a
            href={links.linkedin}
            target="_blank"
            className="text-[#0A66C2] dark:text-primary-foreground link relative top-0.25 px-0.25"
          >
            <LinkedIn className="w-3 h-3" />
            <span className="text-sm">LinkedIn</span>
          </a>
          , or hit me up with an email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="w-fit" asChild>
            <a href={links.email}>
              <Mail />
              Get In Touch
            </a>
          </Button>
          {/* <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <a href="/resume.pdf" target="_blank">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </Button> */}
        </div>
      </div>
    </section>
  );
}
