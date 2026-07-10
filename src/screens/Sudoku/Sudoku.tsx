import { Link } from '@tanstack/react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { links } from '~/constants';

const features = [
  'Works offline',
  'Daily puzzles, streaks, and stats',
  'Pencil notes, hints, and undo',
  'Light and dark mode',
  'No ads during puzzles',
];

export function SudokuScreen() {
  return (
    <div className="mx-auto w-full max-w-2xl px-1 py-6">
      <nav className="mb-8">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </nav>

      <header className="mb-8 space-y-3">
        <p className="text-sm font-semibold tracking-wide text-cyan-400/80 uppercase">
          iOS app
        </p>
        <h1 className="text-3xl leading-tight font-bold tracking-tight text-cyan-400 md:text-4xl">
          Offline Sudoku
        </h1>
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          Classic daily number puzzles. Free on the App Store.
        </p>
      </header>

      <div className="mb-10 flex flex-wrap gap-3">
        <Button variant="neon" size="lg" asChild>
          <a
            href={links.sudokuAppStore}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on the App Store
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <a href={links.sudokuSite} target="_blank" rel="noopener noreferrer">
            Support & privacy
          </a>
        </Button>
      </div>

      <div className="mb-10 space-y-4 text-muted-foreground">
        <p>
          Play 9x9 Sudoku on your iPhone without needing an internet connection.
          Choose Easy, Medium, Hard, or Expert, and pick up where you left off.
        </p>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground">
        By{' '}
        <Link to="/" className="text-cyan-400 hover:underline">
          Barry Michael Doyle
        </Link>
        . Source on{' '}
        <a
          href={links.sudokuRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
