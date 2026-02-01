import { Link, useLocation } from '@tanstack/react-router';
import { type ReactNode, useState } from 'react';

import { sections } from '~/constants';
import { cn } from '~/lib/utils';

import { DevElement } from '../DevElement/DevElement';

export function Header() {
  const { pathname, hash } = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hideLogo = pathname === '/';
  const showLogo = !hideLogo;
  const isAbout = hash === sections.about;
  const isExperience = hash === sections.experience;
  const isProjects = hash === sections.projects;
  const isContact = hash === sections.contact;
  const isHome =
    pathname === '/' &&
    !isAbout &&
    !isExperience &&
    !isProjects &&
    !isContact;

  const hideHashSections = showLogo;

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 flex p-2',
        hideLogo && 'justify-end'
      )}
    >
      <div
        className={cn(
          'flex w-full items-center justify-between gap-1 rounded-full bg-background/50 px-1 py-1 backdrop-blur-sm transition-all duration-500',
          hideLogo && 'w-fit',
          'mx-auto sm:mx-0'
        )}
      >
        {!hideLogo && (
          <Link to="/" className="flex h-9 flex-row gap-1.5">
            <div className="relative">
              {/* Loading placeholder */}
              {!imageLoaded && !imageError && (
                <div className="h-9 w-9 animate-pulse rounded-full border-2 border-primary bg-background-secondary" />
              )}

              {/* Fallback image */}
              {imageError && (
                <img
                  src="/favicon.svg"
                  alt="Barry Michael Doyle"
                  className="h-9 w-9 rounded-full border-2 border-primary"
                />
              )}

              {/* Main profile image */}
              <img
                src="/profile.png"
                alt="Barry Michael Doyle"
                fetchPriority="high"
                width={36}
                height={36}
                className={cn(
                  'h-9 w-9 rounded-full border-2 border-primary object-cover',
                  !imageLoaded && !imageError && 'hidden'
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>
            <div className="relative flex flex-col gap-1">
              <span className="relative -top-1 text-sm font-bold whitespace-nowrap text-primary">
                Barry Michael Doyle
              </span>
              <DevElement className="absolute top-4.5 left-2.5 w-30 text-white" />
            </div>
          </Link>
        )}
        <nav className="flex gap-1">
          <NavLink active={isHome} to="/">
            Home
          </NavLink>
          <NavLink
            active={isAbout}
            to={pathname === '/' ? `#${sections.about}` : `/#${sections.about}`}
            hideOnSm={hideHashSections}
            hideOnXs
          >
            About
          </NavLink>
          <NavLink
            active={isExperience}
            to={
              pathname === '/'
                ? `#${sections.experience}`
                : `/#${sections.experience}`
            }
            hideOnSm={hideHashSections}
            hideOnXs
          >
            Experience
          </NavLink>
          <NavLink
            active={isProjects}
            to={
              pathname === '/'
                ? `#${sections.projects}`
                : `/#${sections.projects}`
            }
            hideOnSm={hideHashSections}
            hideOnXs
          >
            Projects
          </NavLink>
          <NavLink
            active={isContact}
            to={
              pathname === '/'
                ? `#${sections.contact}`
                : `/#${sections.contact}`
            }
            hideOnSm={hideHashSections}
            hideOnXs
          >
            Contact
          </NavLink>
          <NavLink active={pathname.includes('/blog')} to="/blog">
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  active,
  to,
  children,
  hideOnSm,
  hideOnXs,
}: {
  active?: boolean;
  to: string;
  children: ReactNode;
  hideOnSm?: boolean;
  hideOnXs?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'rounded-full p-2 px-3 text-sm font-medium text-foreground transition-colors duration-500',
        active && 'bg-primary text-background opacity-100',
        hideOnSm ? 'hidden sm:block' : hideOnXs && 'hidden xs:block'
      )}
      data-slot="button"
    >
      {children}
    </Link>
  );
}
