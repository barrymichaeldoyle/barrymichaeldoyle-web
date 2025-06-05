import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

import appCss from '@/styles/app.css?url';
import { ThemeProvider } from '@/components/theme/provider';
import { ThemeToggle } from '@/components/theme/toggle';
import { Button } from '@/components/ui/button';
import { StackOverflow } from '@/icons/StackOverflow';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Barry Michael Doyle - Staff Frontend Engineer' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="particle-overlay"></div>
        <ThemeProvider storageKey="bmd-theme">
          <header className="absolute right-0 top-0 p-1">
            <ThemeToggle />
          </header>
          {children}
          <footer className="border-t border-border bg-card py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href="https://github.com/barrymichaeldoyle"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href="https://www.linkedin.com/in/barry-michael-doyle-11369683/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href="https://stackoverflow.com/users/your-id"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="StackOverflow"
                    >
                      <StackOverflow className="w-6 h-6" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href="mailto:barry@barrymichaeldoyle.com"
                      aria-label="Email"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  </Button>
                </div>

                {/* Copyright */}
                <div className="text-center text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} Barry Michael Doyle</p>
                  <p className="text-sm mt-1">Staff Frontend Engineer</p>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
