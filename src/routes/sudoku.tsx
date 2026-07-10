import { createFileRoute } from '@tanstack/react-router';
import { SITE_URL, SUDOKU_OG_IMAGE } from '~/constants';
import { canonicalLink, seo } from '~/lib/seo';
import { SudokuScreen } from '~/screens/Sudoku/Sudoku';

const url = `${SITE_URL}/sudoku`;
const description =
  'Classic daily number puzzles for iPhone. Works offline. No ads during puzzles.';

export const Route = createFileRoute('/sudoku')({
  head: () => ({
    meta: seo({
      title: 'Offline Sudoku | Barry Michael Doyle',
      description,
      image: SUDOKU_OG_IMAGE,
      url,
      keywords: 'sudoku, offline, puzzle, ios, app store',
    }),
    links: [canonicalLink(url)],
  }),
  component: SudokuPage,
});

function SudokuPage() {
  return <SudokuScreen />;
}
