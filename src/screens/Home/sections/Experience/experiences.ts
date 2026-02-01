interface Experience {
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  years: string;
  achievements: string[];
}

function getValrDuration(): string {
  const startDate = new Date(2025, 8); // September 2025 (0-indexed)
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
  }

  const years = totalMonths / 12;
  if (years % 1 === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years.toFixed(1)} years`;
}

export const experiences: Experience[] = [
  {
    company: 'VALR (PTY) Ltd',
    companyUrl: 'https://www.valr.com/en/invite/VAVCTUC7',
    role: 'Senior Software Engineer',
    period: 'Sep 2025 - Present',
    years: getValrDuration(),
    achievements: [],
  },
  {
    company: 'SecuritEase International Australia (PTY) Ltd',
    companyUrl: 'https://www.securitease.com/',
    role: 'UI Chapter Lead (Engineer)',
    period: 'Mar 2023 - Aug 2025',
    years: '2.5 years',
    achievements: [],
  },
  {
    company: 'Join Odin Limited',
    companyUrl: 'https://www.joinodin.com/',
    role: 'Design Engineer',
    period: 'Apr 2022 - Feb 2023',
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
    company: 'Cardinal (PTY) Ltd',
    companyUrl: 'https://www.cardinal.co.za/',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2017 - Feb 2019',
    years: '1.5 years',
    achievements: [],
  },
  {
    company: 'Barry-Dean IT Solutions (B1TS)',
    companyUrl: 'https://www.linkedin.com/in/barry-dean-martin-b69441b8/',
    role: 'Software Engineer',
    period: 'Jan 2013 - Sep 2017',
    years: '4.5 years',
    achievements: [],
  },
];
