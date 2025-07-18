interface Experience {
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  years: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: 'SecuritEase International Australia (Pty) Ltd',
    companyUrl: 'https://www.securitease.com/',
    role: 'Staff Engineer',
    period: 'Mar 2023 - Present',
    years: `${new Date().getFullYear() - 2023}+ years`,
    achievements: [],
  },
  {
    company: 'Join Odin Limited',
    companyUrl: 'https://www.joinodin.com/',
    role: 'Design Engineer',
    period: 'April 2022 - Feb 2023',
    years: '1 year',
    achievements: [],
  },
  {
    company: 'Universal Healthcare Group',
    companyUrl: 'https://universal.one/',
    role: 'Head of Frontend Engineering',
    period: 'Mar 2019 - Mar 2022',
    years: '3 years',
    achievements: [],
  },
  {
    company: 'Cardinal (Pty) Ltd',
    companyUrl: 'https://www.cardinal.co.za/',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2017 - Feb 2019',
    years: '1.5 years',
    achievements: [],
  },
  {
    company: 'Barry-Dean IT Solutions (B1TS)',
    companyUrl: 'https://www.linkedin.com/in/barry-dean-martin-b69441b8/',
    role: 'Full Stack Engineer',
    period: 'Jan 2013 - Sep 2017',
    years: '4.5 years',
    achievements: [],
  },
];
