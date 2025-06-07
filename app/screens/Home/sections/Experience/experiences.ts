interface Experience {
  company: string;
  role: string;
  period: string;
  years: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: 'SecuritEase International Australia (Pty) Ltd',
    role: 'Lead Frontend Engineer',
    period: 'Mar 2023 - Present',
    years: `${new Date().getFullYear() - 2023}+ years`,
    achievements: [],
  },
  {
    company: 'Universal Healthcare Group',
    role: 'Lead Frontend Engineer',
    period: 'Mar 2019 - Feb 2023',
    years: '4 years',
    achievements: [],
  },
  {
    company: 'Cardinal (Pty) Ltd',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2017 - Feb 2019',
    years: '1.5 years',
    achievements: [],
  },
  {
    company: 'Barry-Dean IT Solutions',
    role: 'Full Stack Engineer',
    period: 'Jan 2013 - Sep 2017',
    years: '4.5 years',
    achievements: [],
  },
];
