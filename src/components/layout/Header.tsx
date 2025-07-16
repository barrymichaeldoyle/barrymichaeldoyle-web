import { Link, useLocation } from '@tanstack/react-router';
import { type ReactNode } from 'react';

import { cn } from '~/lib/utils';

import { DevElement } from '../DevElement/DevElement';

export function Header() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 flex p-2',
        isHome && 'justify-end'
      )}
    >
      <div
        className={cn(
          'flex w-full items-center justify-between gap-1 rounded-full bg-background/50 px-1 py-1 backdrop-blur-sm transition-all duration-500',
          isHome && 'w-fit'
        )}
      >
        {!isHome && (
          <Link to="/" className="flex h-9 flex-col gap-1">
            <span className="no-wrap relative -top-1 px-4 text-sm font-bold text-primary">
              Barry Michael Doyle
            </span>
            <DevElement className="absolute top-5 left-8 w-30" />
          </Link>
        )}
        <nav className="flex gap-1">
          <NavLink active={isHome} to="/">
            Home
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
}: {
  active?: boolean;
  to: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'rounded-full p-2 px-3 text-sm font-medium text-foreground transition-colors duration-500',
        active && 'bg-primary text-background'
      )}
    >
      {children}
    </Link>
  );
}
