import { links } from '~/constants';

interface Project {
  name: string;
  url: string;
  description: string;
  role: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'Report Buddy',
    url: 'https://report-buddy.com',
    description:
      'Clinical software that helps neuropsychologists save hours on documentation every week by streamlining report generation.',
    role: 'Technical Co-founder',
    tags: ['SaaS', 'Healthcare', 'Closed Source'],
  },
  {
    name: 'Flint',
    url: 'https://www.flint.fyi/',
    description:
      'A fast, friendly linter for JavaScript and TypeScript with intelligent defaults and type-aware rules.',
    role: 'Contribution Team Member',
    tags: ['Open Source', 'Developer Tools', 'TypeScript'],
  },
  {
    name: 'Patch Pulse',
    url: 'https://github.com/patch-pulse',
    description:
      'Developer tools for keeping npm packages up to date, including a Slack bot and CLI tool.',
    role: 'Creator',
    tags: ['Open Source', 'Developer Tools', 'npm'],
  },
  {
    name: 'barrymichaeldoyle.com',
    url: links.repo,
    description:
      'This website! A modern portfolio built with React, TanStack Router, and Tailwind CSS.',
    role: 'Creator',
    tags: ['Open Source', 'React', 'Portfolio'],
  },
];
