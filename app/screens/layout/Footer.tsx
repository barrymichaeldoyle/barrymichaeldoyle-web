import { Button } from '@/components/ui/button';
import { LinkedIn } from '@/icons/LinkedIn';
import { StackOverflow } from '@/icons/StackOverflow';
import { Github, Mail } from 'lucide-react';

export function Footer() {
  return (
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
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/barry-michael-doyle-11369683/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedIn className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://stackoverflow.com/users/your-id"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StackOverflow"
              >
                <StackOverflow className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:barry@barrymichaeldoyle.com" aria-label="Email">
                <Mail className="w-5 h-5" />
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
  );
}
