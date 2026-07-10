export const TITLES = [
  'Staff Engineer',
  'Product Engineer',
  'Design Engineer',
  'Software Engineer',
];

export const SITE_URL = 'https://barrymichaeldoyle.com';
export const OG_IMAGE = `${SITE_URL}/og.webp`;
export const SUDOKU_OG_IMAGE = `${SITE_URL}/sudoku-og.png`;

export const YEARS_EXPERIENCE = new Date().getFullYear() - 2013;

export const links: Record<string, string> = {
  github: 'https://github.com/barrymichaeldoyle',
  linkedin: 'https://www.linkedin.com/in/barry-michael-doyle-11369683/',
  stackOverflow: 'https://stackoverflow.com/users/2111515/barry-michael-doyle',
  youtube: 'https://www.youtube.com/@barrymichaeldoyle',
  email: 'mailto:barry@barrymichaeldoyle.com',
  twitch: 'https://www.twitch.tv/barrymichaeldoyle',
  repo: 'https://github.com/barrymichaeldoyle/barrymichaeldoyle-web',
  site: SITE_URL,
  twitter: 'https://x.com/barrymdoyle',
  patchPulse: 'https://github.com/barrymichaeldoyle/patch-pulse',
  devTo: 'https://dev.to/barrymichaeldoyle',
  sudoku: `${SITE_URL}/sudoku`,
  sudokuAppStore: 'https://apps.apple.com/app/offline-sudoku/id6782209083',
  sudokuSite: 'https://barrymichaeldoyle.github.io/sudoku-offline/',
  sudokuRepo: 'https://github.com/barrymichaeldoyle/sudoku-offline',
};

export const sections = {
  about: 'about',
  experience: 'experience',
  projects: 'projects',
  contact: 'contact',
};
