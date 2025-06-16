import { Link } from '@tanstack/react-router';
import { Code2, Mail, MapPin } from 'lucide-react';

import { LinkedIn } from '~/components/icons/LinkedIn';
import { StackOverflow } from '~/components/icons/StackOverflow';
import { StackOverflowFlair } from '~/components/StackOverflowFlair/StackOverflowFlair';
import { Button } from '~/components/ui/button';
import { links, TITLES, YEARS_EXPERIENCE } from '~/constants';

import { GitHub } from '../icons/GitHub';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start mb-8">
          {/* Professional Info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Barry Michael Doyle
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Cape Town, South Africa</span>
              </div>
              <p>{YEARS_EXPERIENCE}+ Years Professional Experience</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-sm mb-3 text-foreground">
              Navigation
            </h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block link">
                Home
              </Link>
              <Link to="/blog" className="block link">
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links & StackOverflow Flair */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="icon" asChild>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHub />
                </a>
              </Button>
              <Button variant="secondary" size="icon" asChild>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </a>
              </Button>
              <Button variant="secondary" size="icon" asChild>
                <a
                  href={links.stackoverflow}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="StackOverflow"
                >
                  <StackOverflow />
                </a>
              </Button>
              <Button variant="secondary" size="icon" asChild>
                <a href={links.email} aria-label="Email">
                  <Mail />
                </a>
              </Button>
            </div>
            <StackOverflowFlair />
          </div>

          {/* Professional Titles */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-sm mb-3 text-foreground">
              Professional Roles
            </h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              {TITLES.map((title) => (
                <em
                  key={title}
                  className="block whitespace-nowrap text-muted-foreground"
                >
                  {title}
                </em>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Open Source */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col items-center space-y-3">
            {/* Open Source Link */}
            <div className="text-center">
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-xs"
              >
                <Code2 className="w-3 h-3" />
                <span>Open Source on GitHub</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} Barry Michael Doyle. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
