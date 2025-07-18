import { Link } from '@tanstack/react-router';
import { Code2, MapPin } from 'lucide-react';

import { StackOverflowFlair } from '~/components/StackOverflowFlair/StackOverflowFlair';
import { links, TITLES, YEARS_EXPERIENCE } from '~/constants';

import { SocialButtons } from '../socials/SocialButtons';

export function Footer() {
  return (
    <footer className="border-border bg-card border-t">
      <div className="w-full px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 items-start gap-8 md:grid-cols-4">
          {/* Professional Info */}
          <div className="text-center md:text-left">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Barry Michael Doyle
            </h3>
            <div className="text-muted-foreground space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Cape Town, South Africa</span>
              </div>
              <p>{YEARS_EXPERIENCE}+ Years Professional Experience</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Navigation
            </h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="link block">
                Home
              </Link>
              <Link to="/blog" className="link block">
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links & StackOverflow Flair */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <SocialButtons />
            </div>
            <StackOverflowFlair />
          </div>

          {/* Professional Titles */}
          <div className="text-center md:text-right">
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Professional Roles
            </h4>
            <div className="text-muted-foreground space-y-1 text-sm">
              {TITLES.map((title) => (
                <em
                  key={title}
                  className="text-muted-foreground block whitespace-nowrap"
                >
                  {title}
                </em>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Open Source */}
        <div className="border-border border-t pt-6">
          <div className="flex flex-col items-center space-y-3">
            {/* Open Source Link */}
            <div className="text-center">
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-xs"
              >
                <Code2 className="h-3 w-3" />
                <span>Open Source on GitHub</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-muted-foreground text-center text-sm">
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
