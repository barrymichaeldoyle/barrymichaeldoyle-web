import { Button } from '@/components/ui/button';
import { LinkedIn } from '@/components/icons/LinkedIn';
import { Github, Mail } from 'lucide-react';
import { socials, TITLES, YEARS_EXPERIENCE } from '@/constants';
import { StackOverflow } from '@/components/icons/StackOverflow';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={socials.stackoverflow}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StackOverflow"
              >
                <StackOverflow />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={socials.email} aria-label="Email">
                <Mail />
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Barry Michael Doyle</p>
            <p className="text-sm mt-1">{TITLES.join(' | ')}</p>
            <p className="text-sm mt-1">
              {YEARS_EXPERIENCE}+ Years Professional Experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
